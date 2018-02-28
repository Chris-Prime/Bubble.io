var cnv;
var hud;
var fc = 0;
var bgColor = 51;
var cb;

var game;

function setup() {
	cnv = createCanvas(620, 540);
	cnv.parent('canvas-holder');
	centerCanvas();
	
	// Initialize a Game
	hud = new HUD();
	
	cb = new Console(0, height - 7 * 16);
	console.log(cb);
	
	game = createGame();
	game.startGame();
}

function draw() {
	// Background (dark grey)
	background(bgColor);
		
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
	
	for(b in buttons) {
		buttons[b].draw();
	}
	
	cb.render();
	
	fc++;
	if(fc > 60) {
		fc = 0;
	}
}

function createGame() {
  var g = new Game();
  return g;
}

function mouseClicked() {
	for(b in buttons) {
		if(buttons[b].clicked()) return true;
	}
	game.mouseClicked();
}

function keyPressed() {
	if(key == "p" || key == "P") {
		if(game.lifes > 0) game.setState(PAUSE_MENU_STATE);
	}
}

