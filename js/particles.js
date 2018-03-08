// PARTICLES
let particles = [];

let colors = ["red", "green", "purple", "cyan", "blue"];

class Particle extends p5.Vector {
	
	constructor(x, y) {
		super(x, y);
		
		this.remove = false;
	}
	
	update() {}
	
	draw() {}
	
	destroy() {
		this.remove = true;
	}
		
}

class ExplosionParticle extends Particle {
	
	constructor(x, y, properties) {
		super(x, y);
		
		this.particles = [];
		
		for(var i = 0; i < properties.size || 20; i++) {
			let p = new p5.Vector(x, y);
			p.col = properties.color || "red";
			p.dir = p5.Vector.random2D().normalize();
			p.dir.y = random(1, 5) * -1; // goes up at the start
			this.particles[i] = p;
			p.size = random(10, 50) / 10;
			p.lifespan = random(60, 180) / 2;
			p.ls = p.lifespan;
		}
		
	}
	

	update() {
		for(var i = this.particles.length - 1; i >= 0; i--) {
			let p = this.particles[i];
			p.size -= 0.1;
			p.lifespan -= 1;
			p.add(p.dir);
			p.dir.add(0, 0.1);
			if(p.lifespan <= 0) {
				this.particles.splice(i, 1);
			}
		}
		if(this.particles.length <= 0) {
			this.destroy();
		}
	}
	
	draw() {
		noStroke();
		for(var i = 0; i < this.particles.length; i++) {
			let p = this.particles[i];
			fill(color(this.particles[i].col), p.ls / p.lifespan);
			ellipse(p.x, p.y, p.size, p.size);
		}
	}
		
}

class CircleParticle extends Particle {
	
	constructor(x, y, properties) {
		super(x, y);
		
		this.maxRadius = properties.maxRadius || 15;
		this.expandSpeed = properties.expandSpeed || 1;
		this.radius = properties.radius || 0;
		this.color = properties.color || color("red");
		this.opacity = properties.opacity || 0;
		this.fadeSpeed = properties.fadeSpeed || 5;
	}
	
	update() {
		this.opacity += this.fadeSpeed;
		this.radius += this.expandSpeed * 0.1 + this.expandSpeed;
		if(this.radius >= this.maxRadius) {
			this.radius = this.maxRadius;
		}
		if(this.opacity >= 255) {
			this.destroy();
		}
		this.color.alpha = this.opacity;
	}
	
	draw() {
		push();
		stroke(this.color);
		strokeWeight(4);
		noFill();
		ellipse(this.x, this.y, this.radius, this.radius);
		pop();
	}
	
}