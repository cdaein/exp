let canvas;
let ctx;
let ratio;

const numShapes = 5;
let shps = [];

let loc;
let vel;
let acc;

let w, h; // substitute width and height

const msg = "straightdowntherabbithole";
const str1 = "down, down, down. would the fall never come to an end!";
const str2 = "down, down, down. there was nothing else to do, so alice soon began talking again.";

let bgCol;
let boxCol;
let txtCol;
let boxShaCol;
let txtShaCol;

function setup() {
	ratio = 5 / 7;
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

	textFont('moderno - fb');
	textFont('serif');
	textStyle(ITALIC);
	textAlign(LEFT, TOP);
	noStroke();

	loc = createVector(w / 2, h / 2);
	vel = createVector();
	acc = createVector();

	bgCol = color(0, 100, 100);
	boxCol = color(0, 0, 100);
	txtCol = color(0, 0, 0);
	boxShaCol = color(0, 0, 0, 60);
	txtShaCol = color(0, 0, 0, 20);
}

function draw() {
	background(bgCol);

	loc.set(mouseX, mouseY);
	//	acc.set(mouseX - w / 2, mouseY - h / 2);
	//	acc.set(rotationY, rotationX); // get accelerometer data; y/x inverted
	//	acc.normalize(); // only need direction
	//	vel.add(acc);
	//	vel.limit(10); // keep it slow, but low val has little sense of acc
	//	loc.add(vel);
	//	loc.x = constrain(loc.x, 0, w);
	//	loc.y = constrain(loc.y, 0, h);

	textCircle(h * .05, h * .05, w * .02);

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
		if (i == 0) fill(txtCol);
		shp.display();

		ctx.shadowColor = txtShaCol;
		ctx.shadowBlur = 4;
		ctx.shadowOffsetX = 20;
		ctx.shadowOffsetY = 20;
		fill(txtCol);

		push();
		translate(w / 2, h / 2);
		fill(txtCol);
		if (i == 1) {
			textCircle(h * .42, h * .42, w * .12);
		} else if (i == 2) {
			textCircle(h * .3, h * .3, w * .09);
		} else if (i == 3) {
			textCircle(h * .2, h * .2, w * .07);
		} else if (i == 4) {
			textCircle(h * .12, h * .12, w * .05);
		}
		pop();

	}

	ctx.shadowColor = 'transparent';
	textSize(w * .038);
	textAlign(LEFT, TOP);
	fill(0, 0, 88);

	push();
	translate(w * .09, w * .015);
	text(str1, w * .09, w * .015);
	pop();

	push();
	translate(w - w * .015, w * .085);
	rotate(PI / 2);
	text(str2, 0, 0);
	pop();

	push();
	translate(w - w * .09, h - w * .015);
	rotate(PI);
	text(str1, 0, 0);
	pop();

	push();
	translate(w * .015, h - w * .085);
	rotate(-PI / 2);
	text(str2, 0, 0);
	pop();

	ellipse(w * .035, w * .035, w * .01, w * .01);
	ellipse(w - w * .035, w * .035, w * .01, w * .01);
	ellipse(w - w * .035, h - w * .035, w * .01, w * .01);
	ellipse(w * .035, h - w * .035, w * .01, w * .01);

	//	if (frameCount % 15 == 0) console.log(frameRate());
}

function textCircle(wi, hi, tsz) {
	textAlign(CENTER, CENTER);
	for (let i = 0; i < msg.length; i++) {
		const x = cos(i * TWO_PI / msg.length - frameCount / 50) * wi;
		const y = sin(i * TWO_PI / msg.length - frameCount / 50) * hi;
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
		beginShape();
		vertex(0, 0);
		vertex(width, 0);
		vertex(width, height);
		vertex(0, height);

		beginContour();
		vertex(this.ct.x - this.ctrH / 2, this.ct.y - this.ctrH / 2);
		bezierVertex(this.ct.x - this.ctrW / 2, this.ct.y - this.ctrH / 2, this.ct.x - this.ctrW / 2, this.ct.y - this.ctrH / 2, this.ct.x - this.ctrW / 2, this.ct.y);
		bezierVertex(this.ct.x - this.ctrW / 2, this.ct.y + this.ctrH / 2, this.ct.x - this.ctrW / 2, this.ct.y + this.ctrH / 2, this.ct.x, this.ct.y + this.ctrH / 2);
		bezierVertex(this.ct.x + this.ctrW / 2, this.ct.y + this.ctrH / 2, this.ct.x + this.ctrW / 2, this.ct.y + this.ctrH / 2, this.ct.x + this.ctrW / 2, this.ct.y);
		bezierVertex(this.ct.x + this.ctrW / 2, this.ct.y - this.ctrH / 2, this.ct.x + this.ctrW / 2, this.ct.y - this.ctrH / 2, this.ct.x, this.ct.y - this.ctrH / 2);

		//		vertex(this.ct.x - this.ctrW / 2, this.ct.y - this.ctrH / 2);
		//		vertex(this.ct.x - this.ctrW / 2, this.ct.y + this.ctrH / 2);
		//		vertex(this.ct.x + this.ctrW / 2, this.ct.y + this.ctrH / 2);
		//		vertex(this.ct.x + this.ctrW / 2, this.ct.y - this.ctrH / 2);
		endContour();
		endShape();
	}
}
