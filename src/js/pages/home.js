import { searchMovies, getMovieById } from "../api/omdb.js";

async function test() {
  try {
    const result = await searchMovies("batman");
    console.log("Recherche :", result);

    const film = await getMovieById(result.movies[0].imdbID);
    console.log("Détail du 1er film :", film);
  } catch (error) {
    console.error("Erreur :", error.message);
  }
}

test();