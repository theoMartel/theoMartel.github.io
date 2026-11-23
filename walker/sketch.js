// walker

class Walker {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.diameter = 5;
    this.colour = "red";
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

let theo;
let ryley;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  theo = new Walker(width/2,height/2);
  ryley = new Walker(300,400);
  ryley.colour = "blue";
}

function draw() {
  theo.display();
  ryley.display();
  theo.move();
  ryley.move();
  
}
