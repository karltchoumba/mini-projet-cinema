// Ta clé est lue dans le fichier .env (grâce à Vite)
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

// Fonction "interne" : envoie une requête à OMDb et renvoie les données
async function request(params) {
  const url = new URL(BASE_URL);
  url.searchParams.set("apikey", API_KEY);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Problème de connexion avec OMDb");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
}

// Chercher des films par titre (10 résultats par page)
export async function searchMovies(title, page = 1) {
  const data = await request({ s: title, type: "movie", page: page });
  return {
    movies: data.Search,
    total: Number(data.totalResults),
  };
}

// Récupérer tous les détails d'un film grâce à son imdbID
export async function getMovieById(id) {
  return request({ i: id, plot: "full" });
}