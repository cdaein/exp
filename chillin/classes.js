class Box {
  constructor(x, y, w, h) {
    this.body = Matter.Bodies.rectangle(x, y, w, h);
    Matter.World.add(world, this.body);
    this.w = w;
    this.h = h;
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(255);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

/************************************/
class Ground extends Box {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.body.isStatic = true;
  }
}

/************************************/
class Letter {
  constructor(ch, x, y, sz) {
    this.ch = ch;
    this.shadow = false;
    this.sz = sz;
    if (this.ch == ' ') this.sz = this.sz * 0.9;
    textSize(this.sz - this.sz * 0.1);
    this.w = this.sz;
    this.h = this.sz - this.sz * 0.2;
    this.body = Matter.Bodies.circle(x, y, this.w * 0.5, {
      frictionAir: random(0.0001, 0.1)
    });
    Matter.Body.setVelocity(this.body, Matter.Vector.create(random(-1, 1), random(-1, 1)));
    Matter.Body.setAngularVelocity(this.body, random(-0.01, 0.01));
    Matter.World.add(world, this.body);
  }

  removeBody() {
    Matter.World.remove(world, this.body);
  }

  setBlankColor(bc) {
    this.blankCol = bc;
  }
  
  setTextColor(fc) {
    this.tfc = fc;
  }
  setBoxColor(fc) {
    this.bfc = fc;
  }
  
  activateShadow() {
    this.shadow = true;
  }
  
  deactivateShadow() {
    this.shadow = false;
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;

    push();
    translate(pos.x, pos.y, 0);
    rotate(angle);
    fill(this.bfc);
    if (this.ch === ' ' && !this.shadow) fill(this.blankCol);
    noStroke();
    ellipse(0, 0, this.w, this.w);
    fill(this.tfc);
    translate(0, 0, 1); // z-fighting
    textSize(this.sz - this.sz * 0.1);
    text(this.ch, 0, -this.h * 0.25);
    pop();
  }

}