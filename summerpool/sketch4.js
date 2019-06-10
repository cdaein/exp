let canvas;
let tileTexture;

let pg;

let font;
let letters = [];
let msg = "SUMMER";

const {
	Engine,
	World,
	Bodies,
	Mouse,
	MouseConstraint,
	Constraint
} = Matter;

let w, h;

let boundaries = [];
let world, engine;
let mConstraint;

function preload() {
	font = loadFont("SpaceMono-Regular.ttf");
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	pixelDensity(displayDensity());
	w = width;
	h = height;

	gl = this._renderer.GL;
	gl.disable(gl.DEPTH_TEST); // had too many problems with text, so treat it more like 2d layers.

	pg = createGraphics(w, h);
	pg.textFont(font);
	pg.textAlign(CENTER, CENTER);
	pg.clear();

	engine = Engine.create();
	world = engine.world;

	world.gravity.x = 0;
	world.gravity.y = 0;

	boundaries[0] = new Ground(w / 2, h + 20, w, 40); // b
	boundaries[1] = new Ground(w / 2, -20, w, 40); // t
	boundaries[2] = new Ground(-20, h / 2, 40, h); // l
	boundaries[3] = new Ground(w + 20, h / 2, 40, h); // r

	textFont(font);
	textAlign(CENTER, CENTER);

	for (let i = 0; i < msg.length; i++) {
		letters[i] = new Letter(msg[i].toUpperCase(), random(w), random(h), 200);
	}

	const mouse = Mouse.create(canvas.elt);
	mouse.pixelRatio = displayDensity();
	const options = {
		mouse: mouse,
		constrain: {
			stiffness: .2
		}
	};
	mConstraint = MouseConstraint.create(engine, options);
	World.add(world, mConstraint);
	textureMode(NORMAL);
	textureWrap(REPEAT);
	tileTexture = createGraphics(64, 64);
	tileTexture.background(0, 255, 0);
	tileTexture.noStroke();
	tileTexture.fill(20, 200, 100);
	tileTexture.rect(2, 2, 60, 60);
}

function draw() {
	//	orbitControl();
	translate(-w / 2, -h / 2, 0);
	pg.clear();
	clear();
	//	background(0, 50, 0);
	Engine.update(engine);
	world.gravity.x = cos(frameCount / 30) * .03;
	world.gravity.y = sin(frameCount / 30) * .03;
	//	const dir = noise(frameCount / 60) - .5;
	//	world.gravity.x = dir * .2;
	//	world.gravity.y = dir * .2;

	//	lights();

	drawPool(300);


	//	for (let i = 0; i < letters.length; i++) {
	//		const l = letters[i];
	//		l.setColor(color(0, 50, 0, 30));
	//		l.show();
	//	}
	//
	//	push();
	//	translate(0, 0, -300);
	//	image(pg, 0, 0);
	//	pop();

	for (let i = 0; i < letters.length; i++) {
		const l = letters[i];
		l.setColor(color(255));
		l.show();
	}

	image(pg, 0, 0);


	text('mat', -200, -200); // !!!

	//	console.log(frameRate());
}

function drawPool(zd) {
	texture(tileTexture);
	push(); // l
	rotateY(PI / 2);
	beginShape();
	vertex(0, 0, 0, 0);
	vertex(zd, 0, 10, 0);
	vertex(zd, h, 10, 10);
	vertex(0, h, 0, 10);
	endShape();
	pop();

	push(); // t
	rotateX(-PI / 2);
	beginShape();
	vertex(0, 0, 0, 0);
	vertex(w, 0, 10, 0);
	vertex(w, zd, 10, 10);
	vertex(0, zd, 0, 10);
	endShape();
	pop();

	push(); // r
	translate(w, 0);
	rotateY(PI / 2);
	beginShape();
	vertex(0, 0, 0, 0);
	vertex(zd, 0, 10, 0);
	vertex(zd, h, 10, 10);
	vertex(0, h, 0, 10);
	endShape();
	pop();

	push(); // b
	translate(0, h);
	rotateX(-PI / 2);
	beginShape();
	vertex(0, 0, 0, 0);
	vertex(w, 0, 10, 0);
	vertex(w, zd, 10, 10);
	vertex(0, zd, 0, 10);
	endShape();
	pop();

	push();
	translate(0, 0, -zd);
	beginShape();
	vertex(0, 0, 0, 0);
	vertex(w, 0, 10, 0);
	vertex(w, h, 10, 10);
	vertex(0, h, 0, 10);
	endShape();
	pop();

	//	texture();
}
