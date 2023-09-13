const gridContainer = document.querySelector('.grid-container');
let numberOfSquares = 0;
const gridLinesButton = document.querySelector('.grid-lines-button');
let gridLines = false; // Grid lines are not visible by default
const rainbowButton = document.querySelector('.rainbow');
let rainbowColor = false;
let blackColor = true;
const blackButton = document.querySelector('.black');
const slider = document.querySelector('.slider');
const size = document.querySelector('.size');

// Toggle the grid lines to be visible or invisible
gridLinesButton.addEventListener('click', e => {
    const children = gridContainer.childNodes;

    if (gridContainer.hasChildNodes) {
        children.forEach(square => {
            switch (square.style.border) {
                case '1px solid var(--grid-lines)':
                    square.style.border = 'none';
                    gridLines = false;
                    break;
                case 'none':
                    square.style.border = '1px solid var(--grid-lines)';
                    gridLines = true;
                    break;
                default:
                    square.style.border = '1px solid var(--grid-lines)';
                    gridLines = true;
                    break;
            }
        });
    }
});

// Get random numbers in order to apply random colors
function getRandomRGB() {
    return Math.floor(Math.random() * 256);
}


function toggleRainbow(e) {
    const gridSquares = gridContainer.childNodes;

    // Adjust the color of the buttons based on selection
    blackColor = false;
    rainbowColor = true;
    e.target.style.cssText = 'background-color: var(--primary-dark); color: var(--primary-light);';
    blackButton.style.cssText = 'background-color: var(--primary-light); color: var(--primary-dark);';

    if (gridContainer.hasChildNodes) {
        gridSquares.forEach(square => {
            square.addEventListener('mouseover', e => {
                e.target.style.backgroundColor = 
                    `rgb(${getRandomRGB()}, ${getRandomRGB()}, ${getRandomRGB()})`;
            })
        })
    }
}

function toggleBlack(e) {
    const gridSquares = gridContainer.childNodes;

    blackColor = true;
    rainbowColor = false;
    e.target.style.cssText = 'background-color: var(--primary-dark); color: var(--primary-light);';
    rainbowButton.style.cssText = 'background-color: var(--primary-light); color: var(--primary-dark);';

    gridSquares.forEach(square => {
        square.addEventListener('mouseover', e => {
            e.target.style.backgroundColor = 'black';
        })
    })
}

rainbowButton.addEventListener('click', toggleRainbow);
blackButton.addEventListener('click', toggleBlack);

slider.addEventListener('input', e => {
    size.textContent = `${e.target.value} x ${e.target.value}`

    numberOfSquares = +e.target.value;

    // Remove every square before displaying the new size
    while (gridContainer.hasChildNodes()) {
        gridContainer.removeChild(gridContainer.firstChild);
    };

    // Create the squares and append them inside the container
    for (let i = 0; i < numberOfSquares; i++) {
        for (let j = 0; j < numberOfSquares; j++) {
            const gridSquare = document.createElement('div');

            // Divide the container width(600px) by the grid size
            // entered by the user to get the square width
            // Example: user input: 16 -> 600 / 16 = 37.5px
            gridSquare.style.width = `${600 / numberOfSquares}px`;
            gridSquare.style.height = `${600 / numberOfSquares}px`;
            if (gridLines === true) {
                gridSquare.style.border = '1px solid var(--grid-lines)';
            }
            gridContainer.appendChild(gridSquare);

            gridSquare.addEventListener('mouseover', e => {
                if (blackColor === true){
                    e.target.style.backgroundColor = 'black';
                } else {
                    e.target.style.backgroundColor = 
                        `rgb(${getRandomRGB()}, ${getRandomRGB()}, ${getRandomRGB()})`;
                }
            });
        }
    }
})