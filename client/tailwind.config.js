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
          700: '#334e68',
          800: '#1e3a5f', // Primary navy from logo
          900: '#152942', // Darker navy
        },
        green: {
          50: '#f0f9f4',
          100: '#dcf3e6',
          200: '#b8e7cd',
          300: '#7cd4a4',
          400: '#7cb342', // Primary green from logo
          500: '#5a9b2f',
          600: '#4a8027',
          700: '#3d6821',
          800: '#2f511a',
          900: '#234013',
        },
        primary: {
          DEFAULT: '#1e3a5f',
          light: '#2c4f7c',
        },
        secondary: {
          DEFAULT: '#7cb342',
          dark: '#5a8a2a',
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
