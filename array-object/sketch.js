// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// arrays
let enemies = [];
let bullets = [];
let enemyBullets = [];

// state variables
let playing = false;
let dead = false;


// enemy movement variables
let time = 10;
let deltaTime = 0.01;

// player movement and player object variables
let speed = 10;
let player = {};
let playerCannon = {};
let angle = 0;
let endX;
let endY;
let cannonLength = 50;
let bulletSpeed = 10;
let score = 0;
let highscore = 0;

// player bullet variables
let ammo = 10;
let ammoRegenTime = 3000;
let lastAmmoRegen = 0;

// health bar variables
let health = 200;
let healthBarOutline = {
  width: 100,
  height: 20,
  x: 0,
  y: 0,
};
let healthBar = {
  width: healthBarOutline.width,
  height: healthBarOutline.height,
  x: healthBarOutline.x,
  y: healthBarOutline.y,
};
let damage = 25;

// enemy bullet variables
let waitTime = 400;
let lastBullet = 0;

// enemy spawn variables
let spawnTime = 2000;
let lastSpawn = 0;

// collision varible
let hitEnemy = false;
let hitPlayer = false;

// text variables
let font;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  
  textAlign(CENTER,CENTER);
  // font settings
  font = await loadFont("SPACEBAR.ttf");
  textFont(font);

  // create player
  player = {
    width: 100,
    height: 30,
    x: 0,
    y: height - 50,
  };

  // create player cannon
  playerCannon = {
    diameter: 40,
    x: player.x + player.width/2,
    y: player.y,
  };
}

function draw() {
  if (playing) {
    stroke("white");
    background("black");
    fill("blue");
    drawInformation();
    makeEnemies();
    drawEnemies();
    drawPlayer();
    movePlayer();
    drawBullets();
    regenBullets();
    makeEnemyBullets();
    moveEnemyBullets();
    checkDead();

  }
  else {
    drawStartScreen();
  }
}

// create enemies with spawnTime delay on loop
function makeEnemies() {
  if (millis() > spawnTime + lastSpawn) {
    let enemy = {
      x: undefined,
      y: undefined,
      diameter: 100,
      offset: random(10000),
      
    };
    enemies.push(enemy);
    lastSpawn += spawnTime - 10;
  }
}

// draw each enemy in enemies with noise function movement
function drawEnemies() {
  for (let enemy of enemies) {
    enemy.x = noise(time + enemy.offset) * width;
    enemy.y = noise(time + enemy.offset + 100002) * height/2;
    circle(enemy.x,enemy.y,enemy.diameter);
  
  };
  time += deltaTime;
  
}

// draw the player and the player cannon pointing at the mouse
function drawPlayer() {
  // draw player body
  strokeWeight(2);
  rect(player.x,player.y,player.width,player.height);
  circle(playerCannon.x,playerCannon.y,playerCannon.diameter);
  
  // find angle and draw cannon
  angle = atan2(mouseY - playerCannon.y,mouseX - playerCannon.x);
  endX = playerCannon.x + cos(angle) * cannonLength;
  endY = playerCannon.y + sin(angle) * cannonLength;
  strokeWeight(20);
  line(playerCannon.x,playerCannon.y,endX,endY);
  strokeWeight(2);
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
  healthBarOutline.x = player.x;
  healthBarOutline.y = player.y + 20;
  healthBar.x = player.x;
  healthBar.y = player.y + 20;

}

function mousePressed() {
  if (ammo > 0) {
    let bullet = {
      x: endX,
      y: endY,
      diameter: 20,
      shotAngle: angle,
    };
    bullets.push(bullet);
    ammo --;

  }

}

function drawBullets() {
  for (let indexB = bullets.length-1; indexB >= 0; indexB--) {
    let bullet = bullets[indexB];

    // draw bullets on the same angle as the player cannon
    if (bullet.y > 0) {
      bullet.y += sin(bullet.shotAngle) * bulletSpeed;
      bullet.x += cos(bullet.shotAngle) * bulletSpeed;

      circle(bullet.x,bullet.y,bullet.diameter);
    }
    else {
      bullets.splice(indexB,1);
    }

    // check collisions between player bullets and enemies
    for (let indexE = enemies.length-1; indexE >= 0; indexE--) {
      let enemy = enemies[indexE];
      hitEnemy = collideCircleCircle(bullet.x,bullet.y,bullet.diameter,enemy.x,enemy.y,enemy.diameter);

      if (hitEnemy) {
        bullets.splice(indexB,1);
        enemies.splice(indexE,1);
        ammo += 1;
        score += 1;
      }
    }


  };

}

function regenBullets() {
  if (millis() > ammoRegenTime + lastAmmoRegen) {
    ammo ++;
    lastAmmoRegen += ammoRegenTime;
  };

}

// on waitTime delay make enemy bullets
function makeEnemyBullets() {
  if (millis() > waitTime + lastBullet) {
    for (let enemy of enemies) {
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
  for (let index = enemyBullets.length-1; index >= 0; index--) {
    let enemyBullet = enemyBullets[index];
    circle(enemyBullet.x,enemyBullet.y,enemyBullet.diameter);
    enemyBullet.y += bulletSpeed;

    if (enemyBullet.y > height) {
      enemyBullets.splice(index,1);
    }
  }
}

function checkDead() {
  for (let index = enemyBullets.length-1; index >= 0; index--) {
    let enemyBullet = enemyBullets[index];
    hitPlayer = collideRectCircle(player.x,player.y,player.width,player.height,enemyBullet.x,enemyBullet.y,enemyBullet.diameter);
    if (hitPlayer) {
      enemyBullets.splice(index,1);
      health -= damage;
    }
    if (health <= 0) {
      playing = false;
      dead = true;
      if (score > highscore) {
        highscore = score;
      }
      score = 0;
    }
  }
}

function drawInformation() {
  fill("red");
  strokeWeight(2);
  rect(healthBarOutline.x,healthBarOutline.y,healthBarOutline.width,healthBarOutline.height);
  fill("green");
  rect(healthBar.x,healthBar.y,healthBar.width,healthBar.height);
  healthBar.width = health;
  fill("white");
  rect(10,10,100,60);
  rect(120,10,100,60);
  fill("black");
  textSize(20);
  text("SCORE",170,20);
  text("AMMO",60,20);
  textSize(30);
  text(ammo, 60, 45);
  text(score,170,45);

  fill("blue");

}


function drawStartScreen() {
  health = 100;
  ammo = 10;
  enemies = [];
  enemyBullets = [];
  background("black");
  stroke("black");
  fill("white");
  rect(width/2 - 150,height/2 - 50,300,100);
  fill("black");
  if (dead) {
    textSize(50);
    text("REPLAY", width/2,height/2);
  }
  else {
    textSize(70);
    text("PLAY", width/2,height/2);
  }
  fill("blue");
  stroke("white");
  textSize(130);
  text("SPACE SHOOTER",width/2,height/3);

  fill("white");
  rect(120,10,180,60);
  fill("black");
  textSize(20);
  text("HIGHSCORE",210,20);
  textSize(30);
  text(highscore,210,45);

  fill("blue");
  drawPlayer();
  movePlayer();
  drawBullets();
  for (let bullet of bullets) {
    if (collideRectCircle(width/2-150,height/2-50,300,100,bullet.x,bullet.y,bullet.diameter)) {
      playing = true;
    }

  }
}

