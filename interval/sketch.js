// window.setInterval


let theColour;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  changeColour();

  window.setInterval(changeColour,500);
}

function draw() {
  background(220);
  fill(theColour);
  circle(width/2,height/2,400);
}

function changeColour() {
  theColour = color(random(255),random(255),random(255));
}