var Utils = {
  
  
  
  centerCanvas: function () {
    canvas.yOff = 50;
    canvas.xOff = 0;
  
    x = (windowWidth - width) / 2 + canvas.xOff;
    y = (windowHeight - height) / 2 + canvas.yOff;
    cnv.position(x, y);
  },
  
  
  
  defaults: function (dest, source) {
      if(!source) { return dest; }
      for (var prop in source) {
        if(dest[prop] === void 0) {
          dest[prop] = source[prop];
        }
      }
      return dest;
  }
  
  
};

class TestObject extends GameObject {
	
	update(dt) {
		this.x += this.p.xspeed * dt;
		
		if(this.p.lastPos.dist(this) > 0) {
		  this.trigger('move', {
		    from: this.p.lastPos,
		    to: this.copy()
		  });
		}
	} 
	
	draw() {
		fill("red");
		rect(this.x, this.y, this.p.w, this.p.w);
	}
	
}

