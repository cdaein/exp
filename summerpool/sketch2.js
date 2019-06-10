/*
opentype에서 변환한 텍스트를 matterjs에서 물리엔진에 적용시켰으나 p5js로 그래픽을 보여주는 부분에서 막혔다.
*/

let font;
let fontData;
let l;

let shapes = [];
const msg = "SUMMER";

const {
	Engine,
	World,
	Bodies,
	Mouse,
	MouseConstraint,
	Constraint,
	Render,
	Svg
} = Matter;

let w, h;

let boundaries = [];
const boxes = [];
let bird;
let world, engine;
let mConstraint;

function preload() {
	fontData = loadBytes("SpaceMono-Regular.ttf");
}

function setup() {
	createCanvas(500, 800, WEBGL);
	pixelDensity(displayDensity());
	w = width;
	h = height;

	font = opentype.parse(fontData.bytes.buffer);

	engine = Engine.create();
	world = engine.world;

	boundaries[0] = new Ground(w / 2, h + 20, w, 40); // b
	boundaries[1] = new Ground(w / 2, -20, w, 40); // t
	boundaries[2] = new Ground(-20, h / 2, 40, h); // l
	boundaries[3] = new Ground(w + 20, h / 2, 40, h); // r

	//	for (let i = 0; i < msg.length; i++) {
	//		shapes[i] = new Shape(msg[i], 50 + i * 80, 100 + i * 80, 0);
	//	}

	//	const mouse = Mouse.create(canvas.elt);
	//	mouse.pixelRatio = displayDensity();
	//	const options = {
	//		mouse: mouse
	//	};
	//	mConstraint = MouseConstraint.create(engine, options);
	//	World.add(world, mConstraint);
}

function draw() {
	translate(-w / 2, -h / 2, 0);
	clear();
	Engine.update(engine);

	for (let i = 0; i < shapes.length; i++) {
		let shp = shapes[i];
		shp.show();
	}
	//	console.log(frameRate());

}
