const gridContainer = document.querySelector('.grid-container');
const gridButton = document.querySelector('.grid-selection');
let numberOfSquares = 0;

// Display the grid size based on input
function getGrid() {
    numberOfSquares = +prompt('Enter the number of squares per side: ');

    // Only numbers from 0 - 100 can be accepted
    if (numberOfSquares > 100) {
        alert('The maximum number is 100');
        return;
    } else if (numberOfSquares < 0) {
        alert('The minimum number is 0');
        return;
    } else if (isNaN(numberOfSquares)) {
        alert('Only numbers can be accepted');
        return;
    }

    // Remove every square before displaying the new size
    while (gridContainer.hasChildNodes()) {
        gridContainer.removeChild(gridContainer.firstChild);
    };

    for (let i = 0; i < numberOfSquares; i++) {
        for (let j = 0; j < numberOfSquares; j++) {
            const gridSquare = document.createElement('div');

            // Divide the container width(800px) by the grid size
            // entered by the user to get the square width
            // Example: user input: 16 -> 800 / 16 = 50px
            gridSquare.style.width = `${800 / numberOfSquares}px`;
            gridSquare.style.height = `${800 / numberOfSquares}px`;
            gridSquare.style.border = '1px solid grey';
            gridContainer.appendChild(gridSquare);

            gridSquare.addEventListener('mouseover', e => {
                e.target.style.backgroundColor = 'black';
            });
        }
    }
}

gridButton.addEventListener('click', getGrid);
