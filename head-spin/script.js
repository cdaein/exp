/***************************************** device orientation test **********/
let permissionGranted = false;
let nonios13device = false;
let permissionModal;
let rotation = {
	x: 0,
	y: 0
}; // for device orientation event
let mouse = {
	x: 0,
	y: 0
};


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

window.addEventListener('deviceorientation', function (e) {
	rotation.x = e.gamma;
	rotation.y = e.beta;
});

import Sequencer from './sequencer/sequencer.js'

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

const s = Sequencer.make({
	canvas,
	from: 'img/head_00.jpg',
	to: 'img/head_21.jpg',
	scaleMode: 'contain',
	playMode: 'none'
});
s.size(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
	s.size(window.innerWidth, window.innerHeight);
})

window.addEventListener('mousemove', (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

//		console.log(s);


ctx.font = "120px Helvetica";

let i = 0;

function animate() {
	let fr;

	if (nonios13device) {
		fr = Math.floor(map(mouse.x, window.innerWidth, 0, 0, s.images.length));
	} else {
		fr = Math.floor(map(rotation.x, 45, -45, 0, s.images.length));
	}
	fr = clamp(fr, 0, s.images.length);
	fr = (fr + Math.floor(s.images.length / 2)) % s.images.length;
	s.drawImage(fr);

	ctx.strokeStyle = 'white';
	ctx.lineWidth = 3;
	ctx.textAlign = 'center';
	const xpos = map(mouse.x, 0, window.innerWidth, window.innerWidth/4*3, window.innerWidth/4);
	ctx.strokeText("FACE", xpos, window.innerHeight - 100);


	requestAnimationFrame(animate);
}
animate();

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
