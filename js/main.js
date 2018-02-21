var cnv;
var hud;
var game;
var fc = 0;
var buttons = [];

function setup() {
	cnv = createCanvas(620, 540);
	cnv.parent('canvas-holder');
	centerCanvas();
	
	// Initialize a Game
	hud = new HUD();
	
	game = createGame();
	game.startGame();
}

function draw() {
	// Background (dark grey)
	background(51);
		
	// Render the game scene
	game.render();
	
	// Render HUD (Shows score, lifes, speed etc.)
	hud.render();
	
	// Render particles
	particles.forEach(function(el, i) {
		el.update();
		el.draw();
		
		if(el.particles.length <= 0) {
			particles.splice(i, 1);
		}
	});
	
	fc++;
	if(fc > 60) {
		fc = 0;
	}
}

function HUD() {
	
	this.yOff = 15;

	this.render = function() {
		push();
		fill(255);
		textSize(16);
		text("Score: " + game.score, 5, this.yOff);
		textAlign(RIGHT);
		text("Lifes: " + game.lifes, width - 5, this.yOff);
		textAlign(CENTER);
		text("Speed: " + game.speed, width / 2, this.yOff);
		stroke(255);
		line(0, this.yOff + 5, width, this.yOff + 5);
		pop();
	}
	
}

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

function Button(x, y, w, h, text, callback) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.text = text;
	this.callback = callback;
	
	this.draw() {
		// check if mouse is inside the rectangle
		// mouseX >= x && mouseX <= x+width && mouseY >= y && mouseY <= y+height
		if (mouseX >= this.x && mouseX <= this.x+this.width && mouseY >= this.y && mouseY <= this.y+this.height) 
		{
			this.hovering = true;
		} else {
			this.hovering = false;
		}
		
		// draw a rectangle
		rectMode(CORNER);
		stroke(0);
		strokeWeight(5);
		if(this.hovering) {
			cursor(HAND);
		} else {
			cursor(ARROW); 
		}
		rect(this.x, this.y, this.width, this.height);
	}
	
	this.clicked() {
		if(this.hovering) {
			this.callback();
		}
	}
	
}

function mouseClicked() {
	game.mouseClicked();
	buttons.forEach(function(b, i){
		b.
	});
}

function keyPressed() {
	if(key == "p" || key == "P") {
		if(game.lifes > 0) game.paused = !game.paused;
	}
}


