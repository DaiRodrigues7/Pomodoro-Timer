/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#FFB3D1',
        'pastel-blue': '#B3D9FF',
        'pastel-green': '#B3FFD9',
        'pastel-purple': '#D9B3FF',
        'pastel-yellow': '#FFD93D',
        'pastel-orange': '#FFB366',
        // Solune theme colors
        'sol-yellow': '#FFD4A3',
        'sol-orange': '#FFB366',
        'sol-cream': '#FFF8F0',
        'lune-purple': '#E6D3FF',
        'lune-lilac': '#E8D4F1',
        'lune-violet': '#9333EA',
        'lune-mist': '#F0E6FF',
      },
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        'kawaii': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'bubble': '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'kawaii-transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'theme-transition': 'background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
