// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let theTiles = [];
const THESIZE = 15;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let x = 0; x <= width; x += THESIZE) {
    for (let y = 0; y <= height; y += THESIZE) {
      let someTile = spawnTile(x,y,THESIZE);
      theTiles.push(someTile);

    }
  }
}

function draw() {
  background(220);
  for (let tile of theTiles) {
    line(tile.x1,tile.y1,tile.x2,tile.y2);
  }
}


function spawnTile(x,y,tileSize) {
  let slope = random(100);
  let tile;
  if (slope < 50) {
    // positive slope
    tile = {
      x1: x - tileSize/2,
      y1: y + tileSize/2,
      x2: x + tileSize/2,
      y2: y - tileSize/2,
    };
  }
  else {
    // negative slope
    tile = {
      x1: x - tileSize/2,
      y1: y - tileSize/2,
      x2: x + tileSize/2,
      y2: y + tileSize/2,
    };
  }
  return tile;
}