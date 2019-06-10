class Letter {
	constructor(ch, x, y, sz) {
		this.ch = ch;
		this.sz = sz;
		textSize(this.sz);
		//		this.w = textWidth(this.ch);
		this.w = sz;
		this.h = sz - sz * .2;
		//		console.log(textWidth('abc'));
		//		this.body = Matter.Bodies.rectangle(x, y, this.w, this.h, {
		//			frictionAir: random(.001, .1)
		//		});
		this.body = Matter.Bodies.circle(x, y, this.w * .5, {
			frictionAir: random(.001, .1)
		});
		Matter.World.add(world, this.body);
	}

	setColor(fc) {
		this.fc = fc;
	}

	show() {
		const pos = this.body.position;
		const angle = this.body.angle;

		//		push();
		//		translate(pos.x, pos.y, 0);
		//		rotate(angle);
		//		fill(255);
		//		noStroke();
		//		//				rectMode(CENTER);
		//		//				rect(0, 0, this.w, this.h);
		//		ellipse(0, 0, this.w, this.w);
		//		fill(255, 0, 0);
		//		translate(0, 0, .1); // z-fighting
		//		textSize(this.sz - this.sz * .1);
		//		text(this.ch, 0, -this.h * .2);
		//		pop();

		pg.push();
		pg.translate(pos.x, pos.y, 0);
		pg.rotate(angle);
		pg.noStroke();
		pg.fill(100, 100, 250);
		pg.rectMode(CENTER);
		//		pg.rect(0, 0, this.w, this.h);
		//		pg.ellipse(0, 0, this.w, this.w);
		pg.fill(this.fc);
		pg.translate(0, 0, .1); // z-fighting
		pg.textSize(this.sz);
		pg.text(this.ch, 0, -this.h * .2);
		pg.pop();
	}

}
