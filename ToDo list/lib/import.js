//Import
const importFileInput = document.getElementById("import-file");

// Gérer l'événement de changement du fichier sélectionné
importFileInput.addEventListener("change", (event) => {
  // Récupérer le fichier sélectionné à partir de l'événement
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    // Appeler la fonction pour traiter le fichier CSV sélectionné
    processCSVFile(selectedFile);
  }
});

function processCSVFile(file) {
  // Créer un objet FileReader pour lire le contenu du fichier
  const reader = new FileReader();

  // Définir l'action à effectuer une fois le fichier chargé
  reader.onload = (event) => {
    // Récupérer le contenu du fichier CSV à partir de l'événement
    const csvContent = event.target.result;
    // Diviser le contenu en lignes pour traiter chaque ligne séparément
    const lines = csvContent.split("\n");

    // Parcourir les lignes du fichier CSV
    for (const line of lines) {
      // Diviser chaque ligne en éléments en utilisant la virgule comme séparateur
      const [name, status, deadline] = line.split(",");
      if (name && status && deadline) {
        // Créer un objet "taskInfo" pour contenir les informations de la tâche
        const taskInfo = {
          name: name.trim(), // Nom de la tâche sans espaces inutiles
          status: status.trim(), // Statut de la tâche sans espaces inutiles
          deadline: deadline.trim(), // Date limite de la tâche sans espaces inutiles
        };
        // Ajouter les informations de la tâche à la liste "todos"
        todos.push(taskInfo);
      }
    }

    // Mettre à jour la liste "todos" dans le stockage local avec les nouvelles tâches
    localStorage.setItem("todo-list", JSON.stringify(todos));

    // Réafficher les tâches pour refléter les changements
    showTodo(document.querySelector("span.active").id);
  };

  // Lire le contenu du fichier en tant que texte
  reader.readAsText(file);
}
