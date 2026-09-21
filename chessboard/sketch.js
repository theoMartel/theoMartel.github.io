// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  colour = "white";
  
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight,windowHeight);
  }
}

let colour;
function draw() {
  background(220);
  drawBoard();
}

function drawBoard() {
  for (let x = 0; x < width; x += width/8) {
    for (let y = 0; y < width; y += width/8) {
      
      fill(colour);
      rect(x,y,width/8,width/8);
      
      colourSwap();

    }
    colourSwap();
  }
}



function colourSwap() {
  if (colour === "white") {
    colour = "black";
  }
  else if (colour === "black") {
    colour = "white";
  }
}