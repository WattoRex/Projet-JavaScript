// Sélection des éléments HTML nécessaires à manipuler
const container = document.querySelector(".container"); // Le conteneur principal
const search = document.querySelector(".search-box button"); // Le bouton de recherche
const weatherBox = document.querySelector(".weather-box"); // La boîte contenant les informations météo principales
const weatherDetails = document.querySelector(".weather-details"); // La boîte contenant les détails supplémentaires sur la météo
const error404 = document.querySelector(".not-found"); // Le message d'erreur en cas de code postal invalide

// Ajout d'un écouteur d'événement sur le clic du bouton de recherche
search.addEventListener("click", () => {
  // Clé d'API pour accéder aux données météo
  const APIKey = "e3df682f3be0b09d230dbf20bdf8f437";

  // Récupération de la valeur du code postal entré par l'utilisateur
  const zipcode = document.querySelector(".search-box input").value;

  // Si aucun code postal n'est entré, on quitte la fonction sans rien faire
  if (zipcode === "") return;

  // Appel à l'API OpenWeatherMap pour obtenir les données météo basées sur le code postal fourni
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},FR&lang=fr&appid=${APIKey}`
  )
    .then((response) => response.json()) // Conversion de la réponse en objet JSON
    .then((json) => {
      // Vérification si la réponse contient une erreur 404 (code postal invalide)
      if (json.cod === "404") {
        // En cas d'erreur 404, on masque les boîtes de données météo et affiche le message d'erreur
        container.style.height = "400px"; // Réduire la hauteur du conteneur principal
        weatherBox.style.display = "none"; // Masquer la boîte principale d'informations météo
        weatherDetails.style.display = "none"; // Masquer la boîte des détails supplémentaires sur la météo
        error404.style.display = "block"; // Afficher le message d'erreur
        error404.classList.add("fadeIn"); // Appliquer une animation de fondu (fadeIn) au message d'erreur
        return; // Quitter la fonction
      }

      // Technique de modification TextCOntent
      // Si aucune erreur, masquer le message d'erreur s'il était affiché précédemment
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      // Fonction pour mettre à jour à jour l'image en fonction des condition méteo
      function updateWeatherIcon(weatherMain) {
        const image = document.querySelector(".weather-box img"); // L'élément <img> pour l'icône météo

        switch (weatherMain) {
          case "Clear":
            image.src = "images/clear.png"; // Temps dégagé
            break;

          case "Rain":
            image.src = "images/rain.png"; // Pluie
            break;

          case "Snow":
            image.src = "images/snow.png"; // Neige
            break;

          case "Clouds":
            image.src = "images/cloud.png"; // Nuages
            break;

          case "Haze":
            image.src = "images/mist.png"; // Brume
            break;

          default:
            image.src = ""; // Si le temps n'est pas reconnu, on ne montre pas d'icône
        }
      }

      // Fonction pour mettre à jour les détail de la méteo
      function updateWeatherDetails(json) {
        const temperature = document.querySelector(".weather-box .temperature"); // L'élément contenant la température
        const description = document.querySelector(".weather-box .description"); // L'élément contenant la description météo
        const humidity = document.querySelector(
          ".weather-details .humidity span"
        ); // L'élément contenant l'humidité
        const wind = document.querySelector(".weather-details .wind span"); // L'élément contenant la vitesse du vent

        // Mise à jour de l'icône météo en fonction du temps actuel
        updateWeatherIcon(json.weather[0].main);

        // Mise à jour des informations de température, description, humidité et vitesse du vent
        temperature.textContent = `${parseInt(json.main.temp - 273.15)}°C`; // Conversion de la température de Kelvin en Celsius
        description.textContent = `${json.weather[0].description}`; // Affichage de la description météo
        humidity.textContent = `${json.main.humidity}%`; // Affichage de l'humidité
        wind.textContent = `${parseInt(json.wind.speed)}Km/h`; // Affichage de la vitesse du vent
      }
      // Appel de fonction pour mettre à jour l'image et les donnée
      updateWeatherDetails(json);

      // Affichage des boîtes de données météo avec une animation de fondu (fadeIn)
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "600px"; // Ajustement de la hauteur du conteneur principal pour afficher les données météo
    });
});
