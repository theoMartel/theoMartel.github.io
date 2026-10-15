// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let hit = false;

let enemys = [];
let bullets = [];

let time = 10;
let deltaTime = 0.01;
let speed = 10;
let player = {};
let playerCannon = {};
let angle = 0;
let endX;
let endY;
let cannonLength = 50;
const GRAVITY = 1;


async function setup() {
  createCanvas(windowWidth, windowHeight);
  player = {
    width: 100,
    height: 30,
    x: 0,
    y: height - 50,
  };

  playerCannon = {
    diameter: 40,
    x: player.x + player.width/2,
    y: player.y,
  };
}

function draw() {
  background(220);
  drawEnemies();
  drawPlayer();
  movePlayer();
  drawBullets();
}

function mouseWheel(event) {
  if (event.delta < 0) {
    let enemy = {
      x: noise(time),
      y: noise(time + 1000),
      diameter: 100,
      offset: random(10000),
      
    };
    enemys.push(enemy);
  }
  else{
    enemys.pop();
  }
}

function drawEnemies() {
  for (let enemy of enemys) {
    circle(enemy.x,enemy.y,enemy.diameter);
    enemy.x = noise(time + enemy.offset) * width;
    enemy.y = noise(time + enemy.offset + 1000) * height;
  
  };
  time += deltaTime;
  
}

function drawPlayer() {
  strokeWeight(2);
  rect(player.x,player.y,player.width,player.height);
  circle(playerCannon.x,playerCannon.y,playerCannon.diameter);
  strokeWeight(20);

  angle = atan2(mouseY - playerCannon.y,mouseX - playerCannon.x);
  endX = playerCannon.x + cos(angle) * cannonLength;
  endY = playerCannon.y + sin(angle) * cannonLength;

  line(playerCannon.x,playerCannon.y,endX,endY);
}

function movePlayer() {
  if (keyIsDown("a") || keyIsDown(LEFT_ARROW)) {
    if (player.x > 0) {
      player.x -= speed;
    }
  }
  else if (keyIsDown("d") || keyIsDown(RIGHT_ARROW)) {
    if (player.x < width-player.width ) {
      player.x += speed;
    }
  }
  playerCannon.x = player.x + player.width/2;
}

function mousePressed() {
  let bullet = {
    x: endX,
    y: endY,
    diameter: 20,
    shotAngle: angle,
  };
  bullets.push(bullet);
}

function drawBullets() {
  for (let bullet of bullets) {

    if (bullet.y > 0) {
      bullet.y += sin(bullet.shotAngle) * 10;

      bullet.x += cos(bullet.shotAngle) *10;


      circle(bullet.x,bullet.y,bullet.diameter);


    }
    else {
      bullets.splice(0,1);
    }

    for (let enemy of enemys ) {
      hit = collideCircleCircle(bullet.x,bullet.y,bullet.diameter,enemy.x,enemy.y,enemy.diameter);
      if (hit) {
        enemys.pop();
        bullets.splice(0,1);
      }
    }


  };

}