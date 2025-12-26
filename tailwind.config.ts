import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./registry/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)'],
				mono: ['var(--font-mono)']
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			typography: {
				DEFAULT: {
					css: {
						'--tw-prose-body': 'hsl(var(--muted-foreground))',
						'--tw-prose-headings': 'hsl(var(--foreground))',
						'--tw-prose-invert-body': 'hsl(var(--muted-foreground))',
						'--tw-prose-invert-headings': 'hsl(var(--foreground))',
						h1: {
							color: 'hsl(var(--foreground))',
							fontWeight: '700',
							fontSize: '1.875rem',
							lineHeight: '1.2',
							marginBottom: '1.25rem',
						},
						h2: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600',
							fontSize: '1.5rem',
							lineHeight: '1.3',
							marginTop: '2.5rem',
							marginBottom: '1rem',
						},
						h3: {
							color: 'hsl(var(--foreground))',
							fontWeight: '500',
							fontSize: '1.125rem',
							lineHeight: '1.3',
							marginTop: '1.5rem',
							marginBottom: '0.75rem',
						},
						h4: {
							color: 'hsl(var(--foreground))',
							fontWeight: '500',
							fontSize: '1rem',
							lineHeight: '1.3',
							marginTop: '1.25rem',
							marginBottom: '0.5rem',
						},
						p: {
							color: 'hsl(var(--muted-foreground))',
							fontSize: '1rem',
							lineHeight: '1.8',
							marginTop: '1.25rem',
							marginBottom: '1.25rem',
						},
						a: {
							color: 'hsl(var(--primary))',
							textDecoration: 'underline',
							'&:hover': {
								textDecoration: 'none',
							},
						},
						strong: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600',
						},
						ul: {
							listStyleType: 'disc',
							paddingLeft: '1.625rem',
						},
						ol: {
							listStyleType: 'decimal',
							paddingLeft: '1.625rem',
						},
						li: {
							color: 'hsl(var(--muted-foreground))',
							fontSize: '1rem',
							marginTop: '0.5rem',
							marginBottom: '0.5rem',
						},
						blockquote: {
							borderLeftWidth: '4px',
							borderLeftColor: 'hsl(var(--border))',
							paddingLeft: '1rem',
							marginTop: '1.5rem',
							marginBottom: '1.5rem',
							color: 'hsl(var(--muted-foreground))',
						},
					}
				},
				lg: {
					css: {
						'--tw-prose-body': 'hsl(var(--muted-foreground))',
						'--tw-prose-headings': 'hsl(var(--foreground))',
						'--tw-prose-invert-body': 'hsl(var(--muted-foreground))',
						'--tw-prose-invert-headings': 'hsl(var(--foreground))',
					}
				}
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				selection: {
					DEFAULT: 'var(--selection)',
					foreground: 'var(--selection-foreground)'
				},
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
	],
} satisfies Config;
