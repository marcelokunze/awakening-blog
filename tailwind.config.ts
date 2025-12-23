import type { Config } from "tailwindcss";

const sharedTypographyStyles = {
	'--tw-prose-body': 'hsl(var(--body-blog))',
	'--tw-prose-headings': 'hsl(var(--heading-blog))',
	'--tw-prose-invert-body': 'hsl(var(--body-blog))',
	'--tw-prose-invert-headings': 'hsl(var(--heading-blog))',
	h1: {
		color: 'hsl(var(--foreground))',
		fontWeight: '700',
		fontSize: '1.875rem', // 30px
		lineHeight: '1.2',
		marginBottom: '1.25rem',
	},
	h2: {
		color: 'hsl(var(--heading-blog))',
		fontWeight: '600',
		fontSize: '1.5rem', // 24px
		lineHeight: '1.3',
		marginTop: '2.5rem',
		marginBottom: '1rem',
	},
	h3: {
		color: 'hsl(var(--heading-blog))',
		fontWeight: '500',
		fontSize: '1.125rem', // 18px
		lineHeight: '1.3',
		marginTop: '1.5rem',
		marginBottom: '0.75rem',
	},
	h4: {
		color: 'hsl(var(--heading-blog))',
		fontWeight: '500',
		fontSize: '1rem', // 16px
		lineHeight: '1.3',
		marginTop: '1.25rem',
		marginBottom: '0.5rem',
	},
	p: {
		color: 'hsl(var(--body-blog))',
		fontSize: '1rem', // 16px
		lineHeight: '1.8',
		marginTop: '1.25rem',
		marginBottom: '1.25rem',
	},
	a: {
		color: 'hsl(var(--selection-text))',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	strong: {
		color: 'hsl(var(--body-blog))',
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
		color: 'hsl(var(--body-blog))',
		fontSize: '1rem', // 16px
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
};

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
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
                                sans: [
                                        'var(--font-sans)'
                                ],
                                host: [
                                        'var(--font-host)'
                                ]
                        },
			width: {
				'128': '32rem'
			},
			height: {
				'128': '32rem'
			},
			animation: {
				breath: 'breath 15s cubic-bezier(0.7, 0.02, 0.3, 0.95) infinite',
				'breath-slow': 'breath-slow 15s cubic-bezier(0.7, 0.02, 0.3, 0.95) infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			keyframes: {
				breath: {
					'0%': {
						transform: 'scale(0.75)'
					},
					'53%': {
						transform: 'scale(1)'
					},
					'80%': {
						transform: 'scale(1)'
					},
					'100%': {
						transform: 'scale(0.75)'
					}
				},
				'breath-slow': {
					'0%': {
						transform: 'scale(1.25)'
					},
					'53%': {
						transform: 'scale(0.95)'
					},
					'80%': {
						transform: 'scale(0.95)'
					},
					'100%': {
						transform: 'scale(1.25)'
					}
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
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
						...sharedTypographyStyles
					}
				},
				lg: {
					css: {
						...sharedTypographyStyles
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
				'body-blog': 'hsl(var(--body-blog))',
				'heading-blog': 'hsl(var(--heading-blog))',
				'selection-background': 'hsl(var(--selection-background))',
				'selection-text': 'hsl(var(--selection-text))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				accentblue: 'hsl(var(--accentblue))',
				shade: {
					50:  'hsl(var(--shade-50))',
					20:  'hsl(var(--shade-20))',
					100: 'hsl(var(--shade-100))',
					200: 'hsl(var(--shade-200))',
					300: 'hsl(var(--shade-300))',
					400: 'hsl(var(--shade-400))',
					500: 'hsl(var(--shade-500))',
					600: 'hsl(var(--shade-600))',
					700: 'hsl(var(--shade-700))',
					800: 'hsl(var(--shade-800))',
					900: 'hsl(var(--shade-900))',
					920: 'hsl(var(--shade-920))',
					950: 'hsl(var(--shade-950))',
				}
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
	],
} satisfies Config;