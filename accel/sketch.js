// accelerometer variables
var x = 0;
var y = 0;
var z = 0;

var xpos;
var ypos;
var diam;

function setup() {
	var myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('p5container');

	xpos = width / 2;
	ypos = height / 2;
	diam = 100;
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

	const center = createVector(width / 2, height / 2);
	const pos = createVector();
	const acc = createVector(rotationX, rotationY);
	acc.normalize();
	pos.add(center);
	pos.add(acc);

	//	diam += z;
	if (diam > 200) diam = 200;

	fill(0);
	stroke(0);
	ellipse(pos.x, pos.y, diam, diam);
}
