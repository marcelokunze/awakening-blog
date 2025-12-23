"use client"

import type React from "react"
import { useEffect, useRef } from "react"

export interface StaticTVEffectProps {
    className?: string
    pixelSize?: number
    pixelSpacing?: number
    offColor?: [number, number, number, number]
    onColor?: [number, number, number, number]
    changeProbability?: number
    frameDelay?: number
    pixelDensity?: number
    pixelPersistence?: number
    showControls?: boolean
    isOn?: boolean
}

interface ProgramInfo {
    program: WebGLProgram;
    attribLocations: {
        vertexPosition: number;
        textureCoord: number;
    };
    uniformLocations: {
        time: WebGLUniformLocation | null;
        resolution: WebGLUniformLocation | null;
        pixelSize: WebGLUniformLocation | null;
        pixelSpacing: WebGLUniformLocation | null;
        offColor: WebGLUniformLocation | null;
        onColor: WebGLUniformLocation | null;
        changeProbability: WebGLUniformLocation | null;
        pixelDensity: WebGLUniformLocation | null;
        pixelPersistence: WebGLUniformLocation | null;
        isOn: WebGLUniformLocation | null;
    };
}

interface Buffers {
    position: WebGLBuffer | null;
    textureCoord: WebGLBuffer | null;
}

export function StaticTVEffect({
    className = "",
    pixelSize = 4,
    pixelSpacing = 6,
    offColor = [0.16, 0.16, 0.16, 0.12],
    onColor = [0.7, 0.7, 0.7, 0.7],
    changeProbability = 0.02,
    frameDelay = 160,
    pixelDensity = 0.4,
    pixelPersistence = 0.21,
    showControls = false,
    isOn = true,
}: StaticTVEffectProps) {
    // Refs for WebGL objects
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const glRef = useRef<WebGLRenderingContext | null>(null)
    // programInfo holds our shaders + locations
    const programInfoRef = useRef<ProgramInfo | null>(null)
    // buffers holds our position + texcoord buffers
    const buffersRef = useRef<Buffers | null>(null)
    const frameCountRef = useRef(0)
    const lastFrameTimeRef = useRef(0)
    const animationFrameRef = useRef<number | null>(null)

    // Refs for controls - using DOM directly instead of React state
    const pixelSizeInputRef = useRef<HTMLInputElement>(null)
    const pixelSpacingInputRef = useRef<HTMLInputElement>(null)
    const changeProbabilityInputRef = useRef<HTMLInputElement>(null)
    const pixelDensityInputRef = useRef<HTMLInputElement>(null)
    const pixelPersistenceInputRef = useRef<HTMLInputElement>(null)

    const pixelSizeValueRef = useRef<HTMLSpanElement>(null)
    const pixelSpacingValueRef = useRef<HTMLSpanElement>(null)
    const changeProbabilityValueRef = useRef<HTMLSpanElement>(null)
    const pixelDensityValueRef = useRef<HTMLSpanElement>(null)
    const pixelPersistenceValueRef = useRef<HTMLSpanElement>(null)

    // Config ref - stores current configuration
    const configRef = useRef({
        pixelSize,
        pixelSpacing,
        offColor,
        onColor,
        changeProbability,
        frameDelay,
        pixelDensity,
        pixelPersistence,
        isOn,
    })

    // Initialize WebGL once on mount
    useEffect(() => {
        // Update config ref with initial props
        configRef.current = {
            pixelSize,
            pixelSpacing,
            offColor,
            onColor,
            changeProbability,
            frameDelay,
            pixelDensity,
            pixelPersistence,
            isOn,
        }

        // Initialize canvas and WebGL context
        const canvas = canvasRef.current
        if (!canvas) return

        const gl = canvas.getContext("webgl")
        if (!gl) {
            console.error("WebGL not supported in your browser")
            return
        }

        glRef.current = gl

        // Vertex shader program
        const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      
      varying highp vec2 vTextureCoord;
      
      void main(void) {
          gl_Position = aVertexPosition;
          vTextureCoord = aTextureCoord;
      }
    `

        // Fragment shader program - optimized without forcefield logic
        const fsSource = `
  precision mediump float;
  
  varying highp vec2 vTextureCoord;
  
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uPixelSize;
  uniform float uPixelSpacing;
  uniform vec4 uOffColor;
  uniform vec4 uOnColor;
  uniform float uChangeProbability;
  uniform float uPixelDensity;
  uniform float uPixelPersistence;
  uniform bool uIsOn;
  
  // Pseudo-random function
  float random(vec2 st, float seed) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233)) + seed) * 43758.5453123);
  }
  
  // Hash function for stable pixel state
  float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
  }
  
  void main(void) {
      // Calculate grid position
      float totalSize = uPixelSize + uPixelSpacing;
      vec2 pixelCoord = floor(vTextureCoord * uResolution / totalSize);
      
      // Calculate position within the cell
      vec2 cellPosition = fract(vTextureCoord * uResolution / totalSize);
      
      // Determine if we're in a pixel or in spacing
      bool inPixel = cellPosition.x >= (uPixelSpacing / 2.0) / totalSize && 
                     cellPosition.x < (uPixelSpacing / 2.0 + uPixelSize) / totalSize &&
                     cellPosition.y >= (uPixelSpacing / 2.0) / totalSize && 
                     cellPosition.y < (uPixelSpacing / 2.0 + uPixelSize) / totalSize;
      
      if (!inPixel) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          return;
      }
      
      // If static is turned off, show all pixels as off
      if (!uIsOn) {
          gl_FragColor = uOffColor;
          return;
      }
      
      // Generate stable pixel state based on position
      float pixelState = hash(pixelCoord);
      
      // Determine initial state - more pixels on with higher density
      bool isOn = pixelState < uPixelDensity;
      
      // Time-based change with persistence
      float timeHash = random(pixelCoord, floor(uTime * 10.0));
      float changeThreshold = uChangeProbability * (1.0 - uPixelPersistence);
      
      // Only change state if we exceed the persistence threshold
      if (timeHash < changeThreshold) {
          // When we do change, flip with 50% probability
          isOn = random(pixelCoord, uTime) > 0.5;
      }
      
      // Set color based on state
      gl_FragColor = isOn ? uOnColor : uOffColor;
  }
`

        // Initialize shader program
        function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
            const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
            const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

            if (!vertexShader || !fragmentShader) return null

            const shaderProgram = gl.createProgram()
            if (!shaderProgram) return null

            gl.attachShader(shaderProgram, vertexShader)
            gl.attachShader(shaderProgram, fragmentShader)
            gl.linkProgram(shaderProgram)

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram))
                return null
            }

            return shaderProgram
        }

        // Create a shader
        function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
            const shader = gl.createShader(type)
            if (!shader) return null

            gl.shaderSource(shader, source)
            gl.compileShader(shader)

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader))
                gl.deleteShader(shader)
                return null
            }

            return shader
        }

        // Initialize buffers
        function initBuffers(gl: WebGLRenderingContext) {
            const positionBuffer = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

            // Create a square (two triangles) that covers the entire canvas
            const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

            const textureCoordBuffer = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer)

            const textureCoordinates = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0]

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW)

            return {
                position: positionBuffer,
                textureCoord: textureCoordBuffer,
            }
        }

        const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
        if (!shaderProgram) return

        const programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
                textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
            },
            uniformLocations: {
                time: gl.getUniformLocation(shaderProgram, "uTime"),
                resolution: gl.getUniformLocation(shaderProgram, "uResolution"),
                pixelSize: gl.getUniformLocation(shaderProgram, "uPixelSize"),
                pixelSpacing: gl.getUniformLocation(shaderProgram, "uPixelSpacing"),
                offColor: gl.getUniformLocation(shaderProgram, "uOffColor"),
                onColor: gl.getUniformLocation(shaderProgram, "uOnColor"),
                changeProbability: gl.getUniformLocation(shaderProgram, "uChangeProbability"),
                pixelDensity: gl.getUniformLocation(shaderProgram, "uPixelDensity"),
                pixelPersistence: gl.getUniformLocation(shaderProgram, "uPixelPersistence"),
                isOn: gl.getUniformLocation(shaderProgram, "uIsOn"),
            },
        }

        programInfoRef.current = programInfo
        buffersRef.current = initBuffers(gl)

        // Set canvas size
        const resizeCanvas = () => {
            const canvas = canvasRef.current
            const gl = glRef.current
            if (!canvas || !gl) return

            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            gl.viewport(0, 0, canvas.width, canvas.height)
        }

        window.addEventListener("resize", resizeCanvas)
        resizeCanvas()

        // Initialize WebGL state
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        // Animation loop
        function drawScene(time: number) {
            const canvas = canvasRef.current
            const gl = glRef.current
            const programInfo = programInfoRef.current
            const buffers = buffersRef.current

            if (!canvas || !gl || !programInfo || !buffers) return

            // Position attribute
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                2, // 2 components per vertex
                gl.FLOAT, // the data is 32bit floats
                false, // don't normalize
                0, // stride
                0, // offset
            )
            gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)

            // Texture coordinates attribute
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord)
            gl.vertexAttribPointer(
                programInfo.attribLocations.textureCoord,
                2, // 2 components per vertex
                gl.FLOAT, // the data is 32bit floats
                false, // don't normalize
                0, // stride
                0, // offset
            )
            gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord)

            // Get current config from ref
            const config = configRef.current

            // Set the uniforms
            gl.uniform1f(programInfo.uniformLocations.time, time)
            gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width || 0, canvas.height || 0)
            gl.uniform1f(programInfo.uniformLocations.pixelSize, config.pixelSize)
            gl.uniform1f(programInfo.uniformLocations.pixelSpacing, config.pixelSpacing)
            gl.uniform4fv(programInfo.uniformLocations.offColor, config.offColor)
            gl.uniform4fv(programInfo.uniformLocations.onColor, config.onColor)
            gl.uniform1f(programInfo.uniformLocations.changeProbability, config.changeProbability)
            gl.uniform1f(programInfo.uniformLocations.pixelDensity, config.pixelDensity)
            gl.uniform1f(programInfo.uniformLocations.pixelPersistence, config.pixelPersistence)
            gl.uniform1i(programInfo.uniformLocations.isOn, config.isOn ? 1 : 0)

            // Draw the square (2 triangles, 4 vertices)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        }

        // Animation loop
        function animate(currentTime: number) {
            const gl = glRef.current
            const programInfo = programInfoRef.current

            if (!gl || !programInfo) return

            currentTime *= 0.001 // Convert to seconds

            // Get current config from ref
            const config = configRef.current

            // Only update if enough time has passed
            if (currentTime - lastFrameTimeRef.current > config.frameDelay / 1000) {
                frameCountRef.current++
                drawScene(frameCountRef.current * 0.1) // Use frameCount for time to control animation speed
                lastFrameTimeRef.current = currentTime
            }

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        // Start the animation
        if (programInfo && programInfo.program && gl) {
            gl.useProgram(programInfo.program)
        }
        animationFrameRef.current = requestAnimationFrame(animate)

        // Set up control event listeners if controls are shown
        if (showControls) {
            // Initialize control values
            setTimeout(() => {
                if (pixelSizeInputRef.current) {
                    pixelSizeInputRef.current.value = pixelSize.toString()
                    if (pixelSizeValueRef.current) {
                        pixelSizeValueRef.current.textContent = pixelSize.toString()
                    }
                }

                if (pixelSpacingInputRef.current) {
                    pixelSpacingInputRef.current.value = pixelSpacing.toString()
                    if (pixelSpacingValueRef.current) {
                        pixelSpacingValueRef.current.textContent = pixelSpacing.toString()
                    }
                }

                if (changeProbabilityInputRef.current) {
                    changeProbabilityInputRef.current.value = changeProbability.toString()
                    if (changeProbabilityValueRef.current) {
                        changeProbabilityValueRef.current.textContent = changeProbability.toFixed(3)
                    }
                }

                if (pixelDensityInputRef.current) {
                    pixelDensityInputRef.current.value = pixelDensity.toString()
                    if (pixelDensityValueRef.current) {
                        pixelDensityValueRef.current.textContent = pixelDensity.toFixed(2)
                    }
                }

                if (pixelPersistenceInputRef.current) {
                    pixelPersistenceInputRef.current.value = pixelPersistence.toString()
                    if (pixelPersistenceValueRef.current) {
                        pixelPersistenceValueRef.current.textContent = pixelPersistence.toFixed(2)
                    }
                }
            }, 0)
        }

        //Cleanup function
        return () => {
            window.removeEventListener("resize", resizeCanvas)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = null
            }
            if (gl && programInfoRef.current && programInfoRef.current.program) {
                gl.useProgram(null)
            }
        }
    }, [
        pixelSize,
        pixelSpacing,
        offColor,
        onColor,
        changeProbability,
        frameDelay,
        pixelDensity,
        pixelPersistence,
        showControls,
        isOn,
    ])

    // Handle control changes without using React state
    const handlePixelSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value)
        configRef.current.pixelSize = value
        if (pixelSizeValueRef.current) {
            pixelSizeValueRef.current.textContent = value.toString()
        }
    }

    const handlePixelSpacingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value)
        configRef.current.pixelSpacing = value
        if (pixelSpacingValueRef.current) {
            pixelSpacingValueRef.current.textContent = value.toString()
        }
    }

    const handleChangeProbabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseFloat(e.target.value)
        configRef.current.changeProbability = value
        if (changeProbabilityValueRef.current) {
            changeProbabilityValueRef.current.textContent = value.toFixed(3)
        }
    }

    const handlePixelDensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseFloat(e.target.value)
        configRef.current.pixelDensity = value
        if (pixelDensityValueRef.current) {
            pixelDensityValueRef.current.textContent = value.toFixed(2)
        }
    }

    const handlePixelPersistenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseFloat(e.target.value)
        configRef.current.pixelPersistence = value
        if (pixelPersistenceValueRef.current) {
            pixelPersistenceValueRef.current.textContent = value.toFixed(2)
        }
    }

    useEffect(() => {
        const gl = glRef.current
        const programInfo = programInfoRef.current

        if (gl && programInfo && programInfo.program) {
            gl.useProgram(programInfo.program)
        }

        return () => {
            if (gl && programInfo && programInfo.program) {
                gl.useProgram(null)
            }
        }
    }, [])

    return (
        <>
            <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full z-10 ${className}`} />

            {showControls && (
                <div className="fixed bottom-5 right-5 z-30 bg-black/70 p-4 rounded-lg backdrop-blur-sm border border-white/10 text-white">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <label htmlFor="pixelSize" className="min-w-[120px] text-sm">
                                Pixel Size:
                            </label>
                            <input
                                ref={pixelSizeInputRef}
                                type="range"
                                id="pixelSize"
                                min="1"
                                max="10"
                                defaultValue={pixelSize}
                                onChange={handlePixelSizeChange}
                                className="w-[150px]"
                            />
                            <span ref={pixelSizeValueRef} className="text-sm">
                                {pixelSize}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="pixelSpacing" className="min-w-[120px] text-sm">
                                Pixel Spacing:
                            </label>
                            <input
                                ref={pixelSpacingInputRef}
                                type="range"
                                id="pixelSpacing"
                                min="0"
                                max="10"
                                defaultValue={pixelSpacing}
                                onChange={handlePixelSpacingChange}
                                className="w-[150px]"
                            />
                            <span ref={pixelSpacingValueRef} className="text-sm">
                                {pixelSpacing}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="changeProbability" className="min-w-[120px] text-sm">
                                Change Speed:
                            </label>
                            <input
                                ref={changeProbabilityInputRef}
                                type="range"
                                id="changeProbability"
                                min="0.001"
                                max="0.02"
                                step="0.001"
                                defaultValue={changeProbability}
                                onChange={handleChangeProbabilityChange}
                                className="w-[150px]"
                            />
                            <span ref={changeProbabilityValueRef} className="text-sm">
                                {changeProbability.toFixed(3)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="pixelDensity" className="min-w-[120px] text-sm">
                                Pixel Density:
                            </label>
                            <input
                                ref={pixelDensityInputRef}
                                type="range"
                                id="pixelDensity"
                                min="0.05"
                                max="0.5"
                                step="0.01"
                                defaultValue={pixelDensity}
                                onChange={handlePixelDensityChange}
                                className="w-[150px]"
                            />
                            <span ref={pixelDensityValueRef} className="text-sm">
                                {pixelDensity.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="pixelPersistence" className="min-w-[120px] text-sm">
                                Persistence:
                            </label>
                            <input
                                ref={pixelPersistenceInputRef}
                                type="range"
                                id="pixelPersistence"
                                min="0"
                                max="0.99"
                                step="0.01"
                                defaultValue={pixelPersistence}
                                onChange={handlePixelPersistenceChange}
                                className="w-[150px]"
                            />
                            <span ref={pixelPersistenceValueRef} className="text-sm">
                                {pixelPersistence.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
