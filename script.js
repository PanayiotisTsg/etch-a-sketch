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
    customColor = false;
    shading = false;
    // Adjust the color of the buttons based on selection
    toggleSelection(blackColor, rainbowColor, eraser, customColor, shading);
}

function toggleBlack(e) {
    blackColor = true;
    rainbowColor = false;
    eraser = false;
    customColor = false;
    shading = false;
    // Adjust the color of the buttons based on selection
    toggleSelection(blackColor, rainbowColor, eraser, customColor, shading);
}

function toggleEraser(e) {
    blackColor = false;
    rainbowColor = false;
    eraser = true;
    customColor = false;
    shading = false;
    toggleSelection(blackColor, rainbowColor, eraser, customColor, shading);
}

function selectCustomColor(e) {
    blackColor = false;
    rainbowColor = false;
    eraser = false;
    customColor = true;
    shading = false;
    toggleSelection(blackColor, rainbowColor, eraser, customColor, shading);
}

function toggleShading() {
    shading = true;
    blackColor = false;
    eraser = false;
    customColor = false;
    rainbowColor = false;
    toggleSelection(blackColor, rainbowColor, eraser, customColor, shading);
}

function toggleSelection(black, rainbow, eraser, custom, shading) {
    blackButton.style.cssText = (black) ? BUTTON_ON : BUTTON_OFF;
    rainbowButton.style.cssText = (rainbow) ? BUTTON_ON : BUTTON_OFF;
    eraserButton.style.cssText = (eraser) ? BUTTON_ON : BUTTON_OFF;
    shadingButton.style.cssText = (shading) ? BUTTON_ON : BUTTON_OFF;
    if (custom) {
        customColorInput.classList.add('on');
    } else {
        customColorInput.classList.remove('on');
    }
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
                gridSquare.style.borderRight = '1px solid var(--grid-lines)';
                gridSquare.style.borderTop = '1px solid var(--grid-lines)';
            }
            gridSquare.style.backgroundColor = 'rgb(255, 255, 255)';
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
    if (mouseDown) {
        e.target.style.backgroundColor = 
        (blackColor) ? 'rgb(0, 0, 0)' : 
        (rainbowColor) ? getRandomColor() :
        (eraser) ? 'rgb(255, 255, 255)' :
        (customColor) ? customColorInput.value :
        e.target.style.backgroundColor;

        if (shading) setShading(e);
    }
}

function toggleGridLines(e) {
    const squares = gridContainer.childNodes;
    squares.forEach(square => {
        square.style.borderRight = (gridLines) ? 'none' : '1px solid var(--grid-lines)';
        square.style.borderTop = (gridLines) ? 'none' : '1px solid var(--grid-lines)';
    })
    gridLines = !gridLines;
    e.target.classList.toggle('black');
}

function clearGrid() {
    slider.dispatchEvent(inputEvent);
}

//Return an array of [r, g, b] values
function getCurrentRGB(color) {
    return color.slice(4, -1).split(', ');
}

function setShading(e) {
    console.log(e.target.style.backgroundColor);
    let currentRGB = getCurrentRGB(e.target.style.backgroundColor);
    let r = +currentRGB[0];
    let g = +currentRGB[1];
    let b = +currentRGB[2];

    r = (r > 37) ? r - 25 : 0;
    g = (g > 37) ? g - 25 : 0;
    b = (b > 37) ? b - 25 : 0;

    e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

const gridContainer = document.querySelector('.grid-container');
const gridLinesButton = document.querySelector('.grid-lines-button');
const rainbowButton = document.querySelector('.rainbow');
const blackButton = document.querySelector('.black');
const shadingButton = document.querySelector('.shading');
const eraserButton = document.querySelector('.eraser');
const slider = document.querySelector('.slider');
const size = document.querySelector('.size');
const clearButton = document.querySelector('.clear');
const customColorInput = document.querySelector('.color');
const BUTTON_ON = 'background-color: var(--primary-dark); color: var(--primary-light);';
const BUTTON_OFF = 'background-color: var(--primary-light); color: var(--primary-dark);';
let numberOfSquares = 0;
let gridLines = false;
let rainbowColor = false;
let blackColor = true;
let mouseDown = false;
let inputEvent = new Event('input');
let eraser = false;
let customColor = false;
let shading = false;

gridLinesButton.addEventListener('click', toggleGridLines);
rainbowButton.addEventListener('click', toggleRainbow);
blackButton.addEventListener('click', toggleBlack);
shadingButton.addEventListener('click', toggleShading);
eraserButton.addEventListener('click', toggleEraser);
customColorInput.addEventListener('input', selectCustomColor);
slider.addEventListener('input', setUpGrid);
clearButton.addEventListener('click', clearGrid);
// Trigger the event for the default grid
slider.dispatchEvent(inputEvent);