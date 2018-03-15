
// Steps Per Second
const SPS = 1000 / 30;

var DEFAULT_BACKGROUND_COLOR = "#515151";
var BACKGROUND_COLOR = DEFAULT_BACKGROUND_COLOR;

var lastUpdate;
var cnv;

// Each key of this array is z index
var layers = [];
var gameObjects = [];

function setup() {
	cnv = createCanvas(620, 540);
	cnv.parent('canvas-holder');
	Utils.centerCanvas();
	
	// Add background
	BACKGROUND_COLOR = color(BACKGROUND_COLOR);
	var bg = {
		draw: function() {
			BACKGROUND_COLOR.setAlpha(this.alpha);
		
			fill(BACKGROUND_COLOR);
			rect(0, 0, width, height);
		},
		alpha: 0,
		fadeSpeed: 0,
		maxAlpha: 100,
		minAlpha: 0,
		update: function(dt) {
			this.alpha += this.fadeSpeed * dt;
			if(this.alpha > this.maxAlpha) {
				this.alpha = this.maxAlpha;
			} else if (this.alpha < this.minAlpha) {
				this.alpha = this.minAlpha;
			}
		}
	};
	addToGameObjects(bg, 0);
	
	// Initialize a Game
	addToGameObjects(new colorPage(), 1);
	
	lastUpdate = Date.now();
	window.setInterval(update, SPS);
}

function startGame() {
}

function update() {
	var now = Date.now();
	var dt = now - lastUpdate;
	lastUpdate = now;
	
	for(var i = 0; i < gameObjects.length; i++) {
		if(!gameObjects[i].sleeping) {
			if(gameObjects[i]._update) {
				gameObjects[i]._update(dt / 1000);
			} else {
				gameObjects[i].update(dt / 1000);
			}
		}
	}
}

function addToGameObjects(obj, layer) {
	if(obj instanceof GameObject || typeof(obj.update) === "function") {
		if(gameObjects.indexOf(obj) < 0) {
			gameObjects.push(obj);
			if(typeof(layer) !== "undefined") {
				addToLayer(obj, typeof(layer) === "boolean" ? (obj.z || 0) : layer);
			} 
			return obj;
		}
	}
	return false;
}

function removeFromGameObjects(obj) {
	var i;
	if((i = gameObjects.indexOf(obj)) > 0) {
		gameObjects.splice(i, 1);
	}
	return false;
}

function draw() {
	background(DEFAULT_BACKGROUND_COLOR);

	for(layer in layers) {
		for(var i = 0; i < layers[layer].length; i++) {
			if(typeof(layers[layer][i]) === "function") {
				layers[layer][i]();
			} else {
				layers[layer][i].draw();
			}
		}
	}
}

function setLayerAlpha(z, alpha) {
	layers[z].alpha = alpha;
}

function layerAlpha(obj) {
	return getLayer(obj.z).alpha;
}

function addToLayer(obj, z) {
	if(typeof(layers[z]) !== "object") {
		clearLayer(z);
	}
	layers[z].push(obj);
	obj.z = z;
	return true;
}

function getLayer(z) {
	return layers[z];
}

function removeFromLayer(obj, z) {
	var i;
	z = z || obj.z || 0;
	if(!layers[z]) return false;
	if((i = layers[z].indexOf(obj)) != -1) {
		layers[z][i].z = -1;
		return layers[z].splice(i, 1);
	}
	return false;
}

function clearLayer(z) {
	var layer = layers[z];
	layers[z] = [];	
	layers[z].alpha = 255;
	return layer;
}

function createGame() {
  var g = new Game();
  return g;
}

function mouseClicked() {
	for(b in buttons) {
		if(buttons[b].clicked()) return true;
	}
}

function keyPressed() {
	if(key === "w") {
		t.p.yspeed = -50;
	} else if (key === "s") {
		t.p.yspeed = 50;
	} else if (key === "d") {
		t.p.xspeed = 50;
	} else if (key === "a") {
		t.p.xspeed = -50;
	}
}

function keyReleased() {
	t.p.xspeed = 0;
	t.p.yspeed = 0;
}

