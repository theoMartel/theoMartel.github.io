// Interactive Scene
// Theo Martel
// Sept 22nd 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let thickness = 10;
let canvas;
let lastCircleX = 0;
let lastCircleY = 0;
let diameter = 30;

async function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  textSize(30);
  strokeWeight(thickness);
}

function draw() {
  drawLines();
  canvas.mouseWheel(cursorSize);
  drawThings();
}

function drawLines() {
  strokeWeight(thickness);
  if (mouseIsPressed && ( mouseX >= width/8 && mouseY >= height/8)) {
    fill("white");
    line(mouseX,mouseY,lastCircleX,lastCircleY);

    lastCircleX = mouseX;
    lastCircleY = mouseY;
  }
  if (!mouseIsPressed) {
    lastCircleX = mouseX;
    lastCircleY = mouseY;
  }
}

function cursorSize(event) {
  if (event.deltaY < 0) {
    thickness += 5;
  }
  else if (event.deltaY > 0) {

    if (thickness > 5) {
      thickness -= 5;

    }
  }
}

function keyPressed() {
  if (key === "c") {
    background("white");
  }
}

function drawThings() {

  strokeWeight(2);

  // colour choosers
  fill("red");
  circle(width/10,height/8, diameter);
  fill("orange");
  circle(width/10,height/8 + 40, diameter);
  fill("yellow");
  circle(width/10,height/8 + 80, diameter);
  fill("green");
  circle(width/10,height/8 + 120, diameter);
  fill("blue");
  circle(width/10,height/8 + 160, diameter);
  fill("purple");
  circle(width/10,height/8 + 200, diameter);
  fill("black");
  circle(width/10,height/8 + 240, diameter);
  fill("white");
  circle(width/10,height/8 + 280, diameter);

  // size display
  fill("gray");
  rect(30,10,150,50);
  fill("black");
  text("size: " + thickness, 40,40);

  // drawing area
  fill("white");
  rect(width/8,height/8,width/8*6, height/8*6,10,10,10,10);
}