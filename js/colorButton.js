function __colorButtonClass() {
    Q.Entity.extend("ColorButton", {
        init: function(p) {
            this._super(p, {
               color: color("red"),
               radius: 20,
               selected: false,
               hovering: false // is mouse over this object?
            });
            this.on('mousePressed', this.select);
            this.on('mouseMoved', this.mouseMoved);
            
            this.on('mouseEnter', function() {
                cursor(HAND);
            });
            this.on('mouseLeave', function() {
                cursor(ARROW);
            });
            
            // Background color changing. May cause problems unbinding...
            this.on('mouseEnter', function(e) {
                e.stage.bg.changeColor(color(e.p.color.toString()));
                e.stage.bg.fade *= -1;
            });
            this.on('mouseLeave', function(e) {
                e.stage.bg.restore();
                e.stage.bg.fade *= -1;
            });
        },
        render: function(ctx) {
            if(this.p.selected) {
                push();
                noFill();
                stroke(255);
                strokeWeight(1);
                ellipse(this.p.x, this.p.y, this.p.radius * 2 + 9, this.p.radius * 2 + 9);
                pop();
            }
            fill(this.p.color);
            //noStroke();
            stroke(backgroundColor);
            strokeWeight(4);
            ellipse(this.p.x, this.p.y, this.p.radius * 2, this.p.radius * 2);
        },
        update: function(dt) {},
        select: function() {
            if(this.p.hovering) {
                this.p.selected = !this.p.selected;
                this.trigger('selected', this);
            }
        },
        mouseMoved: function() {
            if(dist(mouseX, mouseY, this.p.x, this.p.y) <= this.p.radius) {
                if(!this.p.hovering) {
                    this.p.hovering = true;
                    this.trigger('mouseEnter', this);
                }
                this.trigger('hover');
            } else {
                if(this.p.hovering) {
                    this.p.hovering = false;
                    this.trigger('mouseLeave', this);
                }
            }
        }
    });
}