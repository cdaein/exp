let font;
let fontData;
let l;

let shp;

const msg = "SUMMER";

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
	fontData = loadBytes("SpaceMono-Regular.ttf");
}

function setup() {
	const canvas = createCanvas(500, 800, WEBGL);
	w = width;
	h = height;
	pixelDensity(displayDensity());

	font = opentype.parse(fontData.bytes.buffer);

	//	font = loadFont('SpaceMono-Regular.ttf');
	//	textFont(font);
	//	textSize(64);
	//	textAlign(CENTER, CENTER);

	//	console.log(textWidth('abc'));

	engine = Engine.create();
	world = engine.world;
	boundaries[0] = new Ground(w / 2, h + 20, w, 40); // b
	boundaries[1] = new Ground(w / 2, -20, w, 40); // t
	boundaries[2] = new Ground(-20, h / 2, 40, h); // l
	boundaries[3] = new Ground(w + 20, h / 2, 40, h); // r

	//	l = new Letter('M', 100, 100, 60);

	shp = new Shape('SUMMER', 200, 200, 0);

	for (let i = 0; i < 3; i++) {
		boxes[i] = new Box(450, 300 - i * 100, 100, 100);
	}
	bird = new Bird(50, 300, 50);

	const mouse = Mouse.create(canvas.elt);
	mouse.pixelRatio = displayDensity();
	const options = {
		mouse: mouse
	};
	mConstraint = MouseConstraint.create(engine, options);
	World.add(world, mConstraint);
}

function draw() {
	translate(-w / 2, -h / 2, 0);
	background(0);
	Engine.update(engine);

	//	l.show();

	shp.display();

	for (let i = 0; i < boxes.length; i++) {
		boxes[i].show();
	}
	bird.show();

	console.log(frameRate());

}
