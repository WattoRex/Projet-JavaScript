// Récupérer les références des éléments HTML qui seront utilisés pour la prévisualisation et les réglages du style.
const preview = document.getElementById("preview"); // Référence à l'élément de prévisualisation du texte
const styles = document.getElementById("styles"); // Référence à l'élément pour afficher le code CSS généré
const textAlignSelect = document.getElementById("text-align"); // Référence à l'élément select pour le réglage de l'alignement du texte
const lineHeightSlider = document.getElementById("line-height"); // Référence à l'élément input de type range pour le réglage de l'interligne
const wordSpacingSlider = document.getElementById("word-spacing"); // Référence à l'élément input de type range pour le réglage de l'espacement des mots
const fontSizeSlider = document.getElementById("font-size"); // Référence à l'élément input de type range pour le réglage de la taille de police
const boldCheckbox = document.getElementById("bold-text"); // Référence à l'élément input de type checkbox pour le réglage de la mise en gras du texte
const italicCheckbox = document.getElementById("italic-text"); // Référence à l'élément input de type checkbox pour le réglage de l'italique du texte
const lineHeightValue = document.getElementById("line-height-value"); // Référence à l'élément span pour afficher la valeur de l'interligne
const wordSpacingValue = document.getElementById("word-spacing-value"); // Référence à l'élément span pour afficher la valeur de l'espacement des mots
const fontSizeValue = document.getElementById("font-size-value"); // Référence à l'élément span pour afficher la valeur de la taille de police
const boldValue = document.getElementById("bold-text-value"); // Référence à l'élément span pour afficher la valeur de la mise en gras du texte
const italicValue = document.getElementById("italic-text-value"); // Référence à l'élément span pour afficher la valeur de l'italique du texte

const copyButton = document.getElementById("copy-styles"); // Le bouton pour copier les styles générés

// Sélection de tous les éléments d'entrée (input) et de sélection (select) qui seront utilisés pour les réglages.
const inputElements = document.querySelectorAll(
  ".reglage input, .reglage select"
);

// Ajout d'un écouteur d'événement "input" à chaque élément d'entrée, qui appellera la fonction generateStyles lorsqu'une modification est effectuée.
inputElements.forEach((inputElement) => {
  inputElement.addEventListener("input", generateStyles);
});

// Fonction pour générer le style CSS en fonction des réglages choisis par l'utilisateur.
function generateStyles() {
// Récupérer les valeurs des contrôles de réglage sous forme de variables.
const textAlignValue = textAlignSelect.value; // Récupérer la valeur de l'alignement du texte (gauche, droite, centré, justifié)
const lineHeightValueNum = parseFloat(lineHeightSlider.value).toFixed(1); // Récupérer la valeur de l'interligne en tant que nombre décimal avec une seule décimale
const wordSpacingValueNum = parseFloat(wordSpacingSlider.value).toFixed(1); // Récupérer la valeur de l'espacement des mots en tant que nombre décimal avec une seule décimale
const fontSizeValueNum = fontSizeSlider.value; // Récupérer la valeur de la taille de police (en pixels)
const isBold = boldCheckbox.checked; // Récupérer l'état de la case à cocher de mise en gras (true si cochée, sinon false)
const isItalic = italicCheckbox.checked; // Récupérer l'état de la case à cocher d'italique (true si cochée, sinon false)


// Application des styles CSS à l'élément de prévisualisation en utilisant les valeurs récupérées.
preview.style.textAlign = textAlignValue; // Appliquer l'alignement du texte récupéré à l'élément de prévisualisation
preview.style.lineHeight = lineHeightValueNum; // Appliquer l'interligne récupéré à l'élément de prévisualisation
preview.style.wordSpacing = `${wordSpacingValueNum}em`; // Appliquer l'espacement des mots récupéré (en tant que taille d'espacement) à l'élément de prévisualisation
preview.style.fontSize = `${fontSizeValueNum}px`; // Appliquer la taille de police récupérée (en tant que taille en pixels) à l'élément de prévisualisation
preview.style.fontWeight = isBold ? "bold" : "normal"; // Appliquer la mise en gras ou normale en fonction de la valeur booléenne récupérée à l'élément de prévisualisation
preview.style.fontStyle = isItalic ? "italic" : "normal"; // Appliquer l'italique ou le style normal en fonction de la valeur booléenne récupérée à l'élément de prévisualisation

// Mise à jour des valeurs affichées à côté des contrôles de réglage pour montrer les valeurs actuelles des styles.
lineHeightValue.textContent = lineHeightValueNum; // Afficher la valeur de l'interligne actuel à côté du curseur correspondant
wordSpacingValue.textContent = `${wordSpacingValueNum}em`; // Afficher la valeur de l'espacement des mots actuel (avec le suffixe "em") à côté du curseur correspondant
fontSizeValue.textContent = `${fontSizeValueNum}px`; // Afficher la valeur de la taille de police actuelle (avec le suffixe "px") à côté du curseur correspondant
boldValue.textContent = isBold ? "Gras" : "Normal"; // Afficher "Gras" ou "Normal" à côté de la case à cocher pour indiquer l'état de mise en gras du texte
italicValue.textContent = isItalic ? "Italique" : "Normal"; // Afficher "Italique" ou "Normal" à côté de la case à cocher pour indiquer l'état d'italique du texte

// Mise à jour du contenu du bloc de code "styles" pour montrer le style CSS complet utilisé pour la prévisualisation.
styles.textContent = `text-align: ${textAlignValue};
    line-height: ${lineHeightValueNum};
    word-spacing: ${wordSpacingValueNum}em;
    font-size: ${fontSizeValueNum}px;
    font-weight: ${isBold ? "bold" : "normal"};
    font-style: ${isItalic ? "italic" : "normal"};`;
}

// Fonction pour réinitialiser tous les réglages à leurs valeurs par défaut.
function resetStyles() {
  textAlignSelect.value = "left"; // Remettre l'alignement du texte à sa valeur par défaut (aligné à gauche)
  lineHeightSlider.value = 1.5; // Remettre l'interligne à sa valeur par défaut (1.5)
  wordSpacingSlider.value = 0; // Remettre l'espacement des mots à sa valeur par défaut (0)
  fontSizeSlider.value = 16; // Remettre la taille de police à sa valeur par défaut (16 pixels)
  boldCheckbox.checked = false; // Remettre la case à cocher de mise en gras à son état par défaut (non cochée)
  italicCheckbox.checked = false; // Remettre la case à cocher d'italique à son état par défaut (non cochée)
  generateStyles(); // Appel à la fonction generateStyles() pour mettre à jour la prévisualisation avec les styles par défaut.
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

// Copier le style lorsque le bouton de copie est cliqué.
copyButton.innerText = "Copie le Style";

generateStyles(); // Appeler la fonction generateStyles() une première fois pour afficher les styles par défaut lors du chargement de la page.
