#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
	//---------- move things around
	// First, create a few object (text, graphics) on a page.
//	var sel = b.selections(); // store all the selected objects
//	for (var i = 0; i < sel.length; i++) {
//		var posX = b.random( b.width-100 ); // random value for x
//		var posY = b.random( b.height-100 ); // random value for y
//		b.itemPosition(sel[i], posX, posY); // set new position
//		b.typo(sel[i], "pointSize", b.random(12, 120)); // set text
//	}
	
	//---------- grid (1 dimensional)
//	b.addPage();
//	var h = 30; // height for each
//	for (var y = 0; y < b.height; y += h) {
//		b.noStroke();
//		b.fill(b.map(y, 0, b.height, 0, 255)); // color gradient
//		b.rect(0, y, b.width, h);
//	}
	
	//---------- grid (2 dimensional)
//	b.addPage();
//	var inc = 60;
//	for (var y = 0; y < b.height; y += inc) {
//		for (var x = 0; x < b.width; x += inc) {
//			b.stroke(0);
//			b.noFill();
//			b.ellipse(x, y, inc*2, inc*2);
//		}
//	}
	
	//---------- 	save as PDF; save InDesign file first!
//	b.savePDF("export.pdf"); // quick export
//	b.savePDF("export.pdf", true); // access export dialog
	
}

b.go(); // runs the script.