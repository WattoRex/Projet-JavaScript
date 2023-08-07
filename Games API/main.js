// Fonction pour créer une carte de jeu
function createGameCard(game) {
  const gameCard = document.createElement("div");
  gameCard.classList.add("game-card");

  const title = document.createElement("h2");
  title.textContent = game.name;
  gameCard.appendChild(title);

  const genre = document.createElement("p");
  genre.textContent = `Genre: ${game.genres
    .map((genre) => genre.name)
    .join(", ")}`;
  gameCard.appendChild(genre);

  const releaseDate = document.createElement("p");
  releaseDate.textContent = `Date de sortie: ${game.released}`;
  gameCard.appendChild(releaseDate);

  const image = document.createElement("img");
  image.src = game.background_image;
  image.alt = game.name;
  image.width = 200;
  gameCard.appendChild(image);

  // Ajouter un événement click pour afficher la fiche détaillée du jeu sur une nouvelle page
  gameCard.addEventListener("click", () => showGameDetails(game));

  return gameCard;
}

// Fonction pour afficher la fiche détaillée du jeu sur une nouvelle page
function showGameDetails(game) {
  // Ouvrir une nouvelle page avec la fiche détaillée du jeu
  const newPage = window.open("", "_blank");
  newPage.document.write(`
  <html>
  <head>
    <title>${game.name} - Fiche détaillée</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="game-details">
      <h1 class="game-title">${game.name}</h1>
      <p class="game-genre">Genre: ${game.genres
        .map((genre) => genre.name)
        .join(", ")}</p>
      <p class="game-release-date">Date de sortie: ${game.released}</p>
      <p class="game-platforms">Plateformes: ${game.platforms
        .map((platform) => platform.platform.name)
        .join(", ")}</p>
      <p class="game-last-update">Dernière mise à jour: ${game.updated}</p>
      <img src="${game.background_image}" alt="${
    game.name
  }" class="game-image" width="200" >
      <p class="game-description">Description: ${
        game.description_raw || "Aucune description disponible."
      }</p>
      <p class="game-metacritic">Note Metacritic: ${
        game.metacritic || "Non disponible"
      }</p>

      <h2 class="game-shops-title">Shops:</h2>
      <ul class="game-shops-list">
        ${game.stores.map((store) => `<li>${store.store.name}</li>`).join("")}
      </ul>

      <h2 class="game-screenshots-title">Screenshots:</h2>
      <div class="game-screenshots-container">
        ${game.short_screenshots
          .map(
            (screenshot) =>
              `<img src="${screenshot.image}" alt="Screenshot" class="game-screenshot">`
          )
          .join("")}
      </div>
    </div>
  </body>
  </html>
`);
}

// Appel à l'API rawg.io games via fetch
const apiUrl =
  "https://api.rawg.io/api/games?key=de462d1e145d44e084148f017bf5976d&dates=2019-09-01,2019-09-30&platforms=18,1,7";
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const games = data.results;
    const gameCardContainer = document.getElementById("game-cards-container");

    games.forEach((game) => {
      const gameCard = createGameCard(game);
      gameCardContainer.appendChild(gameCard);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de l'appel à l'API :", error);
  });

// Test Suppression 1
// // Fonction pour supprimer une carte de jeu
// function deleteGameCard(game) {
//   // Ici, nous devons trouver l'élément DOM correspondant à la carte de jeu et le supprimer
//   const gameCardContainer = document.getElementById("game-cards-container");
//   const gameCards = gameCardContainer.getElementsByClassName("game-card");

//   // Parcourir toutes les cartes de jeu pour trouver celle qui correspond au jeu donné
//   for (let i = 0; i < gameCards.length; i++) {
//     const card = gameCards[i];
//     const titleElement = card.querySelector("h2");
//     const title = titleElement.textContent;

//     // Si le titre de la carte correspond au nom du jeu, nous la supprimons
//     if (title === game.name) {
//       gameCardContainer.removeChild(card);
//       break; // Sortir de la boucle car nous avons trouvé la carte à supprimer
//     }
//   }
// }

// // Pour tester la suppression, vous pouvez l'appeler avec un jeu fictif
// const gameToDelete = {
//   name: "Nom du jeu à supprimer",
//   // Ajoutez ici d'autres propriétés du jeu si nécessaire
// };

// // Appel de la fonction pour supprimer la carte du jeu donné
// deleteGameCard(gameToDelete);

// Test Suppression 2
// // Fonction pour supprimer une carte de jeu côté DOM
// function deleteGameCard(game) {
//   const gameCardContainer = document.getElementById("game-cards-container");
//   const gameCardToDelete = gameCardContainer.querySelector(
//     `[data-id="${game.name}"]`
//   );

//   if (gameCardToDelete) {
//     gameCardContainer.removeChild(gameCardToDelete);
//   } else {
//     console.error("La carte de jeu à supprimer n'a pas été trouvée.");
//   }
// }

// // Pour tester la suppression côté DOM, vous pouvez l'appeler avec l'ID du jeu fictif
// const gameIdToDelete = "GreedFall"; //

// // Appel de la fonction pour supprimer la carte du jeu côté DOM
// deleteGameCard(gameIdToDelete);

// Test ajout 1
// // Fonction pour créer un nouveau jeu et l'ajouter à la liste des jeux affichés
// function addNewGame(gameData) {
//   // Créer un nouvel objet de jeu avec les informations fournies
//   const newGame = {
//     name: gameData.name || "Nouveau jeu",
//     genres: gameData.genres || [],
//     released: gameData.released || "Date de sortie inconnue",
//     background_image: gameData.background_image || "",
//     platforms: gameData.platforms || [],
//     updated: gameData.updated || "Dernière mise à jour inconnue",
//     description_raw: gameData.description_raw || "",
//     metacritic: gameData.metacritic || "",
//     stores: gameData.stores || [],
//     short_screenshots: gameData.short_screenshots || [],
//   };

//   // Créer la carte de jeu pour le nouveau jeu
//   const newGameCard = createGameCard(newGame);

//   // Ajouter la carte du nouveau jeu à la liste des jeux affichés
//   const gameCardContainer = document.getElementById("game-cards-container");
//   gameCardContainer.appendChild(newGameCard);
// }

// // Exemple d'appel à la fonction addNewGame avec les détails du nouveau jeu
// const newGameData = {
//   name: "Mon nouveau jeu",
//   genres: [{ name: "Aventure" }, { name: "Action" }],
//   released: "2023-08-02",
//   background_image: "./Symbole.png",
//   platforms: [
//     { platform: { name: "PC" } },
//     { platform: { name: "PlayStation" } },
//   ],
//   updated: "2023-08-02",
//   description_raw: "Description de mon nouveau jeu.",
//   metacritic: 85,
//   stores: [
//     { store: { name: "Steam" } },
//     { store: { name: "Epic Games Store" } },
//   ],
//   short_screenshots: [
//     { image: "https://example.com/screenshot1.jpg" },
//     { image: "https://example.com/screenshot2.jpg" },
//   ],
// };
// console.log(newGameData);

// addNewGame(newGameData);
