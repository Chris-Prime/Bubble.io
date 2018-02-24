function centerCanvas() {
  canvas.yOff = 50;
  canvas.xOff = 0;

  x = (windowWidth - width) / 2 + canvas.xOff;
  y = (windowHeight - height) / 2 + canvas.yOff;
  cnv.position(x, y);
}