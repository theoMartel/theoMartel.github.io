// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cols;
let rows = 6;
let gridWidth;
const CELL_SIZE = 30;
let offsetX;
let offsetY;
let lineSpeed = 5;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  gridWidth = width/2;
  cols = gridWidth/CELL_SIZE;
  grid = generateEmptyGrid(cols,rows);
  offsetX = width/4;
  offsetY = height/4;
}

function draw() {
  background(220);
  showGrid();
  drawLine();
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}


function mousePressed() {
  let x = Math.floor((mouseX - width/4)/CELL_SIZE);
  let y = Math.floor((mouseY - height/4)/CELL_SIZE);
  console.log(x,y);
  changeCell(x, y);

}

function changeCell(x, y) {
  //make sure you're in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function showGrid() {
  strokeWeight(5);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill('white');
      }
      else if (grid[y][x] === 1) {
        fill('black');
      }
      square(x * CELL_SIZE + width/4, y * CELL_SIZE + height/4, CELL_SIZE);
    }
  }
}

function drawLine() {
  let y = height/4;
  strokeWeight(10);
  line(offsetX,y,offsetX,y+CELL_SIZE*rows);
  offsetX+= lineSpeed;
  if (offsetX >= width/4*3) {
    offsetX = width/4;
  }
}
