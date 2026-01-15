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
        // Primary - Rose Gold
        rose: {
          50: '#FDF5F6',
          100: '#FAE8EA',
          200: '#F4D0D5',
          300: '#E9ACB4',
          400: '#D4A5AA',
          500: '#B76E79',  // Primary rose gold
          600: '#9A5A63',  // Darker rose gold
          700: '#7D4850',
          800: '#5E363C',
          900: '#3F2428',
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
        'soft': '0 4px 20px rgba(183, 110, 121, 0.08)',
        'elegant': '0 8px 40px rgba(183, 110, 121, 0.12)',
        'dark': '0 8px 40px rgba(0, 0, 0, 0.25)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};

export default config;
