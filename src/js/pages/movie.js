import { getMovieById } from "../api/omdb.js";
import { NO_POSTER } from "../components/movieCard.js";
import { formatDateFr } from "../utils/formatDate.js";

const message = document.querySelector("#message");
const movieSection = document.querySelector("#movie");


function showText(selector, value) {
  const element = document.querySelector(selector);
  element.textContent = value && value !== "N/A" ? value : "Non disponible";
}

async function loadMovie() {
   
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    message.textContent = "Aucun film sélectionné.";
    return;
  }

  try {
    // Demander le détail du film (résumé complet)
    const movie = await getMovieById(id, "full");

    
    document.title = `${movie.Title} - Cinema Village`;

    const poster = document.querySelector("#movie-poster");
    poster.src = movie.Poster !== "N/A" ? movie.Poster : NO_POSTER;
    poster.alt = `Affiche de ${movie.Title}`;

    showText("#movie-title", movie.Title);
    showText("#movie-year", movie.Year);
    showText("#movie-runtime", movie.Runtime);
    showText("#movie-genre", movie.Genre);
    showText("#movie-plot", movie.Plot);
    showText("#movie-actors", movie.Actors);

    // la date de sortie en DVD au format français
    showText("#movie-dvd", formatDateFr(movie.DVD));

    // les notes 
    const ratingsList = document.querySelector("#movie-ratings");
    const ratings = movie.Ratings || [];

    if (ratings.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Aucune note disponible";
      ratingsList.append(li);
    }

    ratings.forEach((rating) => {
      const li = document.createElement("li");
      li.textContent = `${rating.Source} : ${rating.Value}`;
      ratingsList.append(li);
    });

    
    message.remove();
    movieSection.hidden = false;
  } catch (error) {
    message.textContent = "Impossible d'afficher ce film : " + error.message;
  }
}

loadMovie();