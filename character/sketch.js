// 2d rectangular grid demo

const CELL_SIZE = 150;
const OPEN_TILE = 0;
const IMPASSABLE = 1;
const PLAYER = 9;
let rows;
let cols;
let grid;
let thePlayer = {
  x:0,
  y:0,
};

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  displayGrid();
}

function keyPressed() {
  if (key === 'r') {
    grid = generateRandomGrid(cols, rows);
  }
  else if (key === 'e') {
    grid = generateEmptyGrid(cols, rows);
  }
  else if (key === "d") {
    movePlayer(thePlayer.x + 1,thePlayer.y);
  }
  else if (key === "a") {
    movePlayer(thePlayer.x-1,thePlayer.y);
  }
  else if (key === "s") {
    movePlayer(thePlayer.x,thePlayer.y+1);
  }
  else if (key === "w") {
    movePlayer(thePlayer.x,thePlayer.y-1);
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x, y);

  //neighbours
  toggleCell(x + 1, y);
  toggleCell(x - 1, y);
  toggleCell(x, y + 1);
  toggleCell(x, y - 1);
}

function toggleCell(x, y) {
  //make sure you're in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSABLE;
    }
    else if (grid[y][x] === IMPASSABLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE) {
        fill('white');
      }
      else if (grid[y][x] === IMPASSABLE) {
        fill('black');
      }
      else if (grid[y][x] === PLAYER) {
        fill("red");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(OPEN_TILE);
      }
      else {
        newGrid[y].push(IMPASSABLE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}

function movePlayer(x,y) {
  grid[thePlayer.y][thePlayer.x] = OPEN_TILE;
  if (x>=0 && x<cols && y>=0 && y< rows && grid[y][x] === OPEN_TILE) {
    thePlayer.x = x;
    thePlayer.y = y;

  }

  grid[thePlayer.y][thePlayer.x] = PLAYER;
}