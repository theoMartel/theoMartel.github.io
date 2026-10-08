// Theo

let terrain = [];

const NUMBER_OF_RECTS = 2000;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrain();

}


function draw() {
  background(220);
  fill("green");
  stroke("green");

  for (let theRect of terrain) {
    rect(theRect.x,theRect.y,theRect.width,theRect.height);

  }
}

function spawnRectangle(leftSide,rectWidth,rectHeight) {
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    width: rectWidth,
    height: rectHeight,

  };
  return theRect;
}

function generateTerrain() {
  let theWidth = width / NUMBER_OF_RECTS;
  let time = 0;
  let deltaTime = 0.001;


  for (let i = 0; i < NUMBER_OF_RECTS; i+=1) {
    let theHeight = noise(time) * height;
    let someRect = spawnRectangle(theWidth*i, theWidth, theHeight);
    terrain.push(someRect);
    time+= deltaTime;
  }
}