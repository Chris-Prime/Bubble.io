
// Create Quintus engine
var Q;
var canvas;

function setup() {
    // Create canvas at first
    setupCanvas();
    
    setupEngine();
    
    disableDefaultRendering();
    
    createClasses();
    
    setupScenes();
    
    go();
}

function createClasses() {
    __entityClass(); // entity.js
    __colorButtonClass();
}

function setupEngine() {
    Q = Quintus({development: true}).include("Scenes, Sprites, UI, Touch").setup("game").touch();
}

function setupCanvas() {
    canvas = createCanvas(640, 520);
    canvas.id = "game";
    document.getElementById("canvas-holder").appendChild(canvas.elt);
}

function disableDefaultRendering() {
    background(51);
    noLoop();
}

function setupScenes() {
    Q.scene("colorSelection", function(stage){
        
        var b = new Q.ColorButton({
            x: width / 2,
            y: width / 2,
            color: color("blue"),
            radius: 50,
            selected: true
        });
        
        stage.insert(b);
    });
}

function go() {
    Q.stageScene("colorSelection");
}