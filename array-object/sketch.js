// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let birds = [];

let playerBird = {
  size: 50,
  x: 100,
  y: 100,

};

let backgroundColour = "#ADD8E6"
let time = 0;
let deltaTime = 0.01;
let canvas;

async function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  noStroke();

}

function draw() {
  background(backgroundColour);
  drawPlayerBird();
  moveBirds();
  drawBirds();
  
}


function drawPlayerBird() {
  fill("black");
  rect(playerBird.x,playerBird.y,playerBird.size,playerBird.size);

  fill(backgroundColour);
  rect(playerBird.subtractX, playerBird.subtractY, playerBird.subtractSize, playerBird.subtractSize);
}

function moveBirds() {
  for (let bird of birds) {
    bird.x = noise(time + bird.timeOffset) * width;
    bird.y = noise(time + bird.timeOffset + 1000) * height;
  }
  playerBird.x = noise(time) * width;
  playerBird.y = noise(time + 10000) * height;

  time += deltaTime;
}

function mouseWheel(event) {
   if (event.deltaY < 0) {
    let newBird = {  
      size: 50,
      x: random(50,100),
      y: random(50,100),
      timeOffset: random(10000),
    };
    birds.push(newBird);
  }
  else if (event.deltaY > 0) {
    birds.pop();
  }
}

function drawBirds() {
  for (let bird of birds) {
    fill("black");
    rect(bird.x,bird.y,bird.size,bird.size)

  }
}