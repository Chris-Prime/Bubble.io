var colorPage = class ColorPage extends Scene {
	
	constructor(p) {
		super(p, {
			colors: ["red", "green", "blue", "magenta", "cyan", "orange", "violet", "lightgreen"],
			radius: 30,
			spacing: 10, // Each circle will be 10 pixels apart
			chosenColor: color("orange"),
			private: false
		});
		
		addButton(new Button({
    		x: width / 2 - 75,
    		y: height / 2 + 100, 
    		width: 150,
    		height: 50, 
    		text: "Play",
    		callback: (b) => {
    			b.scene.destroy();
    			startGame();
    		},
    		id: "button.play"
	    }));
		
		var w = this.p.colors.length * (this.p.radius + this.p.spacing * 2);
		var h = this.p.radius;
		// Lets find sx and sy. We now have rectangle width which is same as height
		// Let's align it in the center by getting upper left corner point
		var sx = width / 2 - w / 2;
		var sy = height / 2 - h / 2;
		
		this.sx = sx;
		this.sy = sy;
		this.w = w;
		this.h = h;
		
		for(var i = 0; i < this.p.colors.length; i++) {
			var b = this.insert(addButton(new Button({
				x: (sx + this.p.radius / 2) + (w / this.p.colors.length) * i + this.p.spacing,
				y: (sy + this.p.radius / 2),
				radius: this.p.radius,
				color: color(this.p.colors[i]),
				selected: this.p.chosenColor.toString() === color(this.p.colors[i]).toString(),
				collisionDetection: function(b) {
					return dist(b.x, b.y, mouseX, mouseY) <= b.p.radius / 2;
				},
				customDraw: function(b) {
					push();
					stroke(255);
					if(b.p.hovering) {
						strokeWeight(4);
						cursor(HAND);
					} else {
						strokeWeight(2);
						cursor(ARROW);
					}
					if(b.p.selected) {
						noFill();
						stroke(255);
						strokeWeight(1);
						ellipse(b.x, b.y, b.p.radius + 7, b.p.radius + 7);
					} 
					fill(b.p.color);
					ellipse(b.x, b.y, b.p.radius, b.p.radius);
					pop();
				},
				callback: function(b) {
					return false;
				},
				id: this.p.colors[i]
			})), this.z);
			b.on('hover', function(button){
				BACKGROUND_COLOR = color(button.p.color.toString());
				getLayer(0)[0].fadeSpeed = 255;
			});
			b.on('leave', function(button){
				getLayer(0)[0].fadeSpeed = -255;
			});
			b.on('select', function(b) {
				b.scene.p.chosenColor = b.p.color;
			})
		}
		getButton('button.play').off('clicked');
		
		this.insert(getButton('button.play'), this.z);
	}
	
	buttonDraw(button) {
		push();
		stroke(255);
		strokeWeight(button.p.hovering ? 6 : 2);
		fill(button.p.color);
		ellipse(button.x, button.y, button.p.radius, button.p.radius);
		pop();
	}
	
	draw() {
		// stroke(255);
		// noFill();
		// strokeWeight(2);
		// rect(this.sx, this.sy, this.w, this.h);
		fill(255);
		noStroke();
		textAlign(CENTER);
		textSize(32);
		text("Pick your color", width / 2, height / 2 - 70);
		
		// Lets draw line under colors
		strokeWeight(2);
		stroke(255);
		line(this.sx, this.sy + this.h + 10, this.sx + this.w, this.sy + this.h + 10);
	}
	
}