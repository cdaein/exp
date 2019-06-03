let canvas;
let ctx;

const numShapes = 5;
let shps = [];

let loc;
let vel;
let acc;

function setup() {
	// 1080 x 1920 = 540 x 960 = 390 x 640
	canvas = createCanvas(500, 700);
	colorMode(HSB, 360, 100, 100, 100);

	ctx = canvas.drawingContext;

	for (i = 0; i < numShapes; i++) {
		shps[i] = new Compound();
	}

	//	textFont('Oranienbaum');
	//	textFont('Playfair Display');
	//	textFont('Prata');
	//	textFont('Suranna');
	//	textFont('Italiana');
	//	textFont('ratiomodern');
	textFont('moderno-fb');

	loc = createVector(width / 2, height / 2);
	vel = createVector();
	acc = createVector();
}

function draw() {
	const bgCol = color(0, 100, 100);
	const txtCol = color(0, 0, 0);
	const boxShaCol = color(0, 0, 0, 60);
	const txtShaCol = color(0, 0, 0, 40);

	//	background(157, 84, 80);
	background(bgCol);

	noStroke();
	textAlign(CENTER, CENTER);

	const w = width - width / 8;
	const h = height - width / 8;

	//	acc.set(mouseX - width / 2, mouseY - height / 2);
	acc.set(rotationY, rotationX); // get accelerometer data; y/x inverted
	//	acc.normalize(); // only need direction
	vel.add(acc);
	vel.limit(4); // keep it slow, but low val has little sense of acc
	loc.add(vel);
	loc.x = constrain(loc.x, 0, width);
	loc.y = constrain(loc.y, 0, height);

	for (i = numShapes - 1; i >= 0; i--) {
		const lx = lerp(width / 2, loc.x, i / numShapes);
		const ly = lerp(height / 2, loc.y, i / numShapes);
		const ctr = createVector(lx, ly);
		let shp = shps[i];
		shp.setContourRect(ctr.x, ctr.y, w - i * width / 7, h - i * width / 7);
		fill(0, 0, 100);
		if (i == 0) fill(0, 0, 0);

		ctx.shadowColor = boxShaCol;
		ctx.shadowBlur = 30;
		ctx.shadowOffsetX = 5;
		ctx.shadowOffsetY = 5;
		shp.display();

		ctx.shadowColor = txtShaCol;
		ctx.shadowBlur = 10;
		ctx.shadowOffsetX = 20;
		ctx.shadowOffsetY = 20;

		fill(txtCol);
		textSize(width * .4);
		if (i == 1) {
			textStyle(NORMAL);
			text("We", width / 2, 80);
		} else if (i == 2) {
			textStyle(ITALIC);
			text("Shose", width / 2, 260);
		} else if (i == 3) {
			text("this", width / 2, 480);
		} else if (i == 4) {
			text("life", width / 2, 700)
		} else if (i == 5) {
			textSize(48);
			text("hello there", 200, 400);
		}
	}

	ctx.shadowColor = 'transparent';
	const str = "hello, there? how are you today? how are you feeling? everything ok?";
	textSize(width / 20);
	textAlign(LEFT, TOP);
	fill(0, 0, 100);
	text(str, 0, 0);

	//	if (frameCount % 30 == 0) console.log(frameRate());
}

class Compound {
	constructor() {
		this.center = createVector();
		this.contourW = 0;
		this.contourH = 0;
	}

	setContourRect(cx, cy, w, h) {
		this.center.x = cx;
		this.center.y = cy;
		this.contourW = w;
		this.contourH = h;
	}

	display() {
		beginShape();
		vertex(0, 0);
		vertex(width, 0);
		vertex(width, height);
		vertex(0, height);
		beginContour();
		vertex(this.center.x - this.contourW / 2, this.center.y - this.contourH / 2);
		vertex(this.center.x - this.contourW / 2, this.center.y + this.contourH / 2);
		vertex(this.center.x + this.contourW / 2, this.center.y + this.contourH / 2);
		vertex(this.center.x + this.contourW / 2, this.center.y - this.contourH / 2);
		endContour();
		endShape();
	}
}
