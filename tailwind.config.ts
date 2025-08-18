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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Space Grotesk', 'system-ui', 'sans-serif'],
				'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
				'space': ['Space Grotesk', 'sans-serif'],
				'jetbrains': ['JetBrains Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
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
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				gold: {
					DEFAULT: 'hsl(var(--gold))',
					foreground: 'hsl(var(--gold-foreground))'
				},
				orange: {
					DEFAULT: 'hsl(var(--orange))',
					foreground: 'hsl(var(--orange-foreground))'
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'fadeInUp': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slideInLeft': {
					'0%': { opacity: '0', transform: 'translateX(-30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slideInRight': {
					'0%': { opacity: '0', transform: 'translateX(30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'scaleIn': {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'gradient-x': {
					'0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
					'50%': { 'background-size': '200% 200%', 'background-position': 'right center' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'hologram': {
					'0%, 100%': { transform: 'rotateY(0deg) scale(1)', filter: 'hue-rotate(0deg)' },
					'25%': { transform: 'rotateY(5deg) scale(1.02)', filter: 'hue-rotate(90deg)' },
					'50%': { transform: 'rotateY(0deg) scale(1.05)', filter: 'hue-rotate(180deg)' },
					'75%': { transform: 'rotateY(-5deg) scale(1.02)', filter: 'hue-rotate(270deg)' }
				},
				'float-particle': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.6' },
					'50%': { transform: 'translateY(-20px) rotate(180deg)', opacity: '1' }
				},
				'scanner': {
					'0%': { top: '-10%', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { top: '110%', opacity: '0' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--accent) / 0.5)' }
				},
				'glitch': {
					'0%, 100%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
					'20%': { transform: 'translate(-1px, 1px)', filter: 'hue-rotate(90deg)' },
					'40%': { transform: 'translate(-1px, -1px)', filter: 'hue-rotate(180deg)' },
					'60%': { transform: 'translate(1px, 1px)', filter: 'hue-rotate(270deg)' },
					'80%': { transform: 'translate(1px, -1px)', filter: 'hue-rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
				'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
				'slide-in-right': 'slideInRight 0.8s ease-out forwards',
				'scale-in': 'scaleIn 0.6s ease-out forwards',
				'pulse-slow': 'pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'gradient-x': 'gradient-x 4s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'hologram': 'hologram 8s ease-in-out infinite',
				'float-particle': 'float-particle 4s ease-in-out infinite',
				'scanner': 'scanner 6s linear infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'glitch': 'glitch 2s ease-in-out infinite',
				'spin-slow': 'spin 8s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
