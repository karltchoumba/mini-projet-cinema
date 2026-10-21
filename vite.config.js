import { defineConfig } from "vite";

// On indique à Vite les 3 pages du site pour qu'il crée un bundle par page
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        accueil: "index.html",
        recherche: "search.html",
        film: "movie.html",
      },
    },
  },
});