/*
Copyright 2016 Google Inc. All Rights Reserved.

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
*/

var w,h,font,fontData,glyphs=[],gIndex=0,glyphTable="deepressed",canvas,ctx;function preload(){fontData=loadBytes("SpaceMono-Regular.ttf")}function setup(){canvas=createCanvas(windowWidth,windowHeight,WEBGL);pixelDensity(1);w=width;h=height;noStroke();perspective(PI/3,width/height,.1,1E4);font=opentype.parse(fontData.bytes.buffer)}
function draw(){clear();translate(0,0,500);var a=constrain(map(rotationX,PI/2,-PI/2,.01*-PI,.01*PI),-PI/9,PI/9),c=constrain(map(rotationY,-PI/2,PI/2,.01*-PI,.01*PI),-PI/9,PI/9);rotateX(a);rotateY(c);for(a=0;30>a;a++)fill(250-10*a),tunnelUnit(300-200*a,200);for(a=0;a<glyphs.length;a++)c=glyphs[a],c.fall(-18),c.display(),-5E3>c.loc.z&&glyphs.splice(a,1)}
function mousePressed(){var a=glyphTable[int(gIndex++%glyphTable.length)];a=new Glyph(a,.6*(mouseX-width/2),.6*(mouseY-height/2),200);glyphs.push(a)}
var Glyph=function(a,c,b,f){this.fsize=.8*min(width,height);this.path=font.getPath(a,0,0,this.fsize);this.commands=this.path.commands;this.jamos=[];for(a=0;a<this.commands.length;a++){var d=this.commands[a];if("M"===d.type){var e=[];e.push(d)}else"L"===d.type?e.push(d):"C"===d.type?e.push(d):"Q"===d.type?e.push(d):"Z"===d.type&&(e.push(d),this.jamos.push(e))}this.loc=createVector(c,b,f);this.yRot=this.xRot=0;this.xRotInc=random(-.01,.01);this.yRotInc=random(-.01,.01)};
Glyph.prototype.showJamoAt=function(a){a=this.jamos[a];for(var c=0;c<a.length;c++){var b=a[c];"M"===b.type?(push(),beginShape(),vertex(b.x,b.y)):"L"===b.type?vertex(b.x,b.y):"C"===b.type?bezierVertex(b.x1,b.y1,b.x2,b.y2,b.x,b.y):"Q"===b.type?quadraticVertex(b.x1,b.y1,b.x,b.y):"Z"===b.type&&(endShape(CLOSE),pop())}};Glyph.prototype.fall=function(a){this.loc.z+=a;this.xRot+=this.xRotInc;this.yRot+=this.yRotInc};
Glyph.prototype.display=function(){push();translate(this.loc.x,this.loc.y,this.loc.z);rotateX(this.xRot);rotateY(this.yRot);fill(255+.05*this.loc.z,150+.05*this.loc.z,200+.05*this.loc.z);translate(-this.fsize/4,this.fsize/4,0);for(var a=0;a<this.jamos.length;a++)this.showJamoAt(a);pop()};
function tunnelUnit(a,c){push();translate(0,0,a);push();translate(-w/2,-h/2,0);rotateY(PI/2);rect(0,0,c,h);pop();push();translate(-w/2,-h/2,0);rotateX(-PI/2);rect(0,0,w,c);pop();push();translate(w/2,-h/2,0);rotateY(PI/2);rect(0,0,c,h);pop();push();translate(-w/2,h/2,0);rotateX(-PI/2);rect(0,0,w,c);pop();pop()};