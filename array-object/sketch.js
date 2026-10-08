// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let terrain = [];

const NUMBER_OF_RECTS = 2000;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  generateTerrain();
}

function draw() {
  for (i in terrain) {
    rect(i.x,i.y,i.w,i.h);
  }
}

function generateRectangle(leftSide,rectHeight,rectWidth) {
  let rectangle = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };
  return rectangle;
}
function generateTerrain() {
  let theWidth = NUMBER_OF_RECTS/width;
  let time = 0;
  let deltaTime = 0.001;
  for (let i = 0; i < NUMBER_OF_RECTS; i++) {
    let theRect = generateRectangle(theWidth*i,noise(time),theWidth);
    terrain.push(theRect);
    time += deltaTime;
  }

}
