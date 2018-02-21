function setup() {
  createCanvas(620, 540);
  canvas.parent('canvas-holder');
  centerCanvas();
}

function draw() {
  background(51);
  
  // Draw text
  fill(255);
  textSize(42);
  textAlign(CENTER);
  text("NOT AVAILABLE", width / 2, height / 2);
 
  noLoop();
}
