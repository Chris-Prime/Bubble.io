
// Steps Per Second
const SPS = 1000 / 30;

const BACKGROUND_COLOR = "#515151";

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
	addToLayer(function(){
		background(BACKGROUND_COLOR);
	}, 0);
	
	// Initialize a Game
	addButton(new Button({
		x: width / 2 - 75,
		y: height / 2 - 25, 
		width: 150,
		height: 50, 
		text: "Play",
		callback: () => {console.log("clicked!");},
		id: "button.play"
	}));
	
	lastUpdate = Date.now();
	window.setInterval(update, SPS);
}

function update() {
	var now = Date.now();
	var dt = now - lastUpdate;
	lastUpdate = now;
	
	for(var i = 0; i < gameObjects.length; i++) {
		if(!gameObjects[i].sleeping) {
			gameObjects[i].update(dt / 1000);
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
	game.mouseClicked();
}

function keyPressed() {
	if(key == "p" || key == "P") {
		//if(game.lifes > 0) game.setState(PAUSE_MENU_STATE);
		if(game.lifes > 0) game.pauseGame(true);
	}
}

