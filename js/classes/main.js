
// Create Quintus engine
var Q;
var canvas;
var backgroundColor;
var server;
var version = "1.0.0";
var hideFooter = false;
var myFont;

function preload() {
    myFont = loadFont("data/fonts/Nunito/Nunito-Regular.ttf");
}

function setup() {
    // Create canvas at first
    setupCanvas();
    
    setupEngine();
    
    Q.state.reset({
        chosenColor: color("white"),
        colors: [
            ["#3089AC", "#5AEDD5", "#9DE7AD", "#FEC476", "#DB567F", "#A336B4", "violet", "#F5C7F7", "#FFF1E2"],
            ["#ff0000", "#ffaa00", "#aaff00", "#00ff00", "#00ffaa", "#00aaff", "#0000ff", "#aa00ff", "#ff00aa"]
        ],
        score: 0,
        lifes: 3,
        speed: 1
    });
    
    disableDefaultRendering();
    
    createClasses();
    
    setupScenes();
    
    go();
}

function createClasses() {
    __entityClass(); // entity.js
    __colorButtonClass(); // colorButton.js
    __hudClass(); // hud.js
    __targetClass(); // target.js
    __particleClass();
    __textPopupParticleClass();
}

function setupEngine() {
    Q = Quintus({development: true}).include("Scenes, Sprites, UI, Touch").setup("game").touch();
    backgroundColor = color(0);
    textFont(myFont);
}

function setupCanvas() {
    canvas = createCanvas(640, 520);
    canvas.elt.id = "game";
    //document.getElementById("canvas-holder").appendChild(canvas.elt);
}

function disableDefaultRendering() {
    background(backgroundColor);
    noLoop();
}

function setupScenes() {
    __gameModeSelectionScene();
    __colorSelectionScene(); // colorSelection.js
    __singlePlayerGameScene();
    __connectionStateScene();
    //__multiPlayerMenuScene();
    //__multiPlayerGameScene();
}

function go() {
    //Q.stageScene("colorSelection");
    Q.stageScene("gameModeSelection");
    
    fixGameLoop();
}

function fixGameLoop() {
    Q._gameLoopCallbackWrapper = Q.gameLoopCallbackWrapper;
    Q.clearColor = false;
    Q.gameLoopCallbackWrapper = function() {
        background(backgroundColor);
        Q._gameLoopCallbackWrapper();
        
        drawFooter();
    }
}

function drawFooter() {
    if(!hideFooter) {
        push();
        stroke(255);
        fill(255);
        strokeWeight(2);
        line(0, height - 24, width, height - 24);
        noStroke();
        textSize(16);
        textAlign(LEFT);
        text("Made by KeiDi @ 2018 March", 5, height - 4);
        textAlign(RIGHT);
        text("Version: v"+version+" (made of boredness) ", width - 5, height - 4);
        pop();
    }
}

function isOnline() {
    if(this.server) return true;
    return false;
}

// P5 Events

function mousePressed() {
    Q.stage().trigger("mousePressed");
    trigger(Q.stage(), "mousePressed");
    
    Q.stage().insert(new Q.Target({
        x: mouseX,
        y: mouseY,
        color: Q.state.get("chosenColor")
    }));
}

function mouseDragged() {
    Q.stage().trigger("mouseDragged");
    trigger(Q.stage(), "mouseMoved");
    
    Q.stage().insert(new Q.Target({
        x: mouseX,
        y: mouseY,
        color: Q.state.get("chosenColor")
    }));
}

function mouseMoved() {
    Q.stage().trigger("mouseMoved");
    trigger(Q.stage(), "mouseMoved");
}

function trigger(stage, event, data) {
    for(var i = 0; i < stage.items.length; i++) {
        stage.items[i].trigger(event, data);
    }
}