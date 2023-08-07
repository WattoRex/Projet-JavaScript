// Récupérer les références des éléments du DOM
const shape = document.getElementById("shape"); // Référence à l'élément de forme sur lequel l'animation sera appliquée
const animationNameInput = document.getElementById("animation-name"); // Référence à l'élément input pour le nom de l'animation
const animationDurationInput = document.getElementById("animation-duration"); // Référence à l'élément input pour la durée de l'animation
const animationTimingSelect = document.getElementById("animation-timing"); // Référence à l'élément select pour la fonction de temporisation de l'animation
const animationPresetSelect = document.getElementById("animation-preset"); // Référence à l'élément select pour le choix de l'animation prédéfinie
const durationValueSpan = document.getElementById("durationValue"); // Référence à l'élément span pour afficher la valeur de la durée de l'animation
const generatedCSSStyle = document.getElementById("generated-css"); // Référence à l'élément pour afficher le code CSS généré
const animationCSSCode = document.getElementById("animation-css-code"); // Référence à l'élément textarea pour afficher le code CSS complet de l'animation
const copyCSSCodeButton = document.getElementById("copy-css-code"); // Référence au bouton pour copier le code CSS généré

// Ajouter un écouteur d'événement pour mettre à jour la valeur de la durée de l'animation lors de tout changement de l'input
animationDurationInput.addEventListener("input", updateDurationValue);

// Fonction pour mettre à jour la valeur de la durée de l'animation et appliquer les styles en conséquence
function updateDurationValue() {
  durationValueSpan.textContent = animationDurationInput.value; // Mettre à jour le texte affiché pour la durée de l'animation
  shape.style.animationDuration = animationDurationInput.value + "s"; // Appliquer la durée de l'animation en secondes à l'élément de forme
}

// Fonction pour générer l'animation en fonction des paramètres saisis
function generateAnimation() {
  const animationName = animationNameInput.value; // Récupérer le nom de l'animation saisi par l'utilisateur
  const duration = animationDurationInput.value; // Récupérer la durée de l'animation saisi par l'utilisateur
  const timingFunction = animationTimingSelect.value; // Récupérer la fonction de temporisation de l'animation choisie par l'utilisateur
  const preset = animationPresetSelect.value; // Récupérer l'animation prédéfinie choisie par l'utilisateur

  let keyframes; // Variable pour stocker les règles d'animation (keyframes) générées en fonction du choix de l'animation prédéfinie

  // Sélectionner les règles d'animation en fonction du choix de l'animation prédéfinie
  switch (preset) {
    case "bounce":
      keyframes = `@keyframes ${animationName} {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-30px); }
            }`;
      break;
    case "fade":
      keyframes = `@keyframes ${animationName} {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }`;
      break;
    case "rotate":
      keyframes = `@keyframes ${animationName} {
                0% { transform: rotate(0); }
                100% { transform: rotate(360deg); }
            }`;
      break;
    case "scale":
      keyframes = `@keyframes ${animationName} {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.5); }
            }`;
      break;
    default:
      // Si aucune animation prédéfinie n'est choisie, utiliser une animation par défaut
      keyframes = `@keyframes ${animationName} {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.5); opacity: 0.5; }
            }`;
  }

  // Générer la règle d'animation complète en combinant le nom, la durée et la fonction de temporisation
  const animationCSS = `${animationName} ${duration}s ${timingFunction} infinite`;

  // Mettre à jour l'affichage avec les règles d'animation générées et appliquer l'animation à l'élément de forme
  generatedCSSStyle.textContent = keyframes;
  shape.style.animation = animationCSS;

  // Mettre à jour le code CSS complet affiché dans le textarea
  animationCSSCode.value = `${animationCSS}\n${keyframes}`;
}

// Fonction pour copier le code CSS généré dans le textarea
function copyCSSCode() {
  animationCSSCode.select(); // Sélectionner tout le texte dans le textarea
  document.execCommand("copy"); // Copier le texte sélectionné dans le presse-papiers du navigateur
  copyCSSCodeButton.innerText = "Code CSS copié !"; // Mettre à jour le texte du bouton pour informer l'utilisateur que le code a été copié avec succès

  // Remettre le texte du bouton à son état initial après un délai de 2 secondes
  setTimeout(() => {
    copyCSSCodeButton.innerText = "Copier le code CSS";
  }, 2000);
}

// Fonction pour réinitialiser les styles par défaut
function resetStyles() {
  // Rétablir les valeurs par défaut des éléments d'entrée (input)
  animationNameInput.value = "customAnimation"; // Remettre le nom de l'animation à sa valeur par défaut
  animationDurationInput.value = 2; // Remettre la durée de l'animation à sa valeur par défaut (2 secondes)
  durationValueSpan.textContent = "2"; // Mettre à jour l'affichage de la durée de l'animation avec la valeur par défaut
  animationTimingSelect.value = "ease"; // Remettre la fonction de temporisation à sa valeur par défaut (ease)
  animationPresetSelect.value = "bounce"; // Remettre le choix de l'animation prédéfinie à sa valeur par défaut (bounce)

  // Générer les styles avec les valeurs par défaut
  generateStyles();

  // Réinitialiser le texte du bouton "Copied!" (au cas où il était affiché)
  copyButton.innerText = "Copie le Style";
}

// Appeler la fonction generateStyles() une première fois pour afficher les styles par défaut lors du chargement de la page
generateStyles();
