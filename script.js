const gridContainer = document.querySelector('.grid-container');
const gridButton = document.querySelector('.grid-selection');

//Create 16 x 16 grid square divs
function getGrid() {
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            gridContainer.appendChild(gridSquare);
        }
    }
}

gridButton.addEventListener('click', getGrid);