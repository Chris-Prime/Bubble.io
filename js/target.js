function Target(x, y) {
	
	this.size = 0;
	this.maxSize = 20;
	this.despawn = 30; // How many frames to wait for
	// target to disappear?
	this.shot = false;
	this.speed = 0.3;
	
	this.x = x;
	this.y = y;
	
	this.update = function() {
		if(this.size < this.maxSize) {
			this.size += this.speed;
			if(this.size >= this.maxSize / 2) {
				this.speed = 0.15;
			}
		} else {
			if(this.despawn <= 0) {
				this.remove(false);
				game.removeLife();
			} else {
				this.despawn--;
			}
		}
	}
	
	this.render = function() {
		noStroke();
		fill("orange");
		ellipse(this.x, this.y, this.size, this.size);
	}
	
	this.inside = function(x, y) {
		if(dist(this.x, this.y, x, y) <= this.size) {
			return true;
		}
		return false;
	}
	
	this.remove = function(shot) {
		if(shot) {
			game.addScore(this.maxSize - round(this.size));
		}
		this.shot = true;
		
		// Add particle
		particles.push(new Particle(this.x, this.y, this.size * 5, color("orange")));
	}
	
}