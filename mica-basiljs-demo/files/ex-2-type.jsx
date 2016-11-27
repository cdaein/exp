#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
//	b.doc(); // creates a new document if nothing is open.
//	b.addPage(); // add a new page

	//---------- writing some text
//	b.addPage();
//	b.fill(0);
//	b.text("Basil.js", 100, 100, 200, 200); // set text, position, size of text frame
	
	//---------- type attributes
//	b.addPage();
//	b.textFont("Optima", "Regular"); // set font
//	b.textSize(48); // set font size
//	b.text("Hello", 50, 50, 400, 200);
//	b.textAlign(Justification.CENTER_ALIGN);
//	b.text("centered", 0, b.height/2, b.width, 100);
	
	//---------- increase text size for every word
//	b.addPage();
//	b.textAlign(Justification.LEFT_ALIGN);
//	var myText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue est eu orci rutrum euismod. Sed ante mi, faucibus id metus non, interdum dictum elit. Morbi feugiat elit lectus, quis interdum nisl finibus quis. Etiam pretium fermentum ligula nec pretium. Donec sit amet maximus dui. Fusce gravida nisl quis neque rhoncus porttitor. Nullam sit amet facilisis neque. Donec iaculis hendrerit ipsum. Aliquam malesuada dolor eu metus vestibulum luctus.";
//	var myTextFrame = b.text(myText, 0, 0, b.width, b.height); // set text in a frame
//	b.words(myTextFrame, function(word, index) {
//		b.typo(word, "pointSize", 2+index); // for every word, increase text size
//	});
	
	//---------- use random font for every character
//	b.addPage();
//	b.textSize(48);
//	var myText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue est eu orci rutrum euismod. Sed ante mi, faucibus id metus non.";
//	var myTextFrame = b.text(myText, 0, 0, b.width, b.height);
//	var fonts = app.fonts // store all the fonts
//	b.characters(myTextFrame, function(cha, index) {
//		b.typo(cha, "appliedFont", fonts[b.floor(b.random(fonts.length))]);
//	});
	
}

b.go(); // runs the script.