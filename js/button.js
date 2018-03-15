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
			customDraw: false,
			collisionDetection: false,
			selected: false
		});
		
		this.on('clicked', this.markSelected);
		this.on('scene.removed', this.destroy);
	}
	
	draw() {
		// check if mouse is inside the rectangle
		var wasHovering = this.p.hovering;
		if(!this.p.collisionDetection) {
			// mouseX >= x && mouseX <= x+width && mouseY >= y && mouseY <= y+height
			if (mouseX >= this.x && mouseX <= this.x+this.p.width && mouseY >= this.y && mouseY <= this.y+this.p.height) {
				this.p.hovering = true;
			} else {
				this.p.hovering = false;
			}
		} else {
			this.p.hovering = this.p.collisionDetection(this);
		}
		if(this.p.hovering !== wasHovering) {
			if(this.p.hovering || !wasHovering) {
				this.trigger('hover');
			} else if (!this.p.hovering || wasHovering) {
				this.trigger('leave');
			}
		}
		
		// draw a rectangle
		if(this.p.customDraw) {
			this.p.customDraw(this);
		} else {
			push();
			if(this.p.hovering) {
				cursor(HAND);
				fill(0, 0, 0, 100);
			} else {
				cursor(ARROW);
				fill(0, 0, 0, 70);
			}
			stroke(255);
			strokeWeight(2);
			rect(this.x, this.y, this.p.width, this.p.height, 5);
			fill(255);
			noStroke();
			textSize(16);
			textAlign(CENTER);
			text(this.p.text, this.x, this.y + this.p.height / 2 - 8, this.p.width, this.p.height);
			pop();
		}
	}
	
	clicked() {
		if(this.p.hovering) {
			this.trigger('clicked');
			
			if(this.p.callback(this) === true) {
				this.remove();
			}
			return true;
		}
		return false;
	}
	
	markSelected(t) {
		var sb = getSelectedButtons();
		if(sb.length > 0) {
			for(b in sb) {
				sb[b].p.selected = false;
			}
		}
	
		// Mark selected
		t.trigger('select');
		t.p.selected = true;
	}
	
	remove() {
		this.destroy();
		removeButton(this.p.id);
	}
	
}

function getSelectedButtons() {
	var b = [];
	for(button in buttons) {
		if(buttons[button].p.selected) b.push(buttons[button]);
	}
	return b;
}

function addButton(button) {
	buttons[button.p.id] = button;
	return button;	
}

function removeButton(id) {
	id = typeof(id) === "Button" ? id.p.id : id;
	cursor(ARROW);
	delete buttons[id];
}

function getButton(id) {
	return buttons[id];
}
