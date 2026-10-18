const NO_POSTER = "https://placehold.co/300x450?text=Pas+d%27affiche";

// Crée et renvoie une carte HTML pour un film
export function createMovieCard(movie) {
  const card = document.createElement("article");
  card.className = "movie-card";

  // Le poster
  const img = document.createElement("img");
  img.src = movie.Poster !== "N/A" ? movie.Poster : NO_POSTER;
  img.alt = `Affiche de ${movie.Title}`;
  img.loading = "lazy";

  const body = document.createElement("div");
  body.className = "movie-card-body";

  // Le titre et l'année
  const title = document.createElement("h3");
  title.textContent = `${movie.Title} (${movie.Year})`;
  body.append(title);

  // Le résumé, seulement s'il existe (bonus)
  if (movie.Plot && movie.Plot !== "N/A") {
    const plot = document.createElement("p");
    plot.textContent = movie.Plot;
    body.append(plot);
  }

  // Le lien vers la page détail
  const link = document.createElement("a");
  link.href = `movie.html?id=${movie.imdbID}`;
  link.textContent = "En savoir plus →";
  body.append(link);

  card.append(img, body);
  return card;
}