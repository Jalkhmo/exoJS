class SearchAutocomplete {
    constructor(inputElement, resultsList) {
        this.inputElement = inputElement;
        this.resultsList = resultsList;
        this.init();
    }

    init() {
        this.inputElement.addEventListener("input", async () => {
            const query = this.inputElement.value.trim();

            if (query.length < 3) {
                this.clearResults();
                return;
            }

            try {
                const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=5`);
                const data = await response.json();
                this.displayResults(data.features);
            } catch (error) {
                console.error("Erreur lors de la récupération des adresses :", error);
            }
        });
    }


    clearResults() {
        this.resultsList.innerHTML = "";
    }

    displayResults(addresses) {
        this.clearResults();

        if (addresses.length === 0) {
            this.resultsList.innerHTML = "<li>Aucune adresse trouvée</li>";
            return;
        }

        addresses.forEach((place) => {
            const li = document.createElement("li");
            li.textContent = place.properties.label;
            li.addEventListener("click", () => {
                this.inputElement.value = place.properties.label;
                this.clearResults();
            });
            this.resultsList.appendChild(li);
        });
    }
}

const searchContainers = document.querySelectorAll('.search-container');

searchContainers.forEach(container => {
    const input = container.querySelector('input');
    const resultsList = container.querySelector('ul');
    new SearchAutocomplete(input, resultsList);
});

