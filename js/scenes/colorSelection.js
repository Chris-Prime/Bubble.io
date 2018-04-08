function __colorSelectionScene() {
    Q.scene("colorSelection", function(stage){
        var colors = Q.state.get("colors")[0];
		var radius = 15;
		var spacing = 15; // Each circle will be 10 pixels apart
		Q.state.set("chosenColor", color("#FFFFFF"));
		
		// add buttons
		addColorButtons(stage, colors, radius, spacing);
		
		// add fake "layer" background
        var bg = {
            fade: 5,
            alpha: 0,
            minAlpha: 0,
            maxAlpha: 180,
            target: color(51),
            color: color(backgroundColor.toString()),
            distance: [0, 0, 0, 0],
            increment: [0, 0, 0, 0],
            render: function(ctx) {
                fill(this.color);
                rect(0, 0, width, height);
            },
            update: function(dt) {
                this.alpha = clamp(this.alpha, this.minAlpha, this.maxAlpha);
                this.color.setAlpha(this.alpha);
            
                transition(this.color, this.target, this.increment);
            },
            changeColor: function(color) {
                this.target = color;
                
                this.distance = calculateDistance(this.color, this.target);
                this.increment = calculateIncrement(this.distance, 60, 0.5);
            },
            restore: function() {
                this.changeColor(color(backgroundColor.toString()));
            }
        };
        stage.bg = bg;
        
        Q.stage().on("beforerender", function(ctx){
		    Q.stage().bg.update(0);
		    Q.stage().bg.render(ctx);
		});
        
        // Text (doesn't work, don't know why. It's impossible to listen to Stage events from this scope, wtf?)
        Q.stage().on('render', function(ctx) {
           push();
            textAlign(CENTER);
            textSize(64);
            noStroke();
            fill(230);
            text("Pick a color", width / 2, height / 2 - 84);
            // line
            stroke(255);
            strokeWeight(2);
            
            line(Q.stage().sx, Q.stage().sy + Q.stage().h + 15, Q.stage().sx + Q.stage().w, Q.stage().sy + Q.stage().h + 15);
           pop();
        });
        
        
    });
}

function addColorButtons(stage, colors, radius, spacing) {
    var w = colors.length * (radius + spacing * 2);
	var h = radius;
	// Lets find sx and sy. We now have rectangle width which is same as height
	// Let's align it in the center by getting upper left corner point
	var sx = width / 2 - w / 2;
	var sy = height / 2 - h / 2
	
	stage.sx = sx;
	stage.sy = sy;
	stage.w = w;
	stage.h = h;
	
	for(var i = 0; i < colors.length; i++) {
        var b = new Q.ColorButton({
    		x: (sx + radius / 2) + (w / colors.length) * i + spacing,
    		y: (sy + radius / 2),
            color: color(colors[i]),
            radius: radius,
            selected: Q.state.get("chosenColor").toString() === color(colors[i]).toString()
        });
        b.on('selected', function(b){
            Q("ColorButton").items.forEach(function(el){
               if(b !== el) {
                   el.p.selected = false;
               } 
            });
            Q.state.set("chosenColor", b.p.color);
        })
        
        stage.insert(b);
    }
    
    stage.insert(new Q.UI.Button({
        label: "      Play      ",
        fill: "#FFFFFF",
        x: width / 2,
        y: height / 2 + height * 0.2,
        width: 100
    }));
}