/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aurum brand colors
        'aurum': {
          'gold': '#FFB81C',
          'gold-light': '#FFD700',
          'gold-dark': '#CC9400',
          'navy': '#0F1729',
          'navy-light': '#1A2744',
          'navy-dark': '#0A0F1A',
        },
        // Semantic colors
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
