// Récupérer les références des éléments DOM nécessaires
const preview = document.getElementById("preview"); // L'élément où l'ombre de texte sera affichée en prévisualisation
const styles = document.getElementById("styles"); // L'élément pour afficher les styles CSS générés
const textShadowX = document.getElementById("text-shadow-x"); // Valeur de l'ombre horizontale pour le texte
const textShadowY = document.getElementById("text-shadow-y"); // Valeur de l'ombre verticale pour le texte
const textShadowBlur = document.getElementById("text-shadow-blur"); // Rayon du flou de l'ombre pour le texte
const textShadowOpacity = document.getElementById("text-shadow-opacity"); // Opacité de l'ombre pour le texte
const textShadowColor = document.getElementById("text-shadow-color"); // Couleur de l'ombre pour le texte (en code hexadécimal)
const copyButton = document.getElementById("copy-styles"); // Le bouton pour copier les styles générés

// Ajouter un écouteur d'événements à chaque curseur (slider) pour appeler la fonction generateTextShadow() lorsque la valeur change
const ranges = document.querySelectorAll(".reglage input");
ranges.forEach((slider) => {
  slider.addEventListener("input", generateTextShadow);
});

// Ajouter un écouteur d'événement au bouton "Reset" pour réinitialiser les styles par défaut
const resetButton = document.getElementById("reset-styles");
resetButton.addEventListener("click", resetStyles);

// Fonction pour générer le code CSS du text-shadow
function generateTextShadow() {
  // Récupérer les valeurs pour le text-shadow
  const textShadowXValue = textShadowX.value;
  const textShadowYValue = textShadowY.value;
  const textShadowBlurValue = textShadowBlur.value;
  const textShadowOpacityValue = textShadowOpacity.value;
  const textShadowColorValue = textShadowColor.value;

  // Créer la propriété text-shadow en fonction des valeurs récupérées
  const textShadow = `${textShadowXValue}px ${textShadowYValue}px ${textShadowBlurValue}px ${hexToRgba(
    textShadowColorValue,
    textShadowOpacityValue
  )}`;

  // Appliquer la propriété text-shadow à l'élément de prévisualisation
  preview.style.textShadow = textShadow;

  // Afficher le code CSS généré pour le text-shadow dans l'élément styles
  styles.textContent = `text-shadow: ${textShadow};`;
}

// Fonction pour convertir un code couleur hexadécimal en notation rgba avec opacité
function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16); // Extraire la valeur du canal rouge du code hexadécimal
  const g = parseInt(hex.slice(3, 5), 16); // Extraire la valeur du canal vert du code hexadécimal
  const b = parseInt(hex.slice(5, 7), 16); // Extraire la valeur du canal bleu du code hexadécimal

  // Retourner la notation rgba en utilisant les valeurs des canaux de couleur et l'opacité
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Fonction pour copier les styles générés dans le presse-papiers
function copyStyles() {
  styles.select(); // Sélectionner le texte à l'intérieur de l'élément styles
  document.execCommand("copy"); // Copier le texte sélectionné dans le presse-papiers
  copyButton.innerText = "Copiés !"; // Indiquer à l'utilisateur que les styles ont été copiés
  setTimeout(() => {
    copyButton.innerText = "Copie le Styles"; // Revenir à l'état initial du bouton après 500 millisecondes
  }, 500);
}

// Fonction pour réinitialiser les styles par défaut
function resetStyles() {
  // Rétablir les valeurs par défaut des éléments d'entrée (input) pour le Text Shadow
  document.getElementById("text-shadow-x").value = 0;
  document.getElementById("text-shadow-y").value = 0;
  document.getElementById("text-shadow-blur").value = 0;
  document.getElementById("text-shadow-color").value = "#000000";

  // Générer les styles avec les valeurs par défaut pour le Text Shadow
  generateTextShadow();

  // Réinitialiser le texte du bouton "Copied!" (au cas où il était affiché)
  copyButton.innerText = "Copie le Styles";
}

generateTextShadow(); // Appeler la fonction generateTextShadow() une première fois pour afficher les styles par défaut lors du chargement de la page
