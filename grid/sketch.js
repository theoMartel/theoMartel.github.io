// grid demo


// let grid = [ [1,0,1,1],[0,1,1,0],[1,0,0,1],[0,0,1,0]];
// let squareSize;
// const SQUARE_DIMENTIONS = grid.length;


const SQUARE_DIMENTIONS = 50;
let squareSize;
let grid;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  squareSize = height/SQUARE_DIMENTIONS;

  grid = randomizedGrid(SQUARE_DIMENTIONS,SQUARE_DIMENTIONS);
}

function draw() {
  background(220);
  showGrid();

}

function showGrid() {
  for (let y= 0; y< SQUARE_DIMENTIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENTIONS; x++) {
      if (grid[y][x] === 1) {
        fill("black");

      }
      else {
        fill("white");
      }
      square(x * squareSize,y * squareSize,squareSize);

    }
  }
}


function randomizedGrid(cols,rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(0);

      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}

function mousePressed() {
  let x = Math.floor(mouseX/squareSize);
  let y = Math.floor(mouseY/squareSize);

  if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
  else {
    grid[y][x] = 1;
  }
}