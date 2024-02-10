// Get random numbers in order to apply random colors
function getRandomRGB() {
    return Math.floor(Math.random() * 256);
}

function getRandomColor() {
    return `rgb(${getRandomRGB()}, ${getRandomRGB()}, ${getRandomRGB()})`;
}

function toggleRainbow(e) {
    blackColor = false;
    rainbowColor = true;
    eraser = false;
    // Adjust the color of the buttons based on selection
    e.target.style.cssText = BUTTON_ON;
    blackButton.style.cssText = BUTTON_OFF;
    eraserButton.style.cssText = BUTTON_OFF;
}

function toggleBlack(e) {
    blackColor = true;
    rainbowColor = false;
    eraser = false;
    // Adjust the color of the buttons based on selection
    e.target.style.cssText = BUTTON_ON;
    rainbowButton.style.cssText = BUTTON_OFF;
    eraserButton.style.cssText = BUTTON_OFF;
}

function toggleEraser(e) {
    blackColor = false;
    rainbowColor = false;
    eraser = true;
    e.target.style.cssText = BUTTON_ON;
    blackButton.style.cssText = BUTTON_OFF;
    rainbowButton.style.cssText = BUTTON_OFF;
}

function setUpGrid(e) {
    size.textContent = `${e.target.value} x ${e.target.value}`

    numberOfSquares = +e.target.value;

    // Remove every square before displaying the new size
    gridContainer.textContent = '';
    
    // Create the squares and append them inside the container
    for (let i = 0; i < numberOfSquares; i++) {
        for (let j = 0; j < numberOfSquares; j++) {
            const gridSquare = document.createElement('div');
            // Get the grid square width/height percentage related to the container
            gridSquare.style.width = `${600 / numberOfSquares / 600 * 100}%`;
            gridSquare.style.height = `${600 / numberOfSquares / 600 * 100}%`;
            if (gridLines) {
                //gridSquare.style.border = '1px solid var(--grid-lines)';
                gridSquare.style.borderRight = '1px solid var(--grid-lines)';
                gridSquare.style.borderTop = '1px solid var(--grid-lines)';
            }
            gridContainer.appendChild(gridSquare);
            gridSquare.addEventListener('mousedown', setMouseHold);
        }
    }
}

function setMouseHold(e) {
    mouseDown = true;
    setBgColor(e);
    e.preventDefault();
    // In case the user releases the mouse button
    // outside of the grid container
    document.body.addEventListener('mouseup', () => {
        mouseDown = false;
    })
    // Add/remove the following event listeners
    // in order to achieve mouse hold draw
    const squares = gridContainer.childNodes;
    squares.forEach(square => {
        square.addEventListener('mouseenter', setBgColor);
        square.addEventListener('mouseup', () => {
            mouseDown = false;
            squares.forEach(square => {
                square.removeEventListener('mouseenter', setBgColor);
            })
        });
    });
}

function setBgColor(e) {
    if (mouseDown) e.target.style.backgroundColor = 
        (blackColor) ? 'black' : 
        (rainbowColor) ? getRandomColor() :
        'var(--secondary-light)';
}

function toggleGridLines(e) {
    const squares = gridContainer.childNodes;
    squares.forEach(square => {
        //square.style.border = (gridLines) ? 'none' : '1px solid var(--grid-lines)';
        square.style.borderRight = (gridLines) ? 'none' : '1px solid var(--grid-lines)';
        square.style.borderTop = (gridLines) ? 'none' : '1px solid var(--grid-lines)';
    })
    gridLines = !gridLines;
    e.target.classList.toggle('black');
}

function clearGrid() {
    slider.dispatchEvent(inputEvent);
}

const gridContainer = document.querySelector('.grid-container');
const gridLinesButton = document.querySelector('.grid-lines-button');
const rainbowButton = document.querySelector('.rainbow');
const blackButton = document.querySelector('.black');
const eraserButton = document.querySelector('.eraser');
const slider = document.querySelector('.slider');
const size = document.querySelector('.size');
const clearButton = document.querySelector('.clear');
const BUTTON_ON = 'background-color: var(--primary-dark); color: var(--primary-light);';
const BUTTON_OFF = 'background-color: var(--primary-light); color: var(--primary-dark);';
let numberOfSquares = 0;
let gridLines = false;
let rainbowColor = false;
let blackColor = true;
let mouseDown = false;
let inputEvent = new Event('input');
let eraser = false;

gridLinesButton.addEventListener('click', toggleGridLines);
rainbowButton.addEventListener('click', toggleRainbow);
blackButton.addEventListener('click', toggleBlack);
eraserButton.addEventListener('click', toggleEraser);
slider.addEventListener('input', setUpGrid);
clearButton.addEventListener('click', clearGrid);
// Trigger the event for the default grid
slider.dispatchEvent(inputEvent);