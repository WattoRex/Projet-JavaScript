// Récupérer les références des éléments du DOM
const shapePreview = document.getElementById("shapePreview"); // Référence à l'élément de prévisualisation de la forme
const styles = document.getElementById("styles"); // Référence à l'élément pour afficher le code CSS généré
const topLeftInput = document.getElementById("top-left"); // Référence à l'élément input pour le réglage du coin supérieur gauche
const topRightInput = document.getElementById("top-right"); // Référence à l'élément input pour le réglage du coin supérieur droit
const bottomLeftInput = document.getElementById("bottom-left"); // Référence à l'élément input pour le réglage du coin inférieur gauche
const bottomRightInput = document.getElementById("bottom-right"); // Référence à l'élément input pour le réglage du coin inférieur droit
const topLeftValueSpan = document.getElementById("topLeftValue"); // Référence à l'élément span pour afficher la valeur du coin supérieur gauche
const topRightValueSpan = document.getElementById("topRightValue"); // Référence à l'élément span pour afficher la valeur du coin supérieur droit
const bottomLeftValueSpan = document.getElementById("bottomLeftValue"); // Référence à l'élément span pour afficher la valeur du coin inférieur gauche
const bottomRightValueSpan = document.getElementById("bottomRightValue"); // Référence à l'élément span pour afficher la valeur du coin inférieur droit

// Récupérer tous les éléments input de classe "reglage" dans un tableau
const inputElements = document.querySelectorAll(".reglage input");

// Ajouter un écouteur d'événement pour chaque élément input du tableau
inputElements.forEach((inputElement) => {
  inputElement.addEventListener("input", generateStyles);
});

// Fonction pour générer les styles CSS en fonction des valeurs saisies
function generateStyles() {
  const topLeftValue = topLeftInput.value; // Récupérer la valeur du coin supérieur gauche saisie par l'utilisateur
  const topRightValue = topRightInput.value; // Récupérer la valeur du coin supérieur droit saisie par l'utilisateur
  const bottomLeftValue = bottomLeftInput.value; // Récupérer la valeur du coin inférieur gauche saisie par l'utilisateur
  const bottomRightValue = bottomRightInput.value; // Récupérer la valeur du coin inférieur droit saisie par l'utilisateur

  // Appliquer les valeurs saisies pour le border-radius à l'élément de prévisualisation de la forme
  shapePreview.style.borderRadius = `${topLeftValue}% ${100 - topRightValue}% ${
    100 - bottomRightValue
  }% ${bottomLeftValue}%`;

  // Afficher le code CSS généré avec les valeurs saisies
  styles.textContent = `border-radius: ${topLeftValue}% ${
    100 - topRightValue
  }% ${100 - bottomRightValue}% ${bottomLeftValue}%;`;

  // Mettre à jour les valeurs affichées à côté des curseurs avec les valeurs saisies
  topLeftValueSpan.textContent = topLeftValue;
  topRightValueSpan.textContent = topRightValue;
  bottomLeftValueSpan.textContent = bottomLeftValue;
  bottomRightValueSpan.textContent = bottomRightValue;
}

// Fonction pour copier les styles générés dans le presse-papiers
function copyStyles() {
  styles.select(); // Sélectionner le texte à l'intérieur de l'élément styles
  document.execCommand("copy"); // Copier le texte sélectionné dans le presse-papiers
  copyButton.innerText = "Copiés !"; // Indiquer à l'utilisateur que les styles ont été copiés
  setTimeout(() => {
    copyButton.innerText = "Copie le Style"; // Revenir à l'état initial du bouton après 500 millisecondes
  }, 500);
}
// Fonction pour réinitialiser les styles par défaut
function resetStyles() {
  topLeftInput.value = 0; // Remettre la valeur du coin supérieur gauche à sa valeur par défaut (0%)
  topRightInput.value = 100; // Remettre la valeur du coin supérieur droit à sa valeur par défaut (100%)
  bottomLeftInput.value = 0; // Remettre la valeur du coin inférieur gauche à sa valeur par défaut (0%)
  bottomRightInput.value = 100; // Remettre la valeur du coin inférieur droit à sa valeur par défaut (100%)
  generateStyles(); // Générer les styles avec les valeurs par défaut
}

// Appeler la fonction generateStyles() une première fois pour afficher les styles par défaut lors du chargement de la page
generateStyles();
