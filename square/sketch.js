// Square Moving around edge of Screen


let speed = 10;
let squareSize = 200;
let x = 0;
let y = 0;


async function setup() {
  createCanvas(windowWidth, windowHeight);
  fill("black");
}



function draw() {
  display();
  rect(x,y,squareSize,squareSize);
}

function moveSquare() {
  if ( x < width-squareSize && y <= 0) {
    x += speed;
  }

  if (y<height-squareSize && x >= width-squareSize) {
    y += speed;
  }

  if ( x>0 && y >= height-squareSize) {
    x -= speed;
  }

  if (y>0 && x <= 0) {
    y -= speed;
  }
}
function display() {
  rect(x,y,squareSize,squareSize);
  background(220);
  moveSquare();
}