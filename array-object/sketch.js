// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let hit = false;

let enemys = [];
let bullets = [];
let enemyBullets = [];

let time = 10;
let deltaTime = 0.01;
let speed = 10;
let player = {};
let playerCannon = {};
let angle = 0;
let endX;
let endY;
let cannonLength = 50;
let bulletSpeed = 10;
let enemyBulletAllowed = false;

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
  drawEnemyBullets();
  moveEnemyBullets();
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
    enemy.y = noise(time + enemy.offset + 100002) * height;
  
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
  if (keyIsDown("a") || keyIsDown("A") || keyIsDown(LEFT_ARROW)) {
    if (player.x > 0) {
      player.x -= speed;
    }
  }
  else if (keyIsDown("d") || keyIsDown("D") || keyIsDown(RIGHT_ARROW)) {
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
  for (let number = bullets.length-1; number >= 0; number--) {
    let bullet = bullets[number];

    if (bullet.y > 0) {
      bullet.y += sin(bullet.shotAngle) * bulletSpeed;
      bullet.x += cos(bullet.shotAngle) * bulletSpeed;

      circle(bullet.x,bullet.y,bullet.diameter);
    }

    else {
      bullets.splice(0,1);
    }

    for (let i = enemys.length-1; i >= 0; i--) {
      let enemy = enemys[i];
      hit = collideCircleCircle(bullet.x,bullet.y,bullet.diameter,enemy.x,enemy.y,enemy.diameter);

      if (hit) {
        bullets.splice(number,1);
        enemys.splice(i,1);
      }
    }


  };

}

function drawEnemyBullets() {
  for (let enemy of enemys) {
    let enemyBullet = {
      x: enemy.x,
      y: enemy.y,
      diameter: 10,
    };
    circle(enemyBullet.x,enemyBullet.y,enemyBullet.diameter);
  }
}

function moveEnemyBullets() {
  for (let enemyBullet of enemyBullets) {
    circle(enemyBullet.x,enemyBullet.y,enemyBullet.diameter);
    enemyBullet.y ++;
  }
}