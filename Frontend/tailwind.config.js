/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ajout des couleurs spécifiques à ton projet
        'fluence-orange': '#FF6B00',
        'fluence-black': '#050505',
      },
      backgroundImage: {
        // Optionnel : si tu veux un dégradé spécifique réutilisable
        'orange-gradient': 'linear-gradient(135deg, #FF6B00 0%, #FF9D42 100%)',
      }
    },
  },
  plugins: [],
};