var diam;

let loc;
let vel;
let acc;

function setup() {
	var myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('p5container');

	diam = 100;

	loc = createVector(width / 2, height / 2);
	vel = createVector();
	acc = createVector();
}

function draw() {
	background(123);

	textSize(48);
	fill(255, 255, 0);
	text("x:" + rotationX, 20, 40);
	text("y:" + rotationY, 20, 80);
	text("z:" + rotationZ, 20, 120);

	acc = createVector(rotationY, rotationX);
	//	acc = createVector(.1, -1);
	acc.normalize();
	vel.add(acc);
	vel.limit(5);
	loc.add(vel);
	loc.x = constrain(loc.x, 0, width);
	loc.y = constrain(loc.y, 0, height);
	//	loc.set(x, y);

	fill(0);
	stroke(0);
	ellipse(loc.x, loc.y, diam, diam);
}
