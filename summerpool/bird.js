class Bird {
	constructor(x, y, r) {
		this.body = Matter.Bodies.circle(x, y, r);
		Matter.World.add(world, this.body);
		this.r = r;
	}

	show() {
		const pos = this.body.position;
		const angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		fill(255);
		circle(0, 0, this.r * 2);
		pop();
	}
}
