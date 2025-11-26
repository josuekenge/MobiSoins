/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#003366', 
          800: '#003366', 
          900: '#003366', // Unified to #003366
        },
        blue: {
          50: '#eef6fc', 
          100: '#dcebf9',
          200: '#b9d7f3',
          300: '#96c3ed',
          400: '#509ce1',
          500: '#003366', // Updated to #003366
          600: '#003366', // The requested color
          700: '#003366', // Unified
          800: '#00264d',
          900: '#001f40',
        },
        green: {
          50: '#f4f8f3',
          100: '#e6eee4',
          200: '#cddcc9',
          300: '#aebfa9',
          400: '#98B690', // New Accent Green #98B690
          500: '#7da074',
          600: '#63825b',
          700: '#4e6645',
          800: '#3d5036',
          900: '#32412d',
        },
        primary: {
          DEFAULT: '#003366', // Updated to #003366
          light: '#004080',
        },
        secondary: {
          DEFAULT: '#98B690', // Updated to #98B690
          dark: '#7da074',
        },
        accent: {
          DEFAULT: '#007BFF',
          hover: '#0056b3',
        },
        background: {
          light: '#f5f7fa',
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        accent: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out 1.5s infinite',
        'draw': 'draw 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        draw: {
          '0%': { strokeDasharray: '0 1000', opacity: '0' },
          '100%': { strokeDasharray: '1000 1000', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
