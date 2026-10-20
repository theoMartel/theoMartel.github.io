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
let enemyState = "shoot";
let waitTime = 400;
let lastBullet = 0;
let spawnTime = 2000;
let lastSpawn = 0;

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
  makeEnemies();
  makeEnemyBullets();
  moveEnemyBullets();
}

function makeEnemies() {
  if (millis() > spawnTime + lastSpawn) {
    let enemy = {
      x: 0,
      y: 0,
      diameter: 100,
      offset: random(10000),
      
    };
    enemys.push(enemy);
    lastSpawn += spawnTime;
  }
}

function drawEnemies() {
  for (let enemy of enemys) {
    enemy.x = noise(time + enemy.offset) * width;
    enemy.y = noise(time + enemy.offset + 100002) * height/2;
    circle(enemy.x,enemy.y,enemy.diameter);
  
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

function makeEnemyBullets() {
  if (millis() > waitTime + lastBullet) {
    for (let enemy of enemys) {
      let enemyBullet = {
        x: enemy.x,
        y: enemy.y,
        diameter: 10,
      };
      enemyBullets.push(enemyBullet);
    }
    lastBullet += waitTime;
  }
}

function moveEnemyBullets() {
  for (let i = enemyBullets.length-1; i >= 0; i--) {
    circle(enemyBullets[i].x,enemyBullets[i].y,enemyBullets[i].diameter);
    enemyBullets[i].y += bulletSpeed;

    if (enemyBullets[i].y > height) {
      enemyBullets.splice(i,1);
    }
  }
}
