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
        // Primary - Deep Emerald
        emerald: {
          50: '#F0F7F3',
          100: '#D1EDE2',
          200: '#A8D9C1',
          300: '#7EC0A0',
          400: '#4EA584',  // Light emerald — hover states, soft accents
          500: '#1E6B4A',  // PRIMARY — deep jewel emerald
          600: '#175438',  // Darker emerald — hover darken
          700: '#103D2A',
          800: '#0D2E1F',
          900: '#071A11',
        },
        // Soft Gold - Accent color for premium highlights
        gold: {
          50: '#FFFDF5',
          100: '#FEF9E7',
          200: '#FCF0C3',
          300: '#F9E49B',
          400: '#F5D56E',
          500: '#D4AF37',  // Primary soft gold
          600: '#B8942E',  // Slightly darker for text
          700: '#8B7121',
          800: '#5E4D16',
          900: '#31280B',
        },
        // Champagne/Ivory backgrounds
        champagne: {
          DEFAULT: '#FAF6F0',
          50: '#FFFEF9',
          100: '#FAF6F0',
          200: '#F0E8DC',
          300: '#E8E0D4',
          400: '#D8CCBC',
          500: '#C4B49F',
        },
        // Charcoal/Black
        charcoal: {
          DEFAULT: '#1C1C1C',
          50: '#6B6B6B',
          100: '#5A5A5A',
          200: '#4A4A4A',
          300: '#3A3A3A',
          400: '#2D2D2D',
          500: '#1C1C1C',
        },
        // Legacy support
        cream: {
          DEFAULT: '#FAF6F0',
          light: '#FFFEF9',
          dark: '#F0E8DC',
        },
        beige: {
          100: '#FAF6F0',
          200: '#F0E8DC',
          300: '#E8E0D4',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.08em',
        'wide': '0.05em',
        'elegant': '0.03em',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(30, 107, 74, 0.08)',
        'elegant': '0 8px 40px rgba(30, 107, 74, 0.12)',
        'dark': '0 8px 40px rgba(0, 0, 0, 0.25)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.15)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderColor: {
        'gold-accent': 'rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
