// Interactive Scene
// Theo Martel
// Sept 22nd 2026
//
// Extra for Experts:
// - added scroll wheel function based on p5js reference
// - added clickable buttons and images
// - added resize when the window changes sizes

// global variables
let thickness = 10;
let canvas;
let lastX = 0;
let lastY = 0;
let size = 30;
let drawType = "pen";
let colour;
let penImage;
let eraserImage;

async function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  textSize(30);
  strokeWeight(thickness);
  background(135,206,250);
  penImage = await loadImage('pen.png');
  eraserImage = await loadImage('eraser.jpg');

  drawEnviroment();
}



function draw() {
  drawLines();
  canvas.mouseWheel(cursorSize);
  displays();
}

// pen 
function drawLines() {
  strokeWeight(thickness);
  stroke(colour);
  fill(colour);

  if (drawType === "pen" && mouseIsPressed && (mouseX >= width/8 + thickness/2 && mouseY >= height/8 + thickness/2) && (mouseX <= width/8 * 7 - thickness/2 && mouseY <= height/8 * 7 - thickness/2)) {
    line(mouseX,mouseY,lastX,lastY);
  }

  lastX = mouseX;
  lastY = mouseY;
  
}

// increase or decrease cursor size
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

// preform actions when eraser, pen, or square keys are pressed
function keyPressed() {
  if (key === "e") {
    fill("white");
    stroke("black");
    strokeWeight(2);
    rect(width/8,height/8,width/8*6, height/8*6,10,10,10,10);
  }
  else if (key === "s") {
    drawType = "square";
  }
  else if (key === "p") {
    drawType = "pen";
  }
}

// show size and colour display
function displays() {

  // size display
  strokeWeight(1);
  stroke("black");
  fill("white");
  rect(30,10,310,50);
  fill("black");
  text("size: " + thickness, 40,45);

  // colour display
  text("colour: ", 200, 45);
  fill(colour);
  rect(300,10,50,50);
}

// create background elements
function drawEnviroment() {

  strokeWeight(3);

  // make colour selector buttons
  fill("red");
  circle(width/10,height/8, size);

  fill("orange");
  circle(width/10,height/8 + 40, size);

  fill("yellow");
  circle(width/10,height/8 + 80, size);

  fill("green");
  circle(width/10,height/8 + 120, size);

  fill("blue");
  circle(width/10,height/8 + 160, size);

  fill("purple");
  circle(width/10,height/8 + 200, size);

  fill("black");
  circle(width/10,height/8 + 240, size);

  fill("white");
  circle(width/10,height/8 + 280, size);

  //make drawing type selector buttons
  rect(width/20,height/8,40,40);
  image(penImage,width/20,height/8,40,40);

  rect(width/20,height/8 + 80,40,40);
  image(eraserImage,width/20,height/8 + 80,40,40);

  rect(width/20,height/8 + 160,40,40);
  fill("black");
  rect(width/20 + 10 ,height/8 + 170, 20,20);

  // make the drawing area
  fill("white");
  rect(width/8,height/8,width/8*6, height/8*6,10,10,10,10);

  // put corresponding key beside each button 
  fill("black");
  text("P", width/30,height/8 + 30 );
  text("E", width/30,height/8 + 110 );
  text("S", width/30,height/8 + 190 );

  // top text
  text("Welcome to my drawing program!", width/3, 40);
  text(" Use mouse wheel to change size.", width/3, 80);
}

function mouseClicked() {

  // colour selector buttons
  if (mouseX >= width/10 - size/2 && mouseX <= width/10 + size/2 && mouseY >= height/8 - size/2 && mouseY <= height/8 + size/2) {
    colour = "red";
  }
  else if (mouseX >= width/10 - size/2 && mouseX <= width/10 + size/2 && mouseY >= height/8 + 40 - size/2 && mouseY <= height/8 + 40 + size/2) {
    colour = "orange";
  }
  else if (mouseX >= width/10 - size/2 && mouseX <= width/10 + size/2 && mouseY >= height/8 + 80 - size/2 && mouseY <= height/8 + 80 + size/2) {
    colour = "yellow";
  }
  else if (mouseX >= width/10 - size/2 && mouseX <= width/10 + size/2 && mouseY >= height/8 + 120 - size/2 && mouseY <= height/8 + 120 + size/2) {
    colour = "green";
  }
  else if (mouseX >= width/10 - size/2 && mouseX <= width/10 + size/2 && mouseY >= height/8 + 160 - size/2 && mouseY <= height/8 + 160 + size/2) {
    colour = "blue";
  }
  else if (mouseX >= width/10 - size/2 && mouseX <= width/10 + size/2 && mouseY >= height/8 + 200 - size/2 && mouseY <= height/8 + 200 + size/2) {
    colour = "purple";
  }
  else if (mouseX >= width/10 - size/2 && mouseX <= width/10 + size/2 && mouseY >= height/8 + 240 - size/2 && mouseY <= height/8 + 240 + size/2) {
    colour = "black";
  }
  else if (mouseX >= width/10 - size/2 && mouseX <= width/10 + size/2 && mouseY >= height/8 + 280 - size/2 && mouseY <= height/8 + 280 + size/2) {
    colour = "white";
  }

  // drawing type buttons
  if (mouseX >= width/20 && mouseX <= width/20 + 40 && mouseY >= height/8 && mouseY <= height/8 + 40) {
    drawType = "pen";
  }
  else if (mouseX >= width/20 && mouseX <= width/20 + 40 && mouseY >= height/8 + 80 && mouseY <= height/8 + 120) {
    fill("white");
    stroke("black");
    strokeWeight(2);
    rect(width/8,height/8,width/8*6, height/8*6,10,10,10,10);
  }
  else if (mouseX >= width/20 && mouseX <= width/20 + 40 && mouseY >= height/8 + 160 && mouseY <= height/8 + 200) {
    drawType = "square";
  }

  // draw squares if square mode on and within the drawing area
  if (drawType === "square" && (mouseX >= width/8 + thickness/2 && mouseY >= height/8 + thickness/2) && (mouseX <= width/8 * 7 - thickness/2 && mouseY <= height/8 * 7 - thickness/2)) {
    rect(mouseX - thickness/2 , mouseY - thickness/2, thickness, thickness);
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawEnviroment();
}
