import { getMovieById, searchMovies } from "../api/omdb.js";
import { createMovieCard } from "../components/movieCard.js";

// Les films que l'on considère "tendance" (leurs identifiants IMDb)
const TRENDING_IDS = [
  "tt15239678", // Dune: Part Two
  "tt6263850",  // Deadpool & Wolverine
  "tt22022452", // Inside Out 2
  "tt9218128",  // Gladiator II
  "tt1262426",  // Wicked
  "tt17526714", // The Substance
];

// On récupère les éléments de la page
const trendingContainer = document.querySelector("#trending");
const trendingMessage = document.querySelector("#trending-message");
const container2024 = document.querySelector("#movies-2024");
const loadMoreButton = document.querySelector("#load-more");

// ----- Films tendances -----
async function loadTrending() {
  try {
    const movies = await Promise.all(
      TRENDING_IDS.map((id) => getMovieById(id, "short"))
    );

    trendingMessage.remove();
    movies.forEach((movie) => {
      trendingContainer.append(createMovieCard(movie));
    });
  } catch (error) {
    trendingMessage.textContent = "Impossible de charger les films : " + error.message;
  }
}

// ----- Films de 2024 (bouton "charger plus") -----
let page2024 = 0;

async function loadMore2024() {
  page2024++;
  loadMoreButton.disabled = true;

  try {
    const { movies, total } = await searchMovies("love", page2024, 2024);
    movies.forEach((movie) => {
      container2024.append(createMovieCard(movie));
    });

    // S'il n'y a plus de films à charger, on cache le bouton
    if (page2024 * 10 >= total) {
      loadMoreButton.hidden = true;
    }
  } catch (error) {
    loadMoreButton.hidden = true;
    console.error(error.message);
  } finally {
    loadMoreButton.disabled = false;
  }
}

loadMoreButton.addEventListener("click", loadMore2024);

// Au chargement de la page
loadTrending();
loadMore2024();