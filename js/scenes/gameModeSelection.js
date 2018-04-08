function __gameModeSelectionScene() {
    
    Q.scene("gameModeSelection", function(stage){
        
        Q.stage().on("beforerender", function(ctx){
           push();
            fill(255)
            textSize(54);
            textAlign(CENTER);
            text("Pick your gamemode", width / 2, height / 4);
           pop();
        });
        
        var buttonX = width / 2;
     
        stage.insert(new Q.UI.Button({
                label: "Singleplayer",
                y: height / 2 + 40,
                x: buttonX,
                fill: "#FFFFFF"
            }, function() {
                Q.stageScene("colorSelection");
            }));
    
        stage.insert(new Q.UI.Button({
          label: "Multiplayer",
          y: height / 2 - 40,
          x: buttonX,
          fill: "#FFFFFF",
        }, function() {
          Q.stageScene("connectionState");
        }));
        
    });
    
}