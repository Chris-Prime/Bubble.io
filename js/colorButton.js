function __colorButtonClass() {
    Q.Entity.extend("ColorButton", {
        init: function(p) {
            this._super(p, {
               color: color("red"),
               radius: 20,
               selected: false,
            });
        },
        render: function(ctx) {
            console.log("drawing...");
            if(this.p.selected) {
                push();
                noFill();
                stroke(255);
                strokeWeight(2);
                ellipse(this.p.x, this.p.y, this.p.radius + 4, this.p.radius + 4);
                pop();
            }
            fill(this.p.color);
            noStroke();
            ellipse(this.p.x, this.p.y, this.p.radius, this.p.radius);
        },
        update: function(dt) {
            
        }
    });
}