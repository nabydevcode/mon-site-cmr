/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html.twig', // Prend en compte tous les fichiers Twig
    './assets/**/*.js', // Si tu utilises du JS dans tes assets
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
