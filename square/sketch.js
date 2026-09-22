// Square Moving around edge of Screen


let speed = 5;
let squareSize = 20;
let x = 0;
let y = 0;


async function setup() {
  createCanvas(windowWidth, windowHeight);
}



function draw() {
  moveSquare();
  rect(x,y,squareSize,squareSize);
  background(220);
}

function moveSquare() {
  while (x<width) {
    x += speed;
  }
  while (y<height) {
    y += speed;
  }
  while (x>=0) {
    x-= speed;
  }
  while (y>= 0) {
    y -= speed;
  }
}