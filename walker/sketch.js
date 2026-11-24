// walker

class Walker {
  constructor(x,y,colour) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.diameter = 10;
    this.colour = colour;
  }
  display() {
    fill(this.colour);
    circle(this.x,this.y,this.diameter);
  }
  move() {
    let choice = random(100);

    if (choice < 25) {
      this.y -= this.speed;
    }
    else if (choice < 50) {
      this.y += this.speed;
    }
    else if (choice < 75) {
      this.x -= this.speed; 
    }
    else {
      this.x += this.speed;
    }
  }
}

let walkers = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  for (let walker of walkers) {
    walker.display();
    walker.move();
  }
  
}

function mousePressed() {
  walkers.push(new Walker(mouseX,mouseY,random(255)));
}
