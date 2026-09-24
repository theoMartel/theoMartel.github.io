// Interactive Scene
// Theo Martel
// Sept 22nd 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let diameter = 10;
let canvas;
let lastCircleX = 0;
let lastCircleY = 0;
let circleX;
let circleY;

async function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  textSize(30);
}

function draw() {
  drawLines();
  canvas.mouseWheel(cursorSize);
  writeVariables();
}

function drawLines() {
  if (mouseIsPressed) {
    fill("white");
    circle(mouseX,mouseY,diameter);
    circleX = mouseX;
    circleY = mouseY - diameter/2;
    rect(circleX,circleY,diameter,diameter);

    lastCircleX = circleX;
    lastCircleY = circleY;
  }
}

function cursorSize(event) {
  if (event.deltaY < 0) {
    diameter += 5;
  }
  else if (event.deltaY > 0) {

    if (diameter > 5) {
      diameter -= 5;

    }
  }
}

function writeVariables() {
  fill("gray");
  rect(30,10,150,50);
  fill("black");
  text("size: " + diameter, 40,40);
}