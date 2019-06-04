let canvas;
let ctx;
let ratio;

const numShapes = 5;
let shps = [];

let loc;
let tloc;

let w, h; // substitute width and height

const msg = "straightdowntherabbithole";
const str1 = "down, down, down. would the fall never come to an end";
const str2 = "down, down, down. there was nothing else to do, so alice soon began talking again.";

let bgCol;
let boxCol;
let txtCol;
let boxShaCol;
let txtShaCol;

let speed;
let totalFrames;


function setup() {
	ratio = 5 / 7;
	const dim = calcDimensionFromRatio(ratio);
	// 1080 x 1920 = 540 x 960 = 390 x 640
	canvas = createCanvas(dim.x, dim.y);
	canvas.position((windowWidth - canvas.width) / 2, (windowHeight - canvas.height) / 2);

	frameRate(30);
	noSmooth();
	w = width;
	h = height;
	colorMode(HSB, 360, 100, 100, 100);

	ctx = canvas.drawingContext;

	for (let i = 0; i < numShapes; i++) {
		shps[i] = new Compound();
	}

	//	textFont('moderno - fb ');
	//	textFont('serif');
	textFont('moderno-fb');
	textStyle(ITALIC);
	textAlign(LEFT, TOP);
	noStroke();

	loc = createVector(w / 2, h / 2);
	tloc = loc.copy();
	vel = createVector();
	acc = createVector();

	bgCol = color(0, 100, 100);
	boxCol = color(0, 0, 100);
	txtCol = color(0, 0, 0);
	boxShaCol = color(0, 0, 0, 60);
	txtShaCol = color(0, 0, 0, 20);

	totalFrames = 30 * 12; // 12 seconds at 30fps
}

function draw() {
	background(bgCol);

	speed = frameCount / totalFrames * TWO_PI;

	if (mouseIsPressed) {
		tloc.x = mouseX;
		tloc.y = mouseY;
	} else {
		// for desktop
		//		tloc.x = w / 2 - cos(speed * 1) * w / 6;
		//		tloc.y = h / 2 - sin(speed * 2) * h / 6;
		// for mobile
		tloc.x = w / 2 + constrain(map(rotationY, -45, 45, -w / 2, w / 2), -w / 2, w / 2);
		tloc.y = h / 2 + constrain(map(rotationX, -45, 45, -h / 2, h / 2), -h / 2, h / 2);
	}
	loc.x = lerp(loc.x, tloc.x, .1);
	loc.y = lerp(loc.y, tloc.y, .1);

	push();
	translate(w / 2, h / 2);
	fill(txtCol);
	textCircle(h * .09, h * .09, w * .05);
	pop();

	const bw = w - (w * .125); // first box width
	const bh = h - (w * .125); // first box height

	for (let i = numShapes - 1; i >= 0; i--) {
		const lx = lerp(w / 2, loc.x, i / numShapes);
		const ly = lerp(h / 2, loc.y, i / numShapes);
		let shp = shps[i];
		shp.setContourRect(lx, ly, bw - (i * w * .16), bh - (i * h * .16));

		ctx.shadowColor = boxShaCol;
		ctx.shadowBlur = 40;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		fill(boxCol);
		//		fill(0, i * 20, 100 - i * 5);
		fill(i * 60, 100, 100);
		if (i == 0) fill(txtCol);
		shp.display();

		ctx.shadowColor = txtShaCol;
		ctx.shadowBlur = 7;
		ctx.shadowOffsetX = 20;
		ctx.shadowOffsetY = 20;
		fill(txtCol);

		push();
		translate(w / 2, h / 2);
		fill(txtCol);
		if (i == 1) {
			textCircle(h * .36, h * .36, w * .14); //.14
		} else if (i == 2) {
			//			textCircle(h * .3, h * .3, w * .09);
		} else if (i == 3) {
			textCircle(h * .2, h * .2, w * .1); // .1
		} else if (i == 4) {
			//			textCircle(h * .12, h * .12, w * .05);
		}
		pop();
	}

	ctx.shadowColor = 'transparent';
	textSize(w * .033);
	textAlign(LEFT, TOP);
	textStyle(ITALIC);
	fill(0, 0, 88);

	const loffx = w * .15;
	const toffx = w * .015;
	const toffy = w * .015;

	push();
	translate(loffx, toffy);
	text(str1, 0, 0);
	pop();

	push();
	translate(w - toffx, w * .17);
	rotate(PI / 2);
	text(str2, 0, 0);
	pop();

	push();
	translate(w - loffx, h - toffy);
	rotate(PI);
	text(str1, 0, 0);
	pop();

	push();
	translate(toffy, h - w * .17);
	rotate(-PI / 2);
	text(str2, 0, 0);
	pop();

	/*
	heart: ♥️ Unicode: U+2665 U+FE0F, 
	club: ♣️ Unicode: U+2663 U+FE0F, 
	spade: ♠️ Unicode: U+2660 U+FE0F, 
	diamond: ♦️ Unicode: U+2666 U+FE0F, 
	*/
	textStyle(NORMAL);
	textSize(w * .1);
	textAlign(CENTER, CENTER);
	fill(50, 100, 100);
	text('\u2666', w * .07, h * .06); // diamond
	fill(0, 100, 100);
	text('\u2665', w - w * .07, h - h * .04); // heart
	fill(110, 100, 90);
	text('\u2663', w - w * .07, h * .06); // club
	fill(230, 100, 100);
	text('\u2660', w * .07, h - h * .04); // spade


	//	if (frameCount % 15 == 0) console.log(frameRate());
}

function textCircle(wi, hi, tsz) {
	textAlign(CENTER, CENTER);
	textStyle(ITALIC);
	for (let i = 0; i < msg.length; i++) {
		const x = .9 * cos(i * TWO_PI / msg.length - speed) * wi;
		const y = 1 * sin(i * TWO_PI / msg.length - speed) * hi;
		push();
		translate(x, y);
		const angle = atan2(y, x);
		rotate(PI / 2 + angle);
		textSize(tsz);
		text(msg[i], 0, 0);
		pop();
	}
}

function calcDimensionFromRatio(ratio) {
	const curRatio = windowWidth / windowHeight;
	let sz = createVector();
	if (curRatio > ratio) { // wide
		sz.y = windowHeight;
		sz.x = sz.y * ratio;
	} else { // tall
		sz.x = windowWidth;
		sz.y = sz.x * 1 / ratio;
	}
	return createVector(sz.x, sz.y);
}

function windowResized() {
	const dim = calcDimensionFromRatio(ratio);
	resizeCanvas(dim.x, dim.y);
	canvas.position((windowWidth - canvas.width) / 2, (windowHeight - canvas.height) / 2);
	w = width;
	h = height;
}

class Compound {
	constructor() {
		this.ct = createVector(); // center
		this.ctrW = 0;
		this.ctrH = 0;
	}

	setContourRect(cx, cy, w, h) {
		this.ct.x = cx;
		this.ct.y = cy;
		this.ctrW = w;
		this.ctrH = h;
	}

	display() {
		// for contour corner points
		const offx = this.ctrW * .1;
		const offy = this.ctrW * .1;

		beginShape();
		vertex(0, 0);
		vertex(width, 0);
		vertex(width, height);
		vertex(0, height);

		beginContour();

		vertex(this.ct.x - this.ctrW / 2, this.ct.y);
		bezierVertex(this.ct.x - this.ctrW / 2, this.ct.y + this.ctrH / 2 - offy, this.ct.x - this.ctrW / 2, this.ct.y + this.ctrH / 2 - offy, this.ct.x - this.ctrW / 2 + offx, this.ct.y + this.ctrH / 2 - offy);
		bezierVertex(this.ct.x - this.ctrW / 2 + offx, this.ct.y + this.ctrH / 2, this.ct.x - this.ctrW / 2 + offx, this.ct.y + this.ctrH / 2, this.ct.x, this.ct.y + this.ctrH / 2);
		bezierVertex(this.ct.x + this.ctrW / 2 - offx, this.ct.y + this.ctrH / 2, this.ct.x + this.ctrW / 2 - offx, this.ct.y + this.ctrH / 2, this.ct.x + this.ctrW / 2 - offx, this.ct.y + this.ctrH / 2 - offy);
		bezierVertex(this.ct.x + this.ctrW / 2, this.ct.y + this.ctrH / 2 - offy, this.ct.x + this.ctrW / 2, this.ct.y + this.ctrH / 2 - offy, this.ct.x + this.ctrW / 2, this.ct.y);
		bezierVertex(this.ct.x + this.ctrW / 2, this.ct.y - this.ctrH / 2 + offy, this.ct.x + this.ctrW / 2, this.ct.y - this.ctrH / 2 + offy, this.ct.x + this.ctrW / 2 - offx, this.ct.y - this.ctrH / 2 + offy);
		bezierVertex(this.ct.x + this.ctrW / 2 - offx, this.ct.y - this.ctrH / 2, this.ct.x + this.ctrW / 2 - offx, this.ct.y - this.ctrH / 2, this.ct.x, this.ct.y - this.ctrH / 2);
		bezierVertex(this.ct.x - this.ctrW / 2 + offx, this.ct.y - this.ctrH / 2, this.ct.x - this.ctrW / 2 + offx, this.ct.y - this.ctrH / 2, this.ct.x - this.ctrW / 2 + offx, this.ct.y - this.ctrH / 2 + offy);
		bezierVertex(this.ct.x - this.ctrW / 2, this.ct.y - this.ctrH / 2 + offy, this.ct.x - this.ctrW / 2, this.ct.y - this.ctrH / 2 + offy, this.ct.x - this.ctrW / 2, this.ct.y);

		endContour();

		endShape();
	}
}
