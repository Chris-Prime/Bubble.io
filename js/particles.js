// PARTICLES
let particles = [];

let colors = ["red", "green", "purple", "cyan", "blue"];

function Particle(x, y, size, col) {
		this.x = x;
		this.y = y;
		this.particles = [];
		for(var i = 0; i < size; i++) {
			let p = new p5.Vector(x, y);
			p.col = col || "red";
			p.dir = p5.Vector.random2D().normalize();
			p.dir.y = random(1, 5) * -1; // goes up at the start
			this.particles[i] = p;
			p.size = random(10, 50) / 10;
			p.lifespan = random(60, 180) / 2;
			p.ls = p.lifespan;
		}
		
	
		this.update = function() {
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
		}
		
		this.draw = function() {
			noStroke();
			for(var i = 0; i < this.particles.length; i++) {
				let p = this.particles[i];
				fill(color(this.particles[i].col), p.ls / p.lifespan);
				ellipse(p.x, p.y, p.size, p.size);
			}
		}
}