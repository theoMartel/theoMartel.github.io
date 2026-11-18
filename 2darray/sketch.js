// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cols = 25;
let rows = 4;
let gridWidth;
const CELL_SIZE = 30;
let lineX;
let lineSpeed = 2;
let kick;
let snare;
let hihat;
let cymbal;
let lineOn = false;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  gridWidth = width/2;
  grid = generateEmptyGrid(cols,rows);
  lineX = width/4;

  kick = await loadSound("kick.mp3");
  snare = await loadSound("snare.mp3");
  hihat = await loadSound("hihat.mp3");
  cymbal = await loadSound("cymbal.mp3");
}

function draw() {
  background(220);
  showGrid();
  drawLine();
  playSounds();
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

function keyPressed() {
  if (key === " ") {
    lineOn = !lineOn;
  }
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

    }
  

    else {
      grid[y][x] = 0;
    }
  }
}

function showGrid() {
  strokeWeight(2);
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
    

      square(x * CELL_SIZE + width/4, y * CELL_SIZE + height/4, CELL_SIZE);
    }
  }
}

function drawLine() {
  let y = height/4;
  strokeWeight(10);
  line(lineX,y,lineX,y+CELL_SIZE*rows);
  if (lineOn) {
    lineX+= lineSpeed;
  }
  if (lineX >= width/4*3) {
    lineX = width/4;
  }
}

function playSounds() {
  for (let y = 0; y < rows; y++) {
    let realLineX = lineX - width/4;
    let x = Math.floor(realLineX/CELL_SIZE);
    let lastX;
    if (grid[y][x] === 1 && !kick.isPlaying()) {
      kick.start();
      lastX = x;
    }
    else if (grid[y][x] === 2 && !snare.isPlaying()) {
      snare.start();
      lastX = x;
    }
    else if (grid[y][x] === 3 && !hihat.isPlaying()) {
      hihat.start();
      lastX = x;
    } 
    else if (grid[y][x] === 4 && !cymbal.isPlaying()) {
      cymbal.start();
      lastX = x;
    }
    if (lastX !== x) {
      if (kick.isPlaying()) {
        kick.stop();
      }
    }
  }
}

