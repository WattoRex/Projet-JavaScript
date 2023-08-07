// Récupérer les références des éléments du DOM qui seront utilisés pour la prévisualisation et les réglages du style de la grille.
const gridPreview = document.getElementById("gridPreview"); // Référence à l'élément de prévisualisation de la grille
const styles = document.getElementById("styles"); // Référence à l'élément pour afficher le code CSS généré
const gridColumnsInput = document.getElementById("grid-columns"); // Référence à l'élément input pour le réglage du nombre de colonnes de la grille
const gridRowsInput = document.getElementById("grid-rows"); // Référence à l'élément input pour le réglage du nombre de lignes de la grille
const gridGapInput = document.getElementById("grid-gap"); // Référence à l'élément input pour le réglage de l'espacement entre les éléments de la grille
const numGridItemsInput = document.getElementById("num-grid-items"); // Référence à l'élément input pour le réglage du nombre d'éléments dans la grille
const copyButton = document.getElementById("copy-styles"); // Le bouton pour copier les styles générés

// Sélection de tous les éléments d'entrée (input) qui seront utilisés pour les réglages de la grille.
const inputElements = document.querySelectorAll(".reglage input");

// Ajout d'un écouteur d'événement "input" à chaque élément d'entrée, qui appellera la fonction generateStyles lorsqu'une modification est effectuée.
inputElements.forEach((inputElement) => {
  inputElement.addEventListener("input", generateStyles);
});

// Ajout d'un écouteur d'événement "input" à l'élément d'entrée numGridItemsInput, qui appellera la fonction generateGridItems lorsqu'une modification est effectuée.
numGridItemsInput.addEventListener("input", generateGridItems);

// Fonction pour générer le style de la grille en fonction des réglages choisis par l'utilisateur.
function generateStyles() {
  // Récupération des valeurs des différents éléments de réglage de la grille.
  const gridColumnsValue = gridColumnsInput.value;
  const gridRowsValue = gridRowsInput.value;
  const gridGapValue = gridGapInput.value;

  // Application des styles CSS à l'élément de prévisualisation de la grille en utilisant les valeurs récupérées.
  gridPreview.style.gridTemplateColumns = `repeat(${gridColumnsValue}, 1fr)`;
  gridPreview.style.gridTemplateRows = `repeat(${gridRowsValue}, 1fr)`;
  gridPreview.style.gap = `${gridGapValue}px`;

  // Mise à jour du contenu du bloc de code "styles" pour montrer le style CSS complet utilisé pour la prévisualisation de la grille.
  styles.textContent = `grid-template-columns: repeat(${gridColumnsValue}, 1fr);
        grid-template-rows: repeat(${gridRowsValue}, 1fr);
        gap: ${gridGapValue}px;`;

  // Appel de la fonction generateGridItems pour mettre à jour la prévisualisation des Grid-Items en fonction des nouvelles dimensions de la grille.
  generateGridItems();
}

// Fonction pour générer les Grid-Items de la grille en fonction du nombre spécifié par l'utilisateur.
function generateGridItems() {
  const numGridItems = numGridItemsInput.value;

  // Supprimer tous les Grid-Items existants de la prévisualisation de la grille.
  while (gridPreview.firstChild) {
    gridPreview.removeChild(gridPreview.firstChild);
  }

  // Générer les nouveaux Grid-Items en fonction du nombre spécifié par l'utilisateur.
  for (let i = 1; i <= numGridItems; i++) {
    const gridItem = document.createElement("div");
    gridItem.textContent = i; // Chaque Grid-Item affichera un numéro pour l'illustration.
    gridItem.classList.add("grid-item"); // Ajout d'une classe CSS "grid-item" pour les styles personnalisés (non présent dans ce code).
    gridPreview.appendChild(gridItem);
  }
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

// Fonction pour réinitialiser tous les réglages de la grille à leurs valeurs par défaut.
function resetStyles() {
  gridColumnsInput.value = 3;
  gridRowsInput.value = 2;
  gridGapInput.value = 10;
  numGridItemsInput.value = 6;
  generateStyles(); // Appel à la fonction generateStyles() pour mettre à jour la prévisualisation avec les styles par défaut de la grille.
}

// Appeler la fonction generateStyles() une première fois pour afficher les styles par défaut de la grille lors du chargement de la page.
generateStyles();
