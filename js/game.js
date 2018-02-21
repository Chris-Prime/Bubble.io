class Game {
    
    constructor() {
        this.setParams();
        
        this.paused = true;
    }
    
    render() {
        if(!this.paused) {
    		this.targets.forEach(function(target, index) {
    			target.update();
    			target.render();
    			if(target.shot) {
    				game.targets.splice(index, 1);
    			}
    		});
    		
    		// Spawn new targets
    		if(fc % (60 / this.speed) == 0 && this.targets.length < this.speed) {
    			this.targets.push(new Target(random(12, width - 12), random(30, height - 12)));
    		}
        } else {
            if(this.lifes <= 0) {
                // Game lost
                push();
                textSize(32);
                textAlign(CENTER);
                fill(255);
                text("Game Over", width / 2, height / 2 - 65);
                textSize(18);
                text("Final score: " + this.score, width / 2, height / 2);
                pop();
            } else {
                // Just paused
                // Let's draw paused symbol
                push();
                fill(255);
                rect(width / 2 - 27, height / 2 + 50, 20, 80);
                rect(width / 2 + 7, height / 2 + 50, 20, 80);
                
                textSize(32);
                textAlign(CENTER);
                text("Paused", width / 2, height / 2);
                pop();
            }
        }
    }
    
    update() {
        // TODO
    }
    
    setParams() {
        this.score = 0;
        this.lifes = 3;
        this.speed = 1; // Targets Per second
        this.lastScore = 0;
        this.targets = [];
    }
    
    mouseClicked() {
        if(this.paused) return;
        var hit = false;
    	this.targets.forEach(function(target, index){
    		if(target.inside(mouseX, mouseY)) {
    			target.remove(true);
    			hit = true;
    		}
    	});
    	if(!hit) {
    		this.removeLife();
    		particles.push(new Particle(mouseX, mouseY,  10 * this.lifes, color("red")));
    	}
    }
    
    endGame() {
    	this.paused = true;
    }
    
    startGame() {
        this.paused = false;
        this.targets = [];
        this.setParams();
    }
    
    addScore(points) {
        if(this.paused) return;
    	this.score += points;
    	if(this.score - this.lastScore >= 50) {
    		this.speed++;
    		this.lastScore = this.score;
    	}
    }
    
    removeLife() {
        if(this.paused) return;
    	this.lifes--;
    	if(this.lifes <= 0) {
    		this.endGame();
    	}
    }
    
}