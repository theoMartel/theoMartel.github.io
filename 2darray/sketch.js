// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cols = 24;
let rows = 4;
const CELL_SIZE = 30;
let lineX;
let lineSpeed = 2;
let kick;
let snare;
let hihat;
let cymbal;
let lineOn = false;
let lastX = -1;


class Button {
  constructor(size,colour,x,y) {
    this.size = size;
    this.fill(colour);
    this.x = x;
    this.y = y;
  }
  drawButton() {
    circle(this.x,this.y,this.size);
  }

}
let cButton = new Button(50,"blue", 100,500);

async function setup() {
  createCanvas(windowWidth, windowHeight);
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
  checkLineX();
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
  if (lineX >= width/4 + CELL_SIZE * cols) {
    lineX = width/4;
  }
}

function checkLineX() {
  let realLineX = lineX - width/4;
  let x = Math.floor(realLineX/CELL_SIZE);
  if (x !== lastX) {
    playSounds(x);
    lastX = x;
  }
}

function playSounds(x) {
  for (let y = 0; y < rows; y++) {
    if (grid[y][x] === 1) {
      kick.start();
      console.log("playkick");
    }
    if (grid[y][x] === 2) {
      snare.start();
      console.log("playsnare");
    }
    if (grid[y][x] === 3) {
      hihat.start();
      console.log("playhihat");
    } 
    if (grid[y][x] === 4) {
      cymbal.start();
      console.log("playcymbal");
    }
    
  }
}

