class Console {
    
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        
        this.width = w || round(width / 3);
        this.height = h || 16 * 7;
    
        this.lines = []; // Text size is 12 + 4 (for padding) so height / 16 = max lines
        this.maxLines = this.height / 16;
        this.lineHeight = 16;
        this.draw = true;
        this.scroll = 240; // Remove last line after 240 frames;
    }
    
    render() {
        if(this.draw) {
            push();
        
            stroke(210);
            strokeWeight(2);
            noFill();
            rect(this.x, this.y, this.width, this.height);
            
            // Draw text
            textAlign(LEFT);
            fill("#FFFFF");
            textSize(12);
            for(var i = 0; i < this.lines.length; i++) {
                noStroke();
                text(this.lines[i], this.x + 4, this.y + i * this.lineHeight + this.lineHeight - 2);
                stroke(255);
                strokeWeight(1);
                line(this.x, this.y + i * this.lineHeight + 2 + this.lineHeight, this.x + this.width, this.y + i * this.lineHeight + 2 + this.lineHeight);
            }
            
            this.scroll -= 1;
            if(this.scroll <= 0) {
                this.scroll = 240;
                
                this.removeLine(true);
            }
            
            pop();
        }
    }
    
    removeLine(force = false) {
        if(this.lines.length >= this.maxLines || force) {
            this.lines.splice(this.lines.length - 1, 1);
        }
    }
    
    addLine(text) {
        this.removeLine();
        this.lines.unshift(text);
    }
    
    
    
}