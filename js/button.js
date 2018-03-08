var buttons = [];

class Button extends GameObject {
	// x, y, w, h, txt, callback, id, customDraw
	
	constructor(p) {
		super(p, {
			width: 175,
			height: 30,
			text: "Button",
			id: "button."+buttons.length,
			hovering: false,
			callback: function(){return true;},
			customDraw: false
		});
	}
	
	draw() {
		// check if mouse is inside the rectangle
		// mouseX >= x && mouseX <= x+width && mouseY >= y && mouseY <= y+height
		if (mouseX >= this.x && mouseX <= this.x+this.p.width && mouseY >= this.y && mouseY <= this.y+this.p.height) {
			this.p.hovering = true;
		} else {
			this.p.hovering = false;
		}
		
		// draw a rectangle
		if(this.p.customDraw) {
			this.p.customDraw();
		} else {
			push();
			if(this.p.hovering) {
				cursor(HAND);
				fill(0, 0, 0, 100);
			} else {
				cursor(ARROW);
				fill(0, 0, 0, 70);
			}
			rect(this.x, this.y, this.p.width, this.p.height, 5);
			fill(255);
			textSize(16);
			textAlign(CENTER);
			text(this.p.text, this.x, this.y + this.p.height / 2 - 8, this.p.width, this.p.height);
			pop();
		}
	}
	
	clicked() {
		if(this.p.hovering) {
			if(this.p.callback(this) === true) {
				this.remove();
			}
			return true;
		}
		return false;
	}
	
	remove() {
		this.destroy();
		removeButton(this.p.id);
	}
	
}

function addButton(button) {
	buttons[button.p.id] = button;
}

function removeButton(id) {
	id = typeof(id) === "Button" ? id.p.id : id;
	cursor(ARROW);
	delete buttons[id];
}

function getButton(id) {
	return buttons[id];
}
