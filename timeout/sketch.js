// window.setTimeout demo


let message = "coming soon...";

async function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER,CENTER);
  textSize(50);

  window.setTimeout(newMessage,3000);
}

function draw() {
  background(220);

  text(message,width/2,height/2);
}


function newMessage() {
  message = "Its here!";
}