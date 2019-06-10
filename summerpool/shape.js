class Shape {
	//	constructor(x, y, w, h) {
	//		this.body = Matter.Bodies.rectangle(x, y, w, h);
	//		Matter.World.add(world, this.body);
	//		this.w = w;
	//		this.h = h;
	//	}
	//

	constructor(gly, x, y, z) {
		this.fsize = min(width, height) * .3;
		this.path = font.getPath(gly, 0, 0, this.fsize); // font size 512
		const vertexSets = [];
		const points = Svg.pathToVertices(this.path, 3);
		vertexSets.push(Matter.Vertices.scale(points, 1, 1));
		this.body = Matter.Bodies.fromVertices(x, y, vertexSets, {
			render: {
				fillStyle: '#f00',
				lineWidth: 1,
				//				wireframes: true
			},
		}, true);
		Matter.World.add(world, this.body);
	}

	show() {
		const pos = this.body.position;
		const angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		fill(255);
		rectMode(CENTER);
		rect(0, 0, 50, 50);
		pop();
	}

	//	showJamoAt(idx) {
	//		let ja = this.jamos[idx];
	//
	//		for (let i = 0; i < ja.length; i++) {
	//			const c = ja[i];
	//			let xoff, yoff;
	//			if (c.type === 'M') {
	//				push();
	//				beginShape();
	//				vertex(c.x, c.y);
	//			} else if (c.type === 'L') {
	//				vertex(c.x, c.y);
	//			} else if (c.type === 'C') {
	//				bezierVertex(c.x1, c.y1, c.x2, c.y2, c.x, c.y);
	//			} else if (c.type === 'Q') {
	//				quadraticVertex(c.x1, c.y1, c.x, c.y);
	//			} else if (c.type === 'Z') {
	//				endShape(CLOSE);
	//				pop();
	//			}
	//		}
	//	}
	//
	//	display() {
	//		push();
	//		translate(this.loc.x, this.loc.y, this.loc.z);
	//		//		rotateX(this.xRot);
	//		//		rotateY(this.yRot);
	//		fill(255, 0, 0);
	//		translate(-this.fsize / 4, this.fsize / 4, 0);
	//		for (let i = 0; i < this.jamos.length; i++) {
	//			this.showJamoAt(i);
	//		}
	//		pop();
	//	}
}
