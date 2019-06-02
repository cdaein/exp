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

	let rX = map(rotationX, -90, 90, -height / 2, height / 2);
	let rY = map(rotationY, -90, 90, -width / 2, width / 2);
	rX = constrain(rX, -height / 2, height / 2);
	rY = constrain(rY, -width / 2, width / 2);


	acc = createVector(rotationX, rotationY);
	//	acc = createVector(.1, -1);
	acc.normalize();
	vel.add(acc);
	vel.limit(20);
	loc.add(vel);


	fill(0);
	stroke(0);
	ellipse(loc.x, loc.y, diam, diam);
}
