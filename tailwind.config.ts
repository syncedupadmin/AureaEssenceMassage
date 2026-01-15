import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Áurea Essence palette - warm, elegant, sophisticated
        black: {
          DEFAULT: '#1A1A1A',
          light: '#2A2A2A',
          medium: '#222222',
        },
        charcoal: {
          DEFAULT: '#2A2A2A',
          light: '#3D3D3D',
          dark: '#1A1A1A',
        },
        // Dusty rose/terracotta - from logo
        rose: {
          50: '#FCF8F6',
          100: '#F5EBE7',
          200: '#E8D4CC',
          300: '#D4B5A8',
          400: '#C49A8A',
          500: '#B07D6B',  // Primary - from logo text
          600: '#9A6B5A',
          700: '#7D5648',
          800: '#5E4137',
          900: '#3F2B25',
        },
        // Warm beige/cream - from logo background
        beige: {
          50: '#FDFBF9',
          100: '#F9F5F1',
          200: '#F2EBE3',
          300: '#EDE6DC',  // Logo background color
          400: '#E4D9CC',
          500: '#D5C7B8',
          600: '#B8A897',
          700: '#9A8B7A',
          800: '#7A6E60',
          900: '#5A5246',
        },
        // Warm neutrals
        cream: {
          DEFAULT: '#FAF7F4',
          light: '#FDFCFA',
          dark: '#F5F0EB',
        },
        // Accent bronze/copper tones
        copper: {
          300: '#C9957A',
          400: '#B8846A',
          500: '#A67259',
          600: '#8B5E48',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        'luxury': '0.08em',
        'wide': '0.15em',
        'elegant': '0.03em',
      },
      backgroundImage: {
        'rose-subtle': 'linear-gradient(135deg, #B07D6B 0%, #C49A8A 100%)',
        'beige-gradient': 'linear-gradient(180deg, #FAF7F4 0%, #EDE6DC 100%)',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(176, 125, 107, 0.08)',
        'elegant': '0 8px 30px rgba(176, 125, 107, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
