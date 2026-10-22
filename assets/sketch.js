// loading Images and sounds

let bubbleImg;
let bubbleSound;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  bubbleImg = await loadImage("bubble.png");
  bubbleSound = await loadSound("bubble.wav");
}

function draw() {
  background("black");
  image(bubbleImg,width/2,height/2);
  
}

function mousePressed() {
  bubbleSound.play();
}
