// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let time = 0;
let deltaTime = 0.01;
const TIME_OFFSET = 10000000;
async function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  let x = noise(time) * width;
  let y = noise(time + TIME_OFFSET) * height;
  
  fill("black");
  circle(x,y, 5);
  time += deltaTime;
}

