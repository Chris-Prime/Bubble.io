// STATES
var SPLASH_SCREEN_STATE = 0x00;
var MAIN_MENU_STATE     = 0x01;
var PLAYING_STATE       = 0x02;
var PAUSE_MENU_STATE    = 0x03;
var END_GAME_MENU_STATE = 0x04;

var previousState = null;
var state = SPLASH_SCREEN_STATE;
var nextState = null;
var stateInitiated = false;

function initState(s) {
    switch(s) {
        case SPLASH_SCREEN_STATE:
            return true;
        break;
        case MAIN_MENU_STATE:
            return true;
        break;
        case PLAYING_STATE:
            if(previousState === PAUSE_MENU_STATE) {
                game.pauseGame(false);
                return true;
            } else {
                game.endGame();
                game.startGame();
            }
        break;
        case PAUSE_MENU_STATE:
            if(game.paused) return false;
            game.pauseGame(true);
            return true;
        break;
        case END_GAME_MENU_STATE:
            if(previousState === PLAYING_STATE) {
                game.endGame();
                return true;
            } else {
                return false;
            }
        break;
        default:
            console.error("Unknown state: " + s);
        break;
    }
}

function setState(s, init) {
    if(s === state) return false;
    previousState = state;
    state = s;
    if(init) {
        stateInitiated = initState(state);
    }
}

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
                rect(width / 2 - 27, height / 2 - 50, 20, 80);
                rect(width / 2 + 7, height / 2 - 50, 20, 80);
                
                textSize(32);
                textAlign(CENTER);
                stroke(bgColor);
                strokeWeight(8);
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
    		particles.push(new Particle(mouseX, mouseY,  10, color("red")));
    	}
    }
    
    endGame() {
    	this.paused = true;
    	this.lifes = 0;
    	
    	addButton(new Button(width / 2 - 75, height / 2 + 20, 150, 40, "Restart", function(){
            game.startGame();
            return true;
        }, "button.restart"));
        
        cb.addLine("Game over! Final score: " + this.score + ", speed: " + this.speed);
    }
    
    startGame() {
        this.paused = false;
        this.targets = [];
        this.setParams();
    }
    
    pauseGame(pause) {
        if(pause !== this.paused) {
            if(pause) {
                addButton(new Button(width / 2 - 75, height / 2 + 50, 150, 40, "Resume", function(){
                    game.pauseGame(false);
                    return true;
                }, "button.resume"));
            }
            this.paused = pause;
        }
        
        cb.addLine("Game paused");
    }
    
    addScore(points) {
        if(this.paused) return;
    	this.score += points;
    	if(this.score - this.lastScore >= 50) {
    		this.speed++;
    		this.lastScore = this.score;
    	}
    	
    	cb.addLine("Target hit +"+points+" points");
    }
    
    removeLife() {
        if(this.paused) return;
    	this.lifes--;
    	if(this.lifes <= 0) {
    		this.endGame();
    	}
    	
    	cb.addLine("-1 Life");
    }
    
}