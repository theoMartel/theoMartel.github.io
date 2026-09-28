// Traffic Light Starter Code
// Theo Martel
// Sept 28

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let state = "green";
let greenTime = 5000;
let yellowTime = 1000;
let redTime = 5000;
let lastSwitch = 0;


async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  lightUp();
  console.log(millis());
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function lightUp() {
  if (state === "green") {
    fill("green");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
    if (millis() > greenTime + lastSwitch) {
      state = "yellow";
      lastSwitch += greenTime;
    }
  }
  else if (state === "yellow") {
    fill("yellow");
    ellipse(width/2, height/2, 50, 50); //middle
    if (millis() > yellowTime + lastSwitch) {
      state = "red";
      lastSwitch += yellowTime;
    }
  }
  else if (state === "red") {
    fill("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
    if (millis() > redTime + lastSwitch) {
      state = "green";
      lastSwitch += redTime;
    }
  }
}
