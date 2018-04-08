function __textPopupParticleClass() {
    
    Q.Entity.extend("TextPopup", {
       init: function(p) {
         this._super(p, {
            label: "undefined",
            textSize: 12,
            ySpeed: -20, // 20 pixels up per second
            minTextSize: 0,
            maxTextSize: 0,
            textWeight: 0,
            minTextWeight: 0,
            maxTextWeight: 0,
            growSpeed: 0, // 4px per second
            thickenSpeed: 0, // 3px per second
            fadeOut: 255 * 2, // 1/2 second
            color: color("white") // This is where the alpha is stored
         });
       },
       update: function(dt) {
           if(this.p.color._getAlpha() <= 0) {
               this.destroy();
           }
           this.p.textSize = clamp(this.p.textSize + this.p.growSpeed * dt, this.p.minTextSize, this.p.maxTextSize);
           this.p.textWeight = clamp(this.p.textWeight + this.p.thickenSpeed * dt, this.p.minTextWeight, this.p.maxTextWeight);
           this.p.color.setAlpha(clamp(this.p.color._getAlpha() + this.p.fadeOut * dt * -1, 0, 255));
           
           this.p.y = clamp(this.p.y + this.p.ySpeed * dt, 0, height);
       },
       render: function(ctx) {
           push();
            textSize(this.p.textSize);
            textAlign(CENTER);
            fill(this.p.color);
            stroke(this.p.color);
            strokeWeight(this.p.textWeight);
            text(this.p.label, this.p.x, this.p.y);
           pop();
       }
    });
    
}