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
let lastX = 0;

// oscillators
let aOscillator;
let bOscillator;
let cOscillator;
let dOscillator;
let eOscillator;
let fOscillator;
let gOscillator;
let highCOscillator;

let buttons = [];

class Button {
  constructor(size,colour,x,y,noteName,oscillatorName,key) {
    this.size = size;
    this.colour = colour;
    this.x = x;
    this.y = y;
    this.note = noteName;
    this.oscillatorName = oscillatorName;
    this.keyPlaying = false;
    this.mousePlaying = false;
    this.key = key
  }
  drawButton() {
    fill(this.colour);
    stroke(1);
    circle(this.x,this.y,this.size);
    fill("black")
    textSize(80);
    text(this.note,this.x,this.y);
    textSize(40);
    text(this.key,this.x,this.y-75);
  }
  mousePressed() {
    let distance = dist(mouseX,mouseY,this.x,this.y);
    if (distance <= this.size/2) {
      this.oscillatorName.amp(0.2,0.01);
      this.mousePlaying = true;

    }

  }
  mouseReleased() {
    if (this.mousePlaying) {
      this.oscillatorName.amp(0,0.5);
      this.mousePlaying = false;
    }
  }

  keyDown() {
    if (keyIsDown(this.key) && !this.keyPlaying) {
      this.oscillatorName.amp(0.2,0.01);
      this.keyPlaying = true;
    }
    else if (!keyIsDown(this.key) && this.keyPlaying) {
      this.oscillatorName.amp(0,0.5);
      this.keyPlaying = false;
    }
  }
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateEmptyGrid(cols,rows);
  lineX = width/4;
  textAlign(CENTER,CENTER);
  
  // load Drums
  kick = await loadSound("kick.mp3");
  snare = await loadSound("newSnare.mp3");
  hihat = await loadSound("hihat.mp3");
  cymbal = await loadSound("cymbal.mp3");

  // set up note oscillators;
  aOscillator = new p5.Oscillator(440,"square");
  aOscillator.amp(0);
  aOscillator.start();

  bOscillator = new p5.Oscillator(493.88,"square");
  bOscillator.amp(0);
  bOscillator.start();

  cOscillator = new p5.Oscillator(261.63,"square");
  cOscillator.amp(0);
  cOscillator.start();
  
  dOscillator = new p5.Oscillator(293.66,"square");
  dOscillator.amp(0);
  dOscillator.start();

  eOscillator = new p5.Oscillator(329.63, "square");
  eOscillator.amp(0);
  eOscillator.start();

  fOscillator = new p5.Oscillator(349.23, "square");
  fOscillator.amp(0);
  fOscillator.start();

  gOscillator = new p5.Oscillator(392,"square");
  gOscillator.amp(0);
  gOscillator.start();

  highCOscillator = new p5.Oscillator(523.25,"square");
  highCOscillator.amp(0)
  highCOscillator.start();


  buttons.push(new Button(100,"blue",width/4,500,"c",cOscillator,"1"));
  buttons.push(new Button(100,"turquoise",width/4+100,500,"d",dOscillator,"2"));
  buttons.push(new Button(100,"green",width/4+200,500,"e", eOscillator,"3"));
  buttons.push(new Button(100,"yellow",width/4+300,500,"f", fOscillator,"4"));
  buttons.push(new Button(100,"orange",width/4+400,500,"g", gOscillator,"5"));
  buttons.push(new Button(100,"red",width/4+500,500,"a", aOscillator,"6"));
  buttons.push(new Button(100,"purple",width/4+600,500,"b", bOscillator,"7"));
  buttons.push(new Button(100,"blue",width/4+700,500,"C", highCOscillator,"8"))

}

function draw() {
  background(220);
  for (let button of buttons) {
    button.drawButton();
    button.keyDown();
  }
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
  if (key === "c" || key === "C") {
    grid = generateEmptyGrid(cols,rows);
  }
}

function mousePressed() {
  for (let button of buttons) {
    button.mousePressed()
  }
  let x = Math.floor((mouseX - width/4)/CELL_SIZE);
  let y = Math.floor((mouseY - height/4)/CELL_SIZE);
  console.log(y,x);
  changeCell(x, y);

}
function mouseReleased() {
  for (let button of buttons) {
    button.mouseReleased();
  }
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

