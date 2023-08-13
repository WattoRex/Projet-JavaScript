const inputs = document.querySelector(".word"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess span"),
  mistakes = document.querySelector(".wrong span"),
  resetBtn = document.querySelector(".reset"),
  hintBtn = document.querySelector(".showhint"),
  hintElement = document.querySelector(".hint"),
  typeInput = document.querySelector(".type-input");

// Initialisation des variables du jeu
let word,
  incorrectLetters = [],
  correctLetters = [],
  maxGuesses;

// Sélectionner un mot aléatoire dans la liste des mots et configurer le jeu
function startNewGame() {
  alert("Nouvelle partie commencée ! Devinez le nouveau mot :)");
  // Masquer l'élément d'indice
  hintElement.style.display = "none";
  hintElement.style.opacity = "0";

  // Choisir un mot aléatoire de la liste et configurer le jeu
  const ranWord = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranWord.word;
  // Si le nombre de caractères du mot >= 5 alors max d'essais = 8 sinon max d'essais = 6
  maxGuesses = word.length >= 5 ? 8 : 6;
  incorrectLetters = [];
  correctLetters = [];
  hintTag.textContent = ranWord.hint;
  guessLeft.textContent = maxGuesses;
  mistakes.textContent = incorrectLetters;

  // Créer un champ de saisie pour chaque lettre du mot
  inputs.innerHTML = "";
  for (let i = 0; i < word.length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.disabled = true;
    inputs.appendChild(input);
  }
}

// Gérer la saisie de l'utilisateur et mettre à jour les statistiques du jeu
function handleInput(e) {
  // Ignorer les saisies non alphabétiques et les lettres déjà devinées
  const key = e.target.value.toLowerCase();
  if (
    key.match(/^[a-z]+$/i) &&
    !incorrectLetters.includes(`${key}`) &&
    !correctLetters.includes(`${key}`)
  ) {
    // Vérifier si la lettre est dans le mot
    if (word.includes(key)) {
      // Mettre à jour les lettres correctes
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          inputs.querySelectorAll("input")[i].value += key;
        }
      }
      correctLetters += key;
    } else {
      // Mettre à jour les lettres incorrectes
      maxGuesses--;
      incorrectLetters.push(`${key}`);
      mistakes.textContent = incorrectLetters.join(", ");
    }
  }

  // Mettre à jour les essais restants et vérifier les conditions de victoire ou de défaite
  guessLeft.textContent = maxGuesses;
  if (correctLetters.length === word.length) {
    alert(`Félicitations ! Vous avez trouvé le mot ${word.toUpperCase()}`);
    startNewGame();
  } else if (maxGuesses < 1) {
    alert("Partie terminée ! Vous n'avez plus d'essais restants !");
    for (let i = 0; i < word.length; i++) {
      // Remplir les champs de saisie avec les bonnes lettres
      inputs.querySelectorAll("input")[i].value = word[i];
    }
  }

  // Effacer le champ de saisie
  typeInput.value = "";
}

// Afficher l'élément d'indice
function showHintElement() {
  hintElement.style.display = "block";
  hintElement.style.opacity = "1";
}

// Configurer les écouteurs d'événements
resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

startNewGame();
