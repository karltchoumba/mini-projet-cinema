const CLE_API = "6c51ae5a";
const URL_API = "https://www.omdbapi.com/";

const formulaire = document.getElementById("fchercher");
const champ = document.getElementById("chercher");
const resultats = document.getElementById("resultats");
const boutonPlus = document.getElementById("plus");

let requete = "";
let page = 1;
let nbrefilm = 0;
let nbreAffiches = 0;
let minuteur;
let idRequete = 0;

// Empêche le rechargement de la page quand on appuie sur Entrée
formulaire.addEventListener("submit", function (evenement) {
  evenement.preventDefault();
});

// Crée la carte d'un film (affiche + titre + lien)
function creerCarte(film) {
  const carte = document.createElement("div");

  if (film.Poster && film.Poster !== "N/A") {
    const image = document.createElement("img");
    image.src = film.Poster;
    image.alt = `Affiche de ${film.Title}`;
    image.width = 150;
    carte.append(image);
  } else {
    carte.append("Pas d'affiche");
  }

  const titre = document.createElement("h3");
  titre.textContent = `${film.Title} (${film.Year})`;

  const lien = document.createElement("a");
  lien.href = `movie.html?id=${film.imdbID}`;
  lien.textContent = "En savoir plus";

  carte.append(titre, lien);
  return carte;
}

// Appelle l'API pour la page courante et ajoute les résultats
async function charger() {
  const monId = ++idRequete;
  const url = `${URL_API}?apikey=${CLE_API}&type=movie&s=${encodeURIComponent(requete)}&page=${page}`;

  try {
    const reponse = await fetch(url);
    const donnees = await reponse.json();
    if (monId !== idRequete) return; // une recherche plus récente a été lancée

    if (donnees.Response === "False") {
      if (page === 1) resultats.textContent = donnees.Error;
      boutonPlus.hidden = true;
      return;
    }

    nbrefilm = Number(donnees.totalResults);
    nbreAffiches += donnees.Search.length;
    resultats.append(...donnees.Search.map(creerCarte));
    boutonPlus.hidden = nbreAffiches >= nbrefilm;
  } catch {
    if (monId === idRequete) resultats.textContent = "Erreur réseau, réessayez.";
  }
}

// Nouvelle recherche : on remet tout à zéro
function nouvelleRecherche() {
  requete = champ.value.trim();
  page = 1;
  nbreAffiches = 0;
  nbrefilm = 0;
  resultats.replaceChildren();
  boutonPlus.hidden = true;
  idRequete++;
  if (requete) charger();
}

// Recherche en temps réel avec délai (évite un appel API à chaque lettre)
champ.addEventListener("input", function () {
  clearTimeout(minuteur);
  minuteur = setTimeout(nouvelleRecherche, 300);
});

// Charger plus de résultats
boutonPlus.addEventListener("click", function () {
  page++;
  charger();
});