// Sélection des l'élément (entrée de la tâche / filtre / effacer / boite tâche)
const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");
deadlineInput = document.getElementById("deadline-input");

// Initialiser les variables d'édition de tâche (ID de tâche en cours d'édition et état de l'édition)
let editID,
  // Initialiser la variable pour suivre si une tâche est en cours d'édition (true ou false)
  isEditTask = false,
  // Récupérer la liste des tâches depuis le stockage local et la convertir en objet
  // Cela récupère les tâches sauvegardées dans le navigateur précédemment
  todos = JSON.parse(localStorage.getItem("todo-list"));

// ---------------------------- Fonction Tâches ----------------------------
// Pour chaque bouton de filtre dans "filters"
filters.forEach((btn) => {
  // Ajouter un gestionnaire d'événement de clic à chaque bouton
  btn.addEventListener("click", () => {
    // Retirer la classe "active" de l'élément "span" actif (désactivation du filtre précédent)
    document.querySelector("span.active").classList.remove("active");

    // Ajouter la classe "active" au bouton cliqué pour le mettre en surbrillance (activation du filtre actuel)
    btn.classList.add("active");

    // Appeler la fonction "showTodo" pour afficher les tâches en fonction du filtre sélectionné
    showTodo(btn.id);
  });
});

// Définition de la fonction "showTodo" avec le paramètre "filter"
function showTodo(filter) {
  // Initialisation d'une chaîne vide pour contenir les balises HTML des tâches
  let liTag = "";

  // Vérifier si la liste des tâches existe
  if (todos) {
    // Parcourir chaque tâche dans la liste des tâches
    todos.forEach((todo, id) => {
      // Déterminer si la tâche est complétée pour afficher la case cochée
      let completed = todo.status == "completed" ? "checked" : "";

      // Vérifier si la tâche correspond au filtre sélectionné ou si le filtre est "all"
      if (filter == todo.status || filter == "all") {
        // Construire la balise HTML pour afficher la tâche avec des boutons d'édition et de suppression
        liTag += ` <li class="task" draggable="true" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="drop(event)">
        <label for="${id}">
        <input class="test" onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
        <p class="${completed}">${todo.name}</p>
        <p class="deadline">Date Limite: ${todo.deadline}</p>
        </label>
        <div class="task-controls">
  <div class="reorder-arrows">
    <!-- Flèche vers le haut pour réorganisation vers le haut -->
    <span class="reorder-arrow" data-index="${id}" onclick="reorderTask(this, -1)">&#9650;</span>
    <!-- Flèche vers le bas pour réorganisation vers le bas -->
    <span class="reorder-arrow" data-index="${id}" onclick="reorderTask(this, 1)">&#9660;</span>
  </div>
  <div class="settings">
    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
    <ul class="task-menu">
      <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Modifier</li>
      <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Supprimer</li>
    </ul>
  </div>
</div>
                </li>`;
      }
    });
  }

  // Insérer les balises HTML générées dans la boîte de tâches ou afficher un message s'il n'y a pas de tâches
  taskBox.innerHTML = liTag || `<span>Vous n'avez aucune tâche ici</span>`;

  // Vérifier s'il y a des tâches pour activer ou désactiver le bouton "Effacer tout"
  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length
    ? clearAll.classList.remove("active")
    : clearAll.classList.add("active");

  // Vérifier si la boîte de tâches dépasse une certaine hauteur et ajouter la classe "overflow" si nécessaire
  taskBox.offsetHeight >= 300
    ? taskBox.classList.add("overflow")
    : taskBox.classList.remove("overflow");
}
// Appeler la fonction "showTodo" pour afficher initialement toutes les tâches
showTodo("all");

// Définition de la fonction "showMenu" avec le paramètre "selectedTask"
function showMenu(selectedTask) {
  // Sélectionner l'élément "div" qui contient les options de menu de la tâche sélectionnée
  let menuDiv = selectedTask.parentElement.lastElementChild;

  // Ajouter la classe "show" pour afficher le menu contextuel
  menuDiv.classList.add("show");

  // Ajouter un gestionnaire d'événement de clic au document entier
  document.addEventListener("click", (e) => {
    // Vérifier si la cible du clic n'est pas une icône "I" ou si elle n'est pas égale à l'élément "selectedTask"
    if (e.target.tagName != "I" || e.target != selectedTask) {
      // Si la cible du clic n'est pas le bouton de menu ou l'icône, masquer le menu contextuel
      menuDiv.classList.remove("show");
    }
  });
}

// Définition de la fonction "updateStatus" avec le paramètre "selectedTask"
function updateStatus(selectedTask) {
  // Sélectionner l'élément "p" qui contient le nom de la tâche associée à la case à cocher
  let taskName = selectedTask.parentElement.lastElementChild;

  // Vérifier si la case à cocher est cochée
  if (selectedTask.checked) {
    // Ajouter la classe "checked" à l'élément "p" pour indiquer que la tâche est terminée
    taskName.classList.add("checked");

    // Mettre à jour le statut de la tâche correspondante dans la liste "todos" en tant que "completed"
    todos[selectedTask.id].status = "completed";
  } else {
    // Sinon, si la case à cocher est décochée

    // Supprimer la classe "checked" de l'élément "p" pour indiquer que la tâche est en attente
    taskName.classList.remove("checked");
    // Mettre à jour le statut de la tâche correspondante dans la liste "todos" en tant que "pending"
    todos[selectedTask.id].status = "pending";
  }

  // Mettre à jour la liste "todos" dans le stockage local avec les modifications
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Définition de la fonction "editTask" avec les paramètres "taskId" et "textName"
function editTask(taskId, textName, deadline) {
  // Affecter la valeur de "taskId" à la variable "editId"
  editID = taskId;

  // Activer le mode d'édition de tâche en définissant "isEditTask" sur true
  isEditTask = true;

  // Définir la valeur de l'entrée de tâche (input) sur "textName"
  taskInput.value = textName;
  // Définir la valeur de la date limite
  deadlineInput.value = deadline;

  // Placer le focus sur l'entrée de tâche pour que l'utilisateur puisse commencer à éditer
  taskInput.focus();
  // Ajouter la classe "active" à l'entrée de tâche pour la mettre en surbrillance (en mode d'édition)
  taskInput.classList.add("active");
}

// Définition de la fonction "deleteTask" avec les paramètres "deleteId" et "filter"
function deleteTask(deleteId, filter) {
  // Désactiver le mode d'édition de tâche
  isEditTask = false;

  // Supprimer la tâche avec l'ID "deleteId" de la liste "todos"
  todos.splice(deleteId, 1);

  // Mettre à jour la liste "todos" dans le stockage local avec les modifications
  localStorage.setItem("todo-list", JSON.stringify(todos));

  // Appeler la fonction "showTodo" pour afficher les tâches mises à jour en fonction du filtre
  showTodo(filter);
}

// ---------------------------- Event ----------------------------
// Ajouter un gestionnaire d'événement de clic au bouton "Effacer tout"
clearAll.addEventListener("click", () => {
  // Désactiver le mode d'édition de tâche
  isEditTask = false;

  // Supprimer toutes les tâches de la liste "todos"
  todos.splice(0, todos.length);

  // Mettre à jour la liste "todos" dans le stockage local avec les modifications
  localStorage.setItem("todo-list", JSON.stringify(todos));

  // Appeler la fonction "showTodo" pour afficher les tâches mises à jour
  showTodo();
});

// Ajouter un gestionnaire d'événement de saisie à l'entrée de tâche
taskInput.addEventListener("keyup", (e) => {
  // Récupérer le texte de la tâche saisi par l'utilisateur (sans espaces inutiles)
  let userTask = taskInput.value.trim();

  // Date limite
  let selectedDeadline = deadlineInput.value;

  // Vérifier si la touche pressée est "Entrée" et si un texte de tâche est saisi
  if (e.key == "Enter" && userTask) {
    // Vérifier si le mode d'édition n'est pas activé
    if (!isEditTask) {
      // Créer un tableau "todos" s'il n'existe pas déjà, puis ajouter une nouvelle tâche
      todos = !todos ? [] : todos;
      let taskInfo = {
        name: userTask,
        status: "pending",
        deadline: selectedDeadline,
      };
      todos.push(taskInfo);
    } else {
      // Si le mode d'édition est activé, mettre à jour le nom de la tâche éditée
      isEditTask = false;
      todos[editID].name = userTask;
      todos[editID].deadline = selectedDeadline;
    }

    // Réinitialiser le champ d'entrée de tâche
    taskInput.value = "";
    deadlineInput.value = "";

    // Mettre à jour la liste "todos" dans le stockage local avec les modifications
    localStorage.setItem("todo-list", JSON.stringify(todos));

    // Appeler la fonction "showTodo" pour afficher les tâches mises à jour en fonction du filtre actif
    showTodo(document.querySelector("span.active").id);
  }
});

// ---------------------------- Glisser/Deposer ----------------------------
// Déclaration des variables globales
let draggedTask = null;

// Événement lors du début du glissement d'une tâche
function dragStart(event) {
  draggedTask = event.target;
}

// Événement lorsqu'une tâche est survolée pendant le glisser-déposer
function dragOver(event) {
  event.preventDefault();
}

// Événement lorsque la tâche est lâchée (déposée) après un glisser-déposer
function drop(event) {
  event.preventDefault();
  const dropTarget = event.target.closest(".task");

  if (draggedTask && dropTarget) {
    const fromIndex = Array.from(taskBox.children).indexOf(draggedTask);
    const toIndex = Array.from(taskBox.children).indexOf(dropTarget);

    if (fromIndex !== -1 && toIndex !== -1) {
      // Réorganiser la liste "todos" en fonction de la réorganisation des tâches
      const [task] = todos.splice(fromIndex, 1);
      todos.splice(toIndex, 0, task);

      // Mettre à jour la liste "todos" dans le stockage local avec les modifications
      localStorage.setItem("todo-list", JSON.stringify(todos));

      // Réafficher les tâches pour refléter les changements
      showTodo(document.querySelector("span.active").id);
    }
  }
}

// ---------------------------- Reorgansation fléche ----------------------------
// Fonction pour réorganiser une tâche en fonction d'une flèche de réorganisation et d'une direction donnée
function reorderTask(arrow, direction) {
  const currentIndex = parseInt(arrow.getAttribute("data-index")); // Obtient l'index actuel de la tâche à réorganiser depuis l'attribut "data-index"
  const newIndex = currentIndex + direction; // Calcule le nouvel index après réorganisation en ajoutant la direction

  // Vérifie si le nouvel index est dans les limites valides du tableau de tâches
  if (newIndex >= 0 && newIndex < todos.length) {
    const [task] = todos.splice(currentIndex, 1); // Supprime la tâche du tableau à son index actuel et la stocke dans un tableau destructuré
    todos.splice(newIndex, 0, task); // Insère la tâche dans le tableau à la nouvelle position déterminée par le nouvel index

    localStorage.setItem("todo-list", JSON.stringify(todos)); // Met à jour le stockage local avec le tableau de tâches modifié

    showTodo(document.querySelector("span.active").id); // Appelle la fonction pour afficher les tâches de l'onglet actuellement actif
  }
}

// ---------------------------- Import/Export ----------------------------
// Fonction pour exporter les tâches au format CSV
function exportTasksToCSV() {
  // Demander à l'utilisateur de saisir le nom du fichier souhaité
  const fileName = prompt("Entrez le nom du fichier CSV (sans l'extension) :");
  if (!fileName) {
    return; // Annuler l'exportation si aucun nom de fichier n'est saisi
  }

  let csvContent = "data:text/csv;charset=utf-8,";

  todos.forEach((todo) => {
    csvContent += `"${todo.name}","${todo.status}","${todo.deadline}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${fileName}.csv`); // Utiliser le nom de fichier saisi par l'utilisateur
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
