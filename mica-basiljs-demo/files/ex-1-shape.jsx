#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
	//---------- document and pages
//	b.doc(); // creates a new document if nothing is open.
//	b.addPage(); // add a new page
//	b.removePage(); // remove current page
//  b.addPage();

  //---------- set units
//  b.units(b.PT);
//  b.units(b.MM);
//  b.units(b.PX);
	
	//---------- drawing rectangle
//	b.page(1); // select page 1
//	b.clear( b.page(1) ); // clear any contents from page 1
//	b.fill(255, 0, 0); // set fill color in RGB (0~255)
//	b.stroke(100, 0, 0, 0); // set stroke color in CMYK (0~100)
//	b.strokeWeight(10); // set stroke weight
//	b.rect(100, 100, 300, 300); // draw a rectangle
	
	//---------- drawing ellipse
//	b.page(2); // select page 2
//	b.clear( b.page(2) );
//	b.fill(255, 255, 0);
//	b.noStroke();
//	b.ellipse(100, 100, 300, 300);
//	b.fill(0, 0, 100, 0);
//	b.stroke(0, 100, 0, 0);
//	b.ellipseMode(b.CORNER);
//	b.ellipse(100, 100, 300, 300);
	
	//---------- drawing line
//	b.addPage();
//	b.stroke(255, 0, 0);
//	b.line(0, 0, b.width, b.height);
	
	//---------- setting the background
//	b.addPage();
//	b.noStroke();
//	b.fill(0);
//	b.rect(0, 0, b.width, b.height);
//	b.fill(255);
//	b.ellipse(b.width/2, b.height/2, 50, 50);
	
	//---------- more on color
//	b.addPage();
//	var lightBlue = b.color(60, 180, 255); // store color in variable
//	b.noStroke();
//	b.fill( lightBlue ); // set color using variable name
//	b.rect(0, 0, b.width, 50);
//	var myOrange = b.color(0, 44, 100, 0, "myOrange"); // store color in Swatches panel
//	b.fill( "myOrange" ); // set color from document Swatches
//	b.ellipseMode(b.CENTER);
//	b.ellipse(b.width/2, b.height/2, 100, 100);

}

b.go(); // runs the script.