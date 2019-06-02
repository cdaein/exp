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

	const rX = map(rotationX, -180, 180, -height / 2, height / 2);
	const rY = map(rotationY, -180, 180, -width / 2, width / 2);

	xpos = width / 2 + rY;
	ypos = height / 2 + rX;
	//	diam += z;
	if (diam > 200) diam = 200;

	fill(0);
	stroke(0);
	ellipse(xpos, ypos, diam, diam);
}
