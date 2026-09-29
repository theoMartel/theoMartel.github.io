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
let rectangle = false;
let colour;

async function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  textSize(30);
  strokeWeight(thickness);

  drawEnviroment();

}



function draw() {
  drawLines();
  canvas.mouseWheel(cursorSize);
  displays();
}

function drawLines() {
  strokeWeight(thickness);
  stroke(colour);
  fill(colour);

  if (!rectangle && mouseIsPressed && (mouseX >= width/8 + thickness/2 && mouseY >= height/8 + thickness/2) && (mouseX <= width/8 * 7 - thickness/2 && mouseY <= height/8 * 7 - thickness/2)) {
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
    fill("white");
    stroke("black");
    strokeWeight(2);
    rect(width/8,height/8,width/8*6, height/8*6,10,10,10,10);
  }
  else if (key === "s") {
    rectangle = true;
  }
  else if (key === "d") {
    rectangle = false;
  }
}

function displays() {

  // size display
  strokeWeight(1);
  stroke("black");
  fill("gray");
  rect(30,10,310,50);
  fill("black");
  text("size: " + thickness, 40,45);

  // colour display
  text("colour: ", 200, 45);
  fill(colour);
  rect(300,10,50,50);
}

function mouseClicked() {

  // colour buttons
  if (mouseX >= width/10 - diameter/2 && mouseX <= width/10 + diameter/2 && mouseY >= height/8 - diameter/2 && mouseY <= height/8 + diameter/2) {
    colour = "red";
  }
  else if (mouseX >= width/10 - diameter/2 && mouseX <= width/10 + diameter/2 && mouseY >= height/8 + 40 - diameter/2 && mouseY <= height/8 + 40 + diameter/2) {
    colour = "orange";
  }
  else if (mouseX >= width/10 - diameter/2 && mouseX <= width/10 + diameter/2 && mouseY >= height/8 + 80 - diameter/2 && mouseY <= height/8 + 80 + diameter/2) {
    colour = "yellow";
  }
  else if (mouseX >= width/10 - diameter/2 && mouseX <= width/10 + diameter/2 && mouseY >= height/8 + 120 - diameter/2 && mouseY <= height/8 + 120 + diameter/2) {
    colour = "green";
  }
  else if (mouseX >= width/10 - diameter/2 && mouseX <= width/10 + diameter/2 && mouseY >= height/8 + 160 - diameter/2 && mouseY <= height/8 + 160 + diameter/2) {
    colour = "blue";
  }
  else if (mouseX >= width/10 - diameter/2 && mouseX <= width/10 + diameter/2 && mouseY >= height/8 + 200 - diameter/2 && mouseY <= height/8 + 200 + diameter/2) {
    colour = "purple";
  }
  else if (mouseX >= width/10 - diameter/2 && mouseX <= width/10 + diameter/2 && mouseY >= height/8 + 240 - diameter/2 && mouseY <= height/8 + 240 + diameter/2) {
    colour = "black";
  }
  else if (mouseX >= width/10 - diameter/2 && mouseX <= width/10 + diameter/2 && mouseY >= height/8 + 280 - diameter/2 && mouseY <= height/8 + 280 + diameter/2) {
    colour = "white";
  }

  // rectangle drawer
  if (rectangle && (mouseX >= width/8 + thickness/2 && mouseY >= height/8 + thickness/2) && (mouseX <= width/8 * 7 - thickness/2 && mouseY <= height/8 * 7 - thickness/2)) {
    rect(mouseX - thickness/2 , mouseY - thickness/2, thickness, thickness);
  }
}

function drawEnviroment() {

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


  // drawing area
  fill("white");
  rect(width/8,height/8,width/8*6, height/8*6,10,10,10,10);

  // controls
  fill("black");
  text("click 's' to turn on square mode, and 'd' to get back to  drawing mode.", width/3,45 );
  text(" Use mouse wheel to change size.", width/3, 80);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawEnviroment();
}
