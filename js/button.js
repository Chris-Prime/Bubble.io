function Button(x, y, w, h, txt, callback, id, customDraw) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.text = txt;
	this.callback = callback;
	this.id = id;
	this.customDraw = customDraw || false;
	this.hovering = false;
	
	this.draw = function() {
		// check if mouse is inside the rectangle
		// mouseX >= x && mouseX <= x+width && mouseY >= y && mouseY <= y+height
		if (mouseX >= this.x && mouseX <= this.x+this.width && mouseY >= this.y && mouseY <= this.y+this.height) {
			this.hovering = true;
		} else {
			this.hovering = false;
		}
		
		// draw a rectangle
		if(this.customDraw) {
			this.customDraw
		} else {
			push();
			if(this.hovering) {
				cursor(HAND);
				fill(0, 0, 0, 100);
			} else {
				cursor(ARROW);
				fill(0, 0, 0, 70);
			}
			rect(this.x, this.y, this.width, this.height, 5);
			fill(255);
			textSize(16);
			textAlign(CENTER);
			text(this.text, this.x, this.y + this.height / 2 - 8, this.width, this.height);
			pop();
		}
	}
	
	this.clicked = function() {
		if(this.hovering) {
			this.callback();
			return true;
		}
		return false;
	}
	
	this.destroy = function() {
		removeButton(this.id);
	}
	
}

function addButton(button) {
	buttons[button.id] = button;
}

function removeButton(id) {
	id = typeof(id) === "Button" ? id.id : id;
	console.log(id);
	cursor(ARROW);
	delete buttons[id];
}
