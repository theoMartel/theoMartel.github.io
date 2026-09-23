// Millis Demo

let waitTime = 2000;
let lastSwap = 0;
let state = "black";

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  switchState();
}
function switchState() {
  if (state === "black") {
    background("black");
    if (millis() > waitTime) {
      state = "red";
      waitTime += 2000;
    }
  }
  else if (state === "red") {
    background("red");
    if (millis() > waitTime) {
      state = "black";
      waitTime += 2000;
    }
  } 

}
