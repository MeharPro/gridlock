
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#3d8bfd',
					foreground: 'hsl(var(--primary-foreground))',
					50: '#edf5ff',
					100: '#dfeaff',
					200: '#c4d9ff',
					300: '#9dc0ff',
					400: '#759dff',
					500: '#5b7cfd',
					600: '#3d5ef4',
					700: '#2f4ad9',
					800: '#2a3fb1',
					900: '#293c8c',
					950: '#1a224e',
				},
				secondary: {
					DEFAULT: '#6c757d',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: '#10b981',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for our app
				'background-light': '#f8fafc',
				'surface': '#ffffff',
				'text-primary': '#1e293b',
				'text-secondary': '#64748b',
				'optimal-bg': 'rgba(16, 185, 129, 0.1)',
				'mid-bg': 'rgba(245, 158, 11, 0.1)',
				'peak-bg': 'rgba(239, 68, 68, 0.1)',
				'alert': '#ef4444',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				's': '0.25rem',
				'm': '0.5rem',
				'l': '0.75rem',
				'xl': '1rem',
				'2xl': '1.5rem',
				'pill': '9999px',
			},
			fontFamily: {
				sans: [
					'Inter',
					'SF Pro Display',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif',
				],
			},
			fontSize: {
				'h1': '2rem',    // 32px
				'h2': '1.5rem',  // 24px
				'h3': '1.25rem', // 20px
				'h4': '1.125rem', // 18px
				'body': '1rem',  // 16px
				'caption': '0.875rem', // 14px
			},
			boxShadow: {
				'level-1': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
				'level-2': '0 3px 6px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
				'level-3': '0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.05)',
				'card': '0px 2px 8px -2px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.05)',
			},
			keyframes: {
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
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
