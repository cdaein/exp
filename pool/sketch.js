

let canvas;
let tube;

let font;
let letters = [];

const {
  Engine,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  Constraint
} = Matter;

let w, h;

let tiles = []; // vector
const numTileRows = 18;
const numTileCols = 18;
let xTileInc;
let yTileInc;

let boundaries = [];
let world, engine;
let mConstraint;

let input, button;

function preload() {
  font = loadFont("SpaceMono-Regular.ttf");
}

function setup() {
  w = windowWidth;
  h = windowHeight - 40;
  canvas = createCanvas(w, h, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);

  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST); // had too many problems with text, so treat it more like 2d layers.
  perspective(PI / 2.9, width / height, 0.01, 10000);

  engine = Engine.create();
  world = engine.world;

  boundaries[0] = new Ground(w / 2, h + 20, w, 40); // b
  boundaries[1] = new Ground(w / 2, -20, w, 40); // t
  boundaries[2] = new Ground(-20, h / 2, 40, h); // l
  boundaries[3] = new Ground(w + 20, h / 2, 40, h); // r

  textFont(font);
  textAlign(CENTER, CENTER);

  xTileInc = w / numTileCols;
  yTileInc = h / numTileRows;
  setupSurface();

  const msg = "c h i l l i n *";
  setupShapes(msg);

  const mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = displayDensity();
  const options = {
    mouse: mouse,
    constrain: {
      stiffness: 0.2
    }
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);

  input = createInput('');
  input.id("input");
  input.position(0, h);
  input.attribute("placeholder", "type message...");
  button = createButton('submit');
  button.id("button");
  button.position(input.width, input.y);
  button.mousePressed(updateShapes);
}

function draw() {
  // orbitControl();
  clear();
  Engine.update(engine);

  let rx = 0;
  let ry = 0;
  if (rotationX == 0 && rotationY == 0) { // desktop
    rx = constrain(map(mouseY, 0, height, PI * 0.01, -PI * 0.01), -PI / 10, PI / 10);
    ry = constrain(map(mouseX, 0, width, -PI * 0.01, PI * 0.01), -PI / 10, PI / 10);
  } else { // mobile
    rx = constrain(map(rotationX, PI / 2, -PI / 2, -PI * 0.005, PI * 0.005), -PI / 15, PI / 15);
    ry = constrain(map(rotationY, -PI / 2, PI / 2, -PI * 0.005, PI * 0.005), -PI / 15, PI / 15);
  }

  rotateX(rx);
  rotateY(ry);

  world.gravity.x = cos(frameCount / 50 + random(-0.01, 0.01)) * 0.00001 * w + rotationY * 0.001;
  world.gravity.y = sin(frameCount / 50) * 0.00001 * h + rotationX * 0.001;

  translate(-w / 2, -h / 2, 300);

  const depth = 1000;
  drawPool(depth);

  // shadow
  push();
  translate(0, 0, -depth);
  for (let i = 0; i < letters.length; i++) {
    const l = letters[i];
    l.setBoxColor(color(220, 99, 38, 40)); // shadow color
    l.setTextColor(color(0, 0, 0, 0)); // transparent
    l.activateShadow();
    l.show();
  }
  pop();

  // water surface
  updateSurface();
  push();
  translate(0, 0, -300);
  translate(0, 0, sin(frameCount / 80) * 20);
  drawSurface();
  pop();

  // letters
  push();
  translate(0, 0, -300);
  for (let i = 0; i < letters.length; i++) {
    push();
    translate(0, 0, sin(i * 0.4 + frameCount / 80) * 20);
    const l = letters[i];
    l.deactivateShadow();
    l.setBoxColor(color(6, 94, 98));
    l.setTextColor(color(0, 0, 100));
    l.show();
    pop();
  }
  pop();

  text('why', -800, -800); // !!!

  // console.log(frameRate());
}

//buggy in brackets
function drawSurface() {
  noStroke();
  let tl, tr, bl, br;
  for (let y = 0; y < numTileRows; y++) {
    for (let x = 0; x < numTileCols; x++) {
      const idx = x + y * numTileCols + y;
      // console.log(idx);
      if (idx % (numTileCols + 1) != numTileCols) {
        tl = tiles[idx];
        tr = tiles[idx + 1];
        bl = tiles[idx + 1 + numTileCols];
        br = tiles[idx + 2 + numTileCols];
        
        if (br == undefined) continue;

        const h = 180 + noise( x*.5 + frameCount*.005, y*.5 - frameCount*.005) * 20;
        const a = sq(noise(x*.3 + frameCount*.01, y*.3 + frameCount*.01)) * 100;
        fill(h, 60, 100, a);
        beginShape();
        vertex(tl.x, tl.y, tl.z);
        vertex(tr.x, tr.y, tr.z);
        vertex(br.x, br.y, br.z);
        vertex(bl.x, bl.y, bl.z);
        endShape();
      }
      // console.log(idx);

      // console.log((x+1) + y * numTileCols + y);
    }
  }
  // let idx = 0;
  // for (let y = 0; y <= h; y += yTileInc) {
  //   for (let x = 0; x <= w; x += xTileInc) {
  //     if (idx % (numTiles + 1) != numTiles && idx < (numTiles + 1) * numTiles - 1) {
  //       tl = tiles[idx];
  //       tr = tiles[idx + 1];
  //       br = tiles[idx + numTiles + 2];
  //       bl = tiles[idx + numTiles + 1];
  //       const h = 180 + noise(x + frameCount * .005, y + frameCount * .005) * 20;
  //       const a = sq(noise((x + frameCount) * .01, (y + frameCount) * .01)) * 100;
  //       fill(h, 60, 100, a);
  //       beginShape();
  //       vertex(tl.x, tl.y, tl.z);
  //       vertex(tr.x, tr.y, tr.z);
  //       vertex(br.x, br.y, br.z);
  //       vertex(bl.x, bl.y, bl.z);
  //       endShape();
  //     }
  //     idx++;
  //   }
  // }
}

function updateSurface() {
  let idx = 0;
  for (let y = 0; y <= h; y += yTileInc) {
    for (let x = 0; x <= w; x += xTileInc) {
      // tiles[idx].x += sin(x + frameCount/30) * .1;
      // tiles[idx].y += sin(y + frameCount/30) * .1;
      tiles[idx].z = noise((x + frameCount) * 0.01, (y + frameCount) * 0.01) * 30 - 15; // z move range
      idx++;
    }
  }
}

function setupSurface() {
  // let idx = 0;
  for (let y = 0; y <= h; y += yTileInc) {
    for (let x = 0; x <= w; x += xTileInc) {
      tiles.push( createVector(x, y, 0) );
      // idx++;
    }
  }
}

function setupShapes(msg) {
  for (let i = 0; i < letters.length; i++) {
    letters[i].removeBody();
  }
  letters = [];

  if (h > w) { // vertical screen
    let x = w / 4;
    let y = h / 10;
    for (let i = 0; i < msg.length; i++) {
      letters[i] = new Letter(msg[i].toUpperCase(), x, y, max(w, h) * 0.16);
      x += w / 4;
      if (x >= w) {
        x = w / 4;
        y += h / 5;
      }
    }
  } else { // horizontal screen
    let x = w / 10;
    let y = h / 4;
    for (let i = 0; i < msg.length; i++) {
      letters[i] = new Letter(msg[i].toUpperCase(), x, y, max(w, h) * 0.16);
      x += w / 5;
      if (x >= w) {
        x = w / 5;
        y += h / 4;
      }
    }
  }
}

function updateShapes() {
  const msg = input.value();
  setupShapes(msg);
  input.value('');
}

function drawPool(zd) {
  const fc = color(174, 85, 69); // start fillcolor
  const efc = color(215, 90, 64); // end fillcolor
  const sc = color(157, 35, 90); // grout color
  strokeWeight(5);
  stroke(sc);
  fill(fc);

  const numTiles = 6;
  const winc = w / numTiles;
  const hinc = h / numTiles;
  const zinc = zd / numTiles;

  push(); // l
  rotateY(PI / 2);
  for (let x = 0; x < zd - zinc; x += zinc) {
    fill(lerpColor(fc, efc, x / zd));
    rect(x, 0, zinc, h);
  }
  for (let x = 0; x < zd; x += zinc) {
    line(x, 0, x, h);
  }
  for (let y = 0; y < h; y += hinc) {
    line(0, y, zd, y);
  }
  pop();

  push(); // t
  rotateX(-PI / 2);
  for (let y = 0; y < zd - zinc; y += zinc) {
    fill(lerpColor(fc, efc, y / zd));
    rect(0, y, w, zinc);
  }
  for (let x = 0; x < w; x += winc) {
    line(x, 0, x, zd);
  }
  for (let y = 0; y < zd; y += zinc) {
    line(0, y, w, y);
  }
  pop();

  push(); // r
  translate(w, 0);
  rotateY(PI / 2);
  for (let x = 0; x < zd - zinc; x += zinc) {
    fill(lerpColor(fc, efc, x / zd));
    rect(x, 0, zinc, h);
  }
  for (let x = 0; x < zd; x += zinc) {
    line(x, 0, x, h);
  }
  for (let y = 0; y < h; y += hinc) {
    line(0, y, zd, y);
  }
  pop();

  push(); // b
  translate(0, h);
  rotateX(-PI / 2);
  for (let y = 0; y < zd - zinc; y += zinc) {
    fill(lerpColor(fc, efc, y / zd));
    rect(0, y, w, zinc);
  }
  for (let x = 0; x < w; x += winc) {
    line(x, 0, x, zd);
  }
  for (let y = 0; y < zd; y += zinc) {
    line(0, y, w, y);
  }
  pop();

  push(); // plane
  translate(0, 0, -zd);
  fill(lerpColor(fc, efc, 1));
  rect(0, 0, w, h);
  for (let x = 0; x < w; x += winc) {
    line(x, 0, x, h);
  }
  for (let y = 0; y < h; y += hinc) {
    line(0, y, w, y);
  }
  pop();
}

function keyPressed() {
  if (keyCode === RETURN || keyCode === ENTER) {
    updateShapes();
  }
}