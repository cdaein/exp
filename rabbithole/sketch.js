let canvas;
let ctx;
let ratio;

const numShapes = 6;
let shps = [];

let loc;
let tloc;

let w, h; // substitute width and height

const msg = "straightdowntherabbithole";
const str1 = "down, down, down. would the fall never come to an end!";
const str2 = "down, down, down. there was nothing else to do, so alice soon began talking again.";

let bgCol;
let boxCol;
let boxCols = [];
let txtCol;
let boxShaCol;
let txtShaCol;

let speed;
let totalFrames;


function setup() {
	ratio = 5 / 8;
	const dim = calcDimensionFromRatio(ratio);
	// 1080 x 1920 = 540 x 960 = 390 x 640
	canvas = createCanvas(dim.x, dim.y);
	canvas.position((windowWidth - canvas.width) / 2, (windowHeight - canvas.height) / 2);
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

	bgCol = color(210, 100, 70);
	boxCol = color(0, 0, 100);
	boxCols[0] = color(0, 0, 0);
	//	boxCols[1] = color(310, 70, 100);
	//	boxCols[2] = color(120, 65, 95);
	//	boxCols[3] = color(0, 0, 100);
	//	boxCols[4] = color(310, 50, 100);
	boxCols[1] = color(355, 70, 95);
	boxCols[2] = color(120, 50, 95);
	boxCols[3] = color(0, 0, 92);
	boxCols[4] = color(60, 90, 95);
	boxCols[5] = color(0, 0, 100);

	txtCol = color(0, 0, 0);
	boxShaCol = color(0, 0, 0, 70);
	txtShaCol = color(0, 0, 0, 30);

	totalFrames = 30 * 12; // 12 seconds at 30fps
}

function draw() {
	background(bgCol);
	noStroke();


	fill(50, 30, 40);
	let rnum = 0;
	for (let j = 0; j < h; j += h / 20) {
		for (let i = 0; i < w; i += w / 10) {
			if (rnum % 2 == 0) ellipse(i, j, 20, 20);
			else ellipse(i + w / 20, j, 20, 20);
		}
		rnum++;
	}

	speed = frameCount / totalFrames * TWO_PI;

	if (mouseIsPressed) {
		tloc.x = mouseX;
		tloc.y = mouseY;
	} else {
		// for mobile
		tloc.x = w / 2 + constrain(map(rotationY, -30, 30, -w / 2, w / 2), -w / 2, w / 2);
		tloc.y = h / 2 + constrain(map(rotationX, -30, 30, -h / 2, h / 2), -h / 2, h / 2);
	}
	loc.x = lerp(loc.x, tloc.x, .1);
	loc.y = lerp(loc.y, tloc.y, .1);


	ctx.shadowColor = txtShaCol;
	ctx.shadowBlur = w * .02;
	ctx.shadowOffsetX = (w / 2 - loc.x) * .5;
	ctx.shadowOffsetY = (h / 2 - loc.y) * .5;
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
		shp.setContourRect(lx, ly, bw - (i * w * .13), bh - (i * h * .13));

		ctx.shadowColor = boxShaCol;
		ctx.shadowBlur = w * .1;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		//		fill(boxCol);
		fill(90 + i * 20, i * 20, 100 - i * 6);
		//		fill(boxCols[i]);
		//		if (i == 0) fill(txtCol);
		shp.display();

		ctx.shadowColor = txtShaCol;
		ctx.shadowBlur = w * .02;
		ctx.shadowOffsetX = (w / 2 - loc.x) * .35;
		ctx.shadowOffsetY = (h / 2 - loc.y) * .35;
		fill(txtCol);

		push();
		translate(w / 2, h / 2);
		fill(txtCol);
		if (i == 1) {
			textCircle(h * .36, h * .36, w * .16); //.14
		} else if (i == 3) {
			textCircle(h * .2, h * .2, w * .1); // .1
		}
		pop();
	}

	ctx.shadowColor = 'transparent';

	textSize(w * .033);
	textAlign(CENTER, TOP);
	textStyle(ITALIC);
	fill(50, 20, 70);

	const toffx = w * .013;
	const toffy = w * .013;

	push();
	translate(w * .5, toffy);
	text(str1, 0, 0);
	pop();

	push();
	translate(w - toffx, h * .5);
	rotate(PI / 2);
	text(str2, 0, 0);
	pop();

	push();
	translate(w * .5, h - toffy);
	rotate(PI);
	text(str1, 0, 0);
	pop();

	push();
	translate(toffy, h * .5);
	rotate(-PI / 2);
	text(str2, 0, 0);
	pop();

	stroke(50, 20, 70);
	line(w * .15, h * .032, w - w * .15, h * .032); // t
	line(w * .952, h * .18, w * .952, h - h * .18); // r
	line(w * .15, h - h * .032, w - w * .15, h - h * .032); // b
	line(w - w * .952, h * .18, w - w * .952, h - h * .18); // l


	/*
	heart: ♥️ Unicode: U+2665 U+FE0F, 
	club: ♣️ Unicode: U+2663 U+FE0F, 
	spade: ♠️ Unicode: U+2660 U+FE0F, 
	diamond: ♦️ Unicode: U+2666 U+FE0F, 
	*/
	textStyle(NORMAL);
	textSize(w * .1);
	textAlign(CENTER, CENTER);
	//	fill(50, 80, 95);
	fill(50, 50, 60);
	text('\u2666', w * .06, h * .06); // diamond
	//	fill(0, 90, 90);
	text('\u2665', w - w * .06, h - h * .04); // heart
	//	fill(110, 75, 90);
	text('\u2663', w - w * .06, h * .06); // club
	//	fill(230, 85, 90);
	text('\u2660', w * .06, h - h * .04); // spade

	//	if (frameCount % 15 == 0) console.log(frameRate());
}

function textCircle(wi, hi, tsz) {
	textAlign(CENTER, CENTER);
	textStyle(ITALIC);
	for (let i = 0; i < msg.length; i++) {
		const x = .7 * cos(i * TWO_PI / msg.length - speed) * wi;
		const y = 1.2 * sin(i * TWO_PI / msg.length - speed) * hi;
		push();
		translate(x, y);
		const angle = atan2(y, x);
		rotate(PI / 2 + angle);
		textSize(tsz);
		text(msg[(i + floor(tsz)) % msg.length], 0, 0);
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
