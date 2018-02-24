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