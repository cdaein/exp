/* interactive version */

let w, h;
let font;
let fontData;
let glyphs = [];

let gIndex = 0;
const glyphTable = 'deepressed';

let canvas;
let ctx;


function preload() {
	fontData = loadBytes("SpaceMono-Regular.ttf");

}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	pixelDensity(1);
	w = width;
	h = height;
	noStroke();
	perspective(PI / 3., width / height, 0.1, 10000);

	font = opentype.parse(fontData.bytes.buffer);

	/***************************************** device orientation test **********/
	createPermissionModal(); // hidden by default
	let permissionGranted = false;
	let nonios13device = false;
	let permissionModal;
//	let rotationX = 0;
//	let rotationY = 0; // for device orientation event

	if (typeof (DeviceOrientationEvent) !== 'undefined' && typeof (DeviceOrientationEvent.requestPermission) === 'function') {
		DeviceOrientationEvent.requestPermission()
			.catch(() => {
				// show permission dialog only the first time
				permissionModal = document.querySelector('.permission-modal-container');
				permissionModal.style.display = 'block';

				const cancelButton = document.querySelector('#button-cancel');
				cancelButton.addEventListener('click', function () {
					permissionModal.remove();
				})
				const allowButton = document.querySelector('#button-allow');
				allowButton.addEventListener('click', onAskButtonClicked);

				throw error; // keep the promise chain as rejected
			})
			.then(() => {
				// this runs on subsequent visits
				permissionGranted = true;
			})
	} else {
		// it's up to you how to handle non ios 13 devices
		nonios13device = true;
		console.log('non iOS 13 device is being used.');
	}

	// will handle first time visiting to grant access
	function onAskButtonClicked() {
		permissionModal.remove();
		DeviceOrientationEvent.requestPermission().then(response => {
			if (response === 'granted') {
				permissionGranted = true;
			} else {
				permissionGranted = false;
			}
		}).catch(console.error);
	}
}

function draw() {
	clear();
	//	orbitControl();
	translate(0, 0, 500);

	const rx = constrain(map(rotationX, PI / 2, -PI / 2, -PI * .01, PI * .01), -PI / 9, PI / 9);
	const ry = constrain(map(rotationY, -PI / 2, PI / 2, -PI * .01, PI * .01), -PI / 9, PI / 9);
	rotateX(rx);
	rotateY(ry);

	const numTunnels = 30;
	for (let i = 0; i < numTunnels; i++) {
		fill(250 - i * 10);
		tunnelUnit(300 - i * 200, 200);
	}

	for (let i = 0; i < glyphs.length; i++) {
		let g = glyphs[i];
		g.fall(-18);
		g.display();
		if (g.loc.z < -5000) {
			glyphs.splice(i, 1);
		}
	}
}

function mousePressed() {
	const ch = glyphTable[int(gIndex++ % glyphTable.length)];
	let gly = new Glyph(ch, (mouseX - width / 2) * .6, (mouseY - height / 2) * .6, 200);
	glyphs.push(gly);
}

class Glyph {
	constructor(gly, x, y, z) {
		this.fsize = min(width, height) * .8;
		this.path = font.getPath(gly, 0, 0, this.fsize); // font size 512
		this.commands = this.path.commands;
		this.jamos = []; // all jamos from a single glyph
		let ja; // each jamo
		// console.log(this.commands);
		for (let i = 0; i < this.commands.length; i++) {
			const c = this.commands[i];
			if (c.type === 'M') {
				ja = [];
				ja.push(c);
			} else if (c.type === 'L') {
				ja.push(c);
			} else if (c.type === 'C') {
				ja.push(c);
			} else if (c.type === 'Q') {
				ja.push(c);
			} else if (c.type === 'Z') {
				ja.push(c);
				this.jamos.push(ja);
			}
		}

		this.loc = createVector(x, y, z);
		this.xRot = 0;
		this.yRot = 0;
		this.xRotInc = random(-.01, 0.01);
		this.yRotInc = random(-.01, 0.01);
	}

	showJamoAt(idx) {
		let ja = this.jamos[idx];

		for (let i = 0; i < ja.length; i++) {
			const c = ja[i];
			let xoff, yoff;
			if (c.type === 'M') {
				push();
				beginShape();
				vertex(c.x, c.y);
			} else if (c.type === 'L') {
				vertex(c.x, c.y);
			} else if (c.type === 'C') {
				bezierVertex(c.x1, c.y1, c.x2, c.y2, c.x, c.y);
			} else if (c.type === 'Q') {
				quadraticVertex(c.x1, c.y1, c.x, c.y);
			} else if (c.type === 'Z') {
				endShape(CLOSE);
				pop();
			}
		}
	}

	fall(speed) {
		this.loc.z += speed;
		this.xRot += this.xRotInc;
		this.yRot += this.yRotInc;
	}

	display() {
		push();
		translate(this.loc.x, this.loc.y, this.loc.z);
		rotateX(this.xRot);
		rotateY(this.yRot);
		fill(255 + this.loc.z * .05, 150 + this.loc.z * .05, 200 + this.loc.z * .05);
		translate(-this.fsize / 4, this.fsize / 4, 0);
		for (let i = 0; i < this.jamos.length; i++) {
			this.showJamoAt(i);
		}
		pop();
	}
}


function tunnelUnit(zpos, depth) {
	push();

	translate(0, 0, zpos);
	// scale(1.2);
	// rotate(zpos * .001);

	push(); // l
	translate(-w / 2, -h / 2, 0);
	rotateY(PI / 2);
	rect(0, 0, depth, h);
	pop();

	push(); // t
	translate(-w / 2, -h / 2, 0);
	rotateX(-PI / 2);
	rect(0, 0, w, depth);
	pop();

	push(); // r
	translate(w / 2, -h / 2, 0);
	rotateY(PI / 2);
	rect(0, 0, depth, h);
	pop();

	push(); // b
	translate(-w / 2, h / 2, 0);
	rotateX(-PI / 2);
	rect(0, 0, w, depth);
	pop();

	pop();
}
