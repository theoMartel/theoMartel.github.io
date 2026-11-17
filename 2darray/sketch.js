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
let lineX;
let lineSpeed = 5;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  gridWidth = width/2;
  cols = gridWidth/CELL_SIZE;
  grid = generateEmptyGrid(cols,rows);
  lineX = width/4;
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
  console.log(y,x);
  changeCell(x, y);

}

function changeCell(x, y) {
  //make sure you're in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0) {

      if (y === 0) {
        grid[y][x] = 1;
      }
      else if (y === 1) {
        grid[y][x] = 2;
      }
      else if (y === 2) {
        grid[y][x] = 3;
      }
      else if (y === 3 ) {
        grid[y][x] = 4;
      }
      else if (y === 4) {
        grid[y][x] = 5;
      }
      else if (y === 5) {
        grid[y][x] = 6;
      }

    }
  

    else {
      grid[y][x] = 0;
    }
  }
  console.log(grid[y][x]);
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
      else if (grid[y][x] === 2) {
        fill("grey");
      } 
      else if (grid[y][x] === 3) {
        fill("blue");
      }
      else if (grid[y][x] === 4) {
        fill("green");
      }
      else if (grid[y][x] === 5) {
        fill("yellow");
      }
      else if (grid[y][x] === 6) {
        fill("red");
      }

      square(x * CELL_SIZE + width/4, y * CELL_SIZE + height/4, CELL_SIZE);
    }
  }
}

function drawLine() {
  let y = height/4;
  strokeWeight(10);
  line(lineX,y,lineX,y+CELL_SIZE*rows);
  lineX+= lineSpeed;
  if (lineX >= width/4*3) {
    lineX = width/4;
  }
}

function playSounds() {
  
}