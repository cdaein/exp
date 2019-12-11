/************************************************************ device orientation test **********/
let permissionGranted = false;
let nonios13device = false;
let permissionModal;
let rotationX = 0;
let rotationY = 0; // for device orientation event

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

/********************************************************************** main sketch **********/
let item; // converted from svg file to paperjs item
let happy; // item child 'happy holidays...' text
let ratio; // (width / height) of artwork
let mouse; // mouse position

paper.install(window); // make paper global scope
window.onload = function () {
	const canvas = document.querySelector('#canvas');
	paper.setup(canvas);

	window.addEventListener('deviceorientation', function (e) {
		rotationX = e.gamma;
		rotationY = e.beta;
	});

	project.importSVG("happyholiday-final-outlined.svg", svgLoaded);

	// call back when external SVG is loaded params(converted item, original svg)
	function svgLoaded(i, s) {
		item = i; // pass as global object
		ratio = item.bounds.width / item.bounds.height;
		setupCanvas();

		// default style; will be overridden later
		item.style = {
			fillColor: {
				hue: 50,
				saturation: 0.6,
				brightness: 0.6
			}
		};
		// big text element
		happy = item.children['happy']
		happy.style = {
			fillColor: {
				gradient: {
//					stops: [['lightgreen', 0], ['lightgreen', 0.1], ['darkorange', 0.9], ['darkorange', 1]]
					stops: [['lightgreen', 0], ['darkorange', 1]]

				},
				origin: happy.bounds.topCenter,
				destination: happy.bounds.bottomCenter
			},
		};
	}

	//	let debug = new PointText([50, 50]);
	//	debug.fillColor = 'yellow';
	//	debug.fontSize = 24;
	//	debug.content = 'debugging';

	/************************************************ onFrame event handler **********/
	let prevRot = new Point(); // to reset transformation each frame. haven't found equivalent to pushMatrix().
	view.onFrame = function (event) {
		if (!item) return; // async svg loading

		const count = event.time * 30; // event.time is in seconds

		let rot = new Point([rotationX, rotationY]);
		rot.x = clamp(rot.x, -30, 30);
		rot.y = clamp(rot.y, -30, 30);

		const happyRotFactor = 0.1;
		// happy.translate([(rot.x - prevRot.x) * happyRotFactor, (rot.y - prevRot.y) * happyRotFactor]); // reset previously applied transform before adding new one.

		const perGroup = 10; // how many children per group?
		const inc = 0.01; // how much translate per group?
		for (let i = item.children.length - 1; i >= 0; i--) {
			const g = item.children[i];
			const gFactor = Math.floor((item.children.length - i) / perGroup) * inc;
			if (g.name) continue; // don't move the named children.
			if (i == 0) continue; // don't move first one, which i THINK is all-containing shape.
			g.translate([(rot.x - prevRot.x) * gFactor, (rot.y - prevRot.y) * gFactor]);
		}

		prevRot = rot.clone(); // apply AFTER all translation!! reference to current rot value for resetting
		//		debug.content = `${Math.floor(rot.x)}\n${Math.floor(rot.y)}\n${Math.floor(prevRot.x)}\n${Math.floor(prevRot.y)}`;

		for (let i = 0; i < item.children.length; i++) {
			const g = item.children[i];
			if (i !== 1) {
				//			g.fillColor.hue = 50 + Math.sin(i + event.count/10)*30;
				g.fillColor.saturation = 0.6 + Math.cos(i + count / 10) * 0.2;
				g.fillColor.brightness = 0.5 + Math.cos(i + count / 8) * 0.2;
			}
		}
		// named children of item
		item.children['peace'].fillColor = '#d4af37';
		item.children['newyear'].fillColor = '#d4af37';
		item.children['frame'].fillColor = '#d4af37';

		mouse = new Point(rotationX, rotationY);
		mouse.x = map(mouse.x, -20, 20, happy.bounds.left, happy.bounds.right);
		mouse.y = map(mouse.y, -20, 20, 0, happy.bounds.bottom);

		/********** gradient animation **********/
		// define start; end mirrors start from center
		const start = clamp(mouse.x, happy.bounds.left, happy.bounds.right);
		const end = happy.bounds.center.x + (happy.bounds.center.x - start);

		const col = happy.fillColor;
		col.origin = [start, happy.bounds.top];
		col.destination = [end, happy.bounds.bottom];
		
		col.gradient.stops[0].color.hue = 120 + (40 + Math.cos(count/20) * 40); // lightgreen 120
		col.gradient.stops[1].color.hue = 35 + (40 + Math.cos(count/20) * 40); // orange 40
		
//		for (let i = 0; i < col.gradient.stops.length; i++) {
//			col.gradient.stops[i].color.hue += 1;
//		}
	}
}

/****************************************** boring setup stuff **********/
function setupCanvas() {
	// recalc window dimension when window resized
	const w = window.innerWidth;
	const h = window.innerHeight;
	const dim = calcDimensionFromRatio(ratio);
	// set canvas size according to artwork ratio
	view.viewSize.set(dim.x, dim.y);
	canvas.width = dim.x;
	canvas.height = dim.y;
	// move canvas to center of window (css absolute positioning)
	canvas.style.left = (w - canvas.width) / 2 + "px";
	canvas.style.top = (h - canvas.height) / 2 + "px";
	// resize artwork to fit canvas
	item.bounds.width = canvas.width;
	item.bounds.height = canvas.height;
}

function calcDimensionFromRatio(ratio) {
	const curRatio = window.innerWidth / window.innerHeight;
	const sz = {
		x: 0,
		y: 0
	};
	if (curRatio > ratio) { // wide
		sz.y = window.innerHeight;
		sz.x = sz.y * ratio;
	} else { // tall
		sz.x = window.innerWidth;
		sz.y = sz.x * 1 / ratio;
	}
	return {
		x: sz.x,
		y: sz.y
	};
}

window.onresize = function (event) {
	setupCanvas();
}

/********************************************************************** utils **********/
function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

function map(value, start1, stop1, start2, stop2) {
	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function lerp(start, stop, amt) {
	return start + (stop - start) * amt;
}
