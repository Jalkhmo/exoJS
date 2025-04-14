import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="game">
    <h1>Palette Puzzle : teste ta vu !</h1>
    <p>Trie les couleurs du plus clair au plus foncé</p>
    <div id="palette" class="palette"></div>
    <button id="check">Vérifier</button>
    <button id="restart">Rejouer</button>
    <p id="result"></p>
  </div>
`;

const paletteContainer = document.getElementById('palette');
const resultText = document.getElementById('result');
const checkButton = document.getElementById('check');
const restartButton = document.getElementById('restart');

// Génère une palette de couleurs en HSL
function generatePalette(n) {
  const baseHue = Math.floor(Math.random() * 360);
  const colors = [];
  for (let i = 0; i < n; i++) {
    const lightness = 80 - (i * (20 / (n - 1))); 
    colors.push({
      hsl: `hsl(${baseHue}, 70%, ${lightness}%)`,
      lightness: lightness
    });
  }
  return colors;
}

// Mélange un tableau (Fisher-Yates simplifié)
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Affiche les blocs de couleur dans le DOM et gère le drag & drop
function renderPalette(palette) {
  paletteContainer.innerHTML = '';
  palette.forEach((color, index) => {
    const block = document.createElement('div');
    block.classList.add('color-block');
    block.style.backgroundColor = color.hsl;
    block.setAttribute('draggable', true);
    block.dataset.index = index;
    block.dataset.lightness = color.lightness;

    // Événement : début du drag
    block.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.dataset.index);
    });

    // Événement : on passe au-dessus d'un autre bloc
    block.addEventListener('dragover', (e) => {
      e.preventDefault();  // On doit autoriser le "drop"
      block.classList.add('drag-over');
    });

    // Événement : on quitte un bloc
    block.addEventListener('dragleave', () => {
      block.classList.remove('drag-over');
    });

    // Événement : on relâche un bloc sur un autre
    block.addEventListener('drop', (e) => {
      e.preventDefault();
      const fromIndex = e.dataTransfer.getData('text/plain');
      const toIndex = block.dataset.index;
      swapBlocks(fromIndex, toIndex);
    });

    paletteContainer.appendChild(block);
  });
}

// Échange deux blocs dans le DOM
function swapBlocks(from, to) {
  const blocks = Array.from(paletteContainer.children);
  const fromBlock = blocks[from];
  const toBlock = blocks[to];
  if (fromBlock && toBlock) {
    if (from < to) {
      paletteContainer.insertBefore(fromBlock, toBlock.nextSibling);
    } else {
      paletteContainer.insertBefore(fromBlock, toBlock);
    }
    updateIndices();
  }
}

// Met à jour les index des blocs après chaque déplacement
function updateIndices() {
  Array.from(paletteContainer.children).forEach((block, index) => {
    block.dataset.index = index;
  });
}

// Vérifie si les blocs sont triés du plus foncé au plus clair
checkButton.addEventListener('click', () => {
  const blocks = Array.from(paletteContainer.children);
  const lightnessValues = blocks.map(block => parseFloat(block.dataset.lightness));
  const sorted = [...lightnessValues].sort((a, b) => a - b);

  const isCorrect = lightnessValues.every((val, i) => val === sorted[i]);
  if (isCorrect) {
    resultText.textContent = 'Bravo, bien trié !';
  } else {
    resultText.textContent = 'Ce n’est pas encore ça...';
  }
});

// Redémarre le jeu avec une nouvelle palette
restartButton.addEventListener('click', () => {
  const newPalette = shuffle(generatePalette(5));
  renderPalette(newPalette);
  resultText.textContent = '';  // Réinitialiser le message
});

// Initialisation du jeu avec une palette mélangée
const originalPalette = generatePalette(5);
const shuffledPalette = shuffle(originalPalette);
renderPalette(shuffledPalette);

