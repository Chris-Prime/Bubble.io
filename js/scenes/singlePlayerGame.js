
function __singlePlayerGameScene() {
    
    Q.scene("singlePlayerGame", function(stage){
        
        // Add hud
        // var hud = stage.insert(new Q.Entity.HUD());
        
        // // Add target emitter
        // var emitter = stage.insert(new Q.Entity.TargetEmitter({
        //     // TODO
        // }));
        
        stage.insert(new Q.Target({
            x: width / 2,
            y: height / 2
        }));
        
    });
    
}