function __connectionStateScene(stage) {
    
    Q.scene("connectionState", function(stage){
        
        stage.cancelConnection = function() {
            if(Q.stage().connecting) {
                // Change progress bar
                Q.stage().pb.color = "#CC0000";
                Q.stage().pb.acc = 0.95;
                
                Q.stage().connecting = false;
                // TODO
            }
        }
       
       stage.pb = {
           y: height / 2 + 64,
           dir: 120 / 0.5 * -1, // 60 pixels per second 
           width: 120,
           maxWidth: 120,
           minWidth: 5,
           acc: 1, // acceleration, to stop the progress bar slowly
           color: "FFFFF",
           update: function(dt) {
               this.width += this.dir * dt * this.acc;
               // clamp
               if(this.width <= this.minWidth || this.width >= this.maxWidth) {
                   this.width = clamp(this.width, this.minWidth, this.maxWidth);
                   this.dir *= -1;
               }
               this.dir *= this.acc;
               if(abs(this.dir) < 1) this.dir = 0;
           },
           render: function(ctx) {
               push();
               fill(this.color);
               noStroke();
               rect(this.getX(), this.y, this.width, 10);
               pop();
           },
           getX: function() {
               return width / 2 - this.width / 2;
           }
       };
       
       Q.stage().on("beforerender", function(ctx) {
          push();
            textAlign(CENTER);
            textSize(54);
            fill(255);
            if(!Q.stage().connecting) {
                text("Connection cancelled", width / 2, height / 2);
            } else {
                text("Looking for an enemy", width / 2, height / 2);
            }
          pop();
          
          Q.stage().pb.update(Q.dt);
          Q.stage().pb.render(Q.ctx);
       });
       
       stage.insert(new Q.UI.Button({
           x: 60,
           y: 30,
           label: "  Back  ",
           fill: "#FFFFFF"
       }, function() {
           Q.stage().cancelConnection();
           Q.stageScene("gameModeSelection");
       }));
       
       
       
       // Lets try to connect
       Q.stage().connecting = true;
       
        
    });
    
}