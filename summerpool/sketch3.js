/*
webgl mode에서 텍스트가 디스플레이 안되는 문제 발생 -> 일반 텍스트를 draw()에 그려주면 갑자기 모든 텍스트가 보인다?!?! 심지어는 3글자 이상이어야 함.
*/

let canvas;

let font;
let letters = [];
let msg = "abcdefghijklmnopqrstuvwxyz";

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
const boxes = [];
let bird;
let world, engine;
let mConstraint;

function preload() {
	font = loadFont("SpaceMono-Regular.ttf");
}

function setup() {
	canvas = createCanvas(500, 800, WEBGL);
	pixelDensity(displayDensity());
	w = width;
	h = height;

	engine = Engine.create();
	world = engine.world;

	boundaries[0] = new Ground(w / 2, h + 20, w, 40); // b
	boundaries[1] = new Ground(w / 2, -20, w, 40); // t
	boundaries[2] = new Ground(-20, h / 2, 40, h); // l
	boundaries[3] = new Ground(w + 20, h / 2, 40, h); // r

	textFont(font);
	textAlign(CENTER, CENTER);

	for (let i = 0; i < msg.length; i++) {
		letters[i] = new Letter(msg[i].toUpperCase(), w * .5, 50, 70);
	}

	const mouse = Mouse.create(canvas.elt);
	mouse.pixelRatio = displayDensity();
	const options = {
		mouse: mouse
	};
	mConstraint = MouseConstraint.create(engine, options);
	World.add(world, mConstraint);

	text('ab', -100, -100); // without plain text, 3d text don't show up

}

function draw() {
	translate(-w / 2, -h / 2, 0);
	//	orbitControl();
	//	background(0);
	clear();
	Engine.update(engine);

	for (let i = 0; i < letters.length; i++) {
		const l = letters[i];
		l.show();
	}

	fill(120);
	push(); // l
	translate(0, h / 2, 0);
	rotateY(PI / 2);
	plane(200, h);
	pop();
	push(); // t

	pop();

	text('mat', -100, -100); // without plain text, 3d text don't show up

}
