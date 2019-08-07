/*
Chillin by Dae In Chung, 2019
https://paperdove.com

best viewed on mobile.

Space Mono (OFL license)
http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL_web
*/

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

let tilePoints = []; // vector
const numTileRows = 16;
const numTileCols = 16;
let xTileInc;
let yTileInc;

let boundaries = [];
let world, engine;
let mConstraint;

let poolSfc; // start fill color
let poolEfc; // end fill color
let poolSc; // pool grout color
let shadowBoxCol; // shadow fill
let shadowTextCol; // shadow text (transparent)
let shapeBoxCol; // main box col
let shapeTextCol; // main text col
let shapeBlankCol;

let input, button, saveButton;

function preload() {
	font = loadFont("SpaceMono-Regular.ttf");
}

function setup() {
	w = windowWidth;
	h = windowHeight - 40;

	setAttributes("premultipliedAlpha", true);
	setAttributes("antialias", true);
	canvas = createCanvas(w, h, WEBGL);
	canvas.position(0, 40);

	gl = this._renderer.GL;
	gl.disable(gl.DEPTH_TEST); // had too many problems with text, so treat it more like 2d layers.
	colorMode(HSB, 360, 100, 100, 100);

	perspective(PI / 2.9, width / height, 0.01, 10000);

	engine = Engine.create();
	world = engine.world;

	boundaries[0] = new Ground(w / 2, h + 20, w, 40); // b
	boundaries[1] = new Ground(w / 2, -20, w, 40); // t
	boundaries[2] = new Ground(-20, h / 2, 40, h); // l
	boundaries[3] = new Ground(w + 20, h / 2, 40, h); // r

	textFont(font);
	textAlign(CENTER, CENTER);

	setupColors();

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
	input.position(0, 0);
	input.attribute("placeholder", "type message...");
	button = createButton('↵');
	button.id("button");
	button.position(input.width, input.y);
	button.mousePressed(updateShapes);
	saveButton = createButton('↓');
	saveButton.id("saveButton");
	saveButton.position(input.width + button.width, input.y);
	saveButton.mousePressed(saveImage);
}

function saveImage() {
	saveCanvas("image", "jpg");
}

function draw() {
	background(0);
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
	drawPool(depth, poolSfc, poolEfc, poolSc);

	// shadow
	push();
	translate(0, 0, -depth + 1);
	for (let i = 0; i < letters.length; i++) {
		const l = letters[i];
		l.activateShadow();
		l.setBoxColor(shadowBoxCol); // shadow color
		l.setTextColor(shadowTextCol); // transparent
		l.show();
	}
	pop();

	// water surface
	updateSurface();
	push();
	translate(0, 0, -320);
	translate(0, 0, sin(frameCount / 80) * 20);
	drawSurface();
	pop();

	// letters
	push();
	translate(0, 0, -320);
	for (let i = 0; i < letters.length; i++) {
		push();
		translate(0, 0, sin(i * 0.4 + frameCount / 80) * 20);
		const l = letters[i];
		l.deactivateShadow();
		l.setBoxColor(shapeBoxCol);
		l.setTextColor(shapeTextCol);
		l.setBlankColor(shapeBlankCol);
		l.show();
		pop();
	}
	pop();

	text('why', -800, -800); // !!!

	// console.log(frameRate());
}

function setupColors() {
	poolSfc = color(174, 85, 69);
	poolEfc = color(225, 100, 64);
	poolSc = color(157, 35, 90);
	shadowBoxCol = color(220, 99, 25, 40);
	shadowTextCol = color(0, 0, 0, 0);
	shapeBoxCol = color(6, 94, 98);
	shapeTextCol = color(0, 0, 100);
	shapeBlankCol = color(60, 80, 100);
}

function randColors() {
	const pfch = random(360); // pool fill color hue
	const sbch = (pfch + random(150, 210)) % 360; // shape box color hue
	const sblch = (sbch + random(30, 90)) % 360; // shape blank col hue
	poolSfc = color(pfch, random(0, 80), random(60, 90));
	poolEfc = color(pfch, random(0, 80), random(60, 90));
	poolSc = color(random(360), random(80, 100), random(60, 90));
	shadowBoxCol = color(pfch, random(0, 80), random(40, 70), 50);
	shapeBoxCol = color(sbch, random(80, 100), random(60, 90));
	shapeTextCol = color(0, 0, random(1) < .5 ? 0 : 100);
	shapeBlankCol = color(sblch, random(80, 100), random(70, 90));
}

//buggy in brackets
function drawSurface() {
	noStroke();
	let tl, tr, bl, br;
	for (let y = 0; y < numTileRows; y++) {
		for (let x = 0; x < numTileCols; x++) {
			const idx = x + y * numTileCols + y;
			tl = tilePoints[idx];
			tr = tilePoints[idx + 1];
			bl = tilePoints[idx + 1 + numTileCols];
			br = tilePoints[idx + 2 + numTileCols];

			beginShape();
			fill(170, 15, 100, 30 - sq(tl.z) * 3);
			vertex(tl.x, tl.y, tl.z);
			fill(170, 15, 100, 30 - sq(tr.z) * 3);
			vertex(tr.x, tr.y, tr.z);
			fill(170, 15, 100, 30 - sq(br.z) * 3);
			vertex(br.x, br.y, br.z);
			fill(170, 15, 100, 30 - sq(bl.z) * 3);
			vertex(bl.x, bl.y, bl.z);
			endShape();
		}
	}
}

function updateSurface() {
	let idx = 0;
	for (let y = 0; y <= h; y += yTileInc) {
		for (let x = 0; x <= w; x += xTileInc) {
			tilePoints[idx].z = noise(x * .002 + frameCount * .002, y * .002 + frameCount * .002) * 30 - 15; // z move range

			idx++;
		}
	}
}

function setupSurface() {
	for (let y = 0; y < numTileRows + 1; y++) { // +1 for boundary points
		for (let x = 0; x < numTileCols + 1; x++) {
			tilePoints.push(createVector(x * xTileInc, y * yTileInc, 0));
		}
	}
}

function setupShapes(msg) {
	for (let i = 0; i < letters.length; i++) {
		letters[i].removeBody();
	}
	letters = [];

	let scaleFactor;
	if (msg.length <= 4) scaleFactor = 0.28;
	else if (msg.length <= 6) scaleFactor = 0.25;
	else scaleFactor = 0.16;

	if (h > w) { // vertical screen
		let x = w / 4;
		let y = h / 10;
		for (let i = 0; i < msg.length; i++) {
			letters[i] = new Letter(msg[i].toUpperCase(), x, y, max(w, h) * scaleFactor);
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
			letters[i] = new Letter(msg[i].toUpperCase(), x, y, max(w, h) * scaleFactor);
			x += w / 5;
			if (x >= w) {
				x = w / 5;
				y += h / 4;
			}
		}
	}
}

function updateShapes() {
	const msg = input.value().substring(0, 15);
	setupShapes(msg);
	input.value('');
}

function drawPool(zd, sfc, efc, sc) {
	strokeWeight(3);
	stroke(sc);
	fill(sfc);

	const numTiles = 6;
	const winc = w / numTiles;
	const hinc = h / numTiles;
	const zinc = zd / numTiles;

	push(); // l
	rotateY(PI / 2);
	for (let x = 0; x < zd - zinc; x += zinc) {
		fill(lerpColor(sfc, efc, x / zd));
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
		fill(lerpColor(sfc, efc, y / zd));
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
		fill(lerpColor(sfc, efc, x / zd));
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
		fill(lerpColor(sfc, efc, y / zd));
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
	fill(lerpColor(sfc, efc, 1));
	rect(0, 0, w, h);
	for (let x = 0; x < w; x += winc) {
		line(x, 0, x, h);
	}
	for (let y = 0; y < h; y += hinc) {
		line(0, y, w, y);
	}
	pop();
}

function deviceShaken() {
	//randColors();
}

function keyPressed() {
	if (keyCode === RETURN || keyCode === ENTER) {
		updateShapes();
	}
	if (key === '\\') {
		randColors();
	}
}
