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
	
	xpos = width/2;
	ypos = height/2;
	diam = 100;
}

function draw() {
	background(123);
	
	fill(255);
	text("x:"+x, 20, 20);
	text("y:"+y, 20, 40);
	text("z:"+z, 20, 60);
	
	xpos += x;
	ypos += y;
	diam += z;
	
	fill(0);
	stroke(0);
	ellipse(xpos, ypos, diam, diam);
}

// accelerometer Data
window.addEventListener('devicemotion', function(e) 
{
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z); 
});