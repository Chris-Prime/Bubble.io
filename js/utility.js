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

var counter = {
	age: 0,
	_update: function(dt) {this.age+=dt;this.update(dt);},
	draw: function() {noStroke();fill(255);textAlign(CENTER);textSize(64);text(5 - floor(this.age*1000), width / 2, height / 2);},
	update: function(dt) {
		if(this.age*1000 >= 5) {
			this.scene.remove(this, true);
		}
	}
};