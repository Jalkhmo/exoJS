function setupSearch(inputElement, resultsList) {
    inputElement.addEventListener("input", async () => {
        const query = inputElement.value.trim();  //recup la valeur saisie

        if (query.length < 3) {
            resultsList.innerHTML = ""; // Efface les sugg si recherche trop courte
            return;
        }

        try {  //affectation API
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=5`);
            const data = await response.json();
            displayResults(data.features, resultsList, inputElement); //affichage results
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses :", error);
        }
    });
}

// Fonction pour afficher les résultats dans la liste
function displayResults(addresses, resultsList, searchInput) {
    resultsList.innerHTML = "";

    if (addresses.length === 0) {
        resultsList.innerHTML = "<li>Aucune adresse trouvée</li>";
        return;
    }

    addresses.forEach((place) => {
        const li = document.createElement("li");
        li.textContent = place.properties.label;
        li.addEventListener("click", () => {
            searchInput.value = place.properties.label;  //remplace la valeur ecrite par la valeur choisie
            resultsList.innerHTML = ""; // Vide les résultats après sélection
        });
        resultsList.appendChild(li);  //ajoute le result a (<ul>)
    });
}

// Sélectionne tous les conteneurs de recherche
const searchContainers = document.querySelectorAll('.search-container');

searchContainers.forEach(container => {
    const input = container.querySelector('input');
    const resultsList = container.querySelector('ul');
    setupSearch(input, resultsList);
});
