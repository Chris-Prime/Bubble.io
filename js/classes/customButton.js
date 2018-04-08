function __customButtonClass() {
    Q.UI.CustomButton = Q.UI.Button.extend("UI.CustomButton", {
        init: function(p) {
            this._super(p, {
                collisionDetection: function(x, y) {
                    return true;
                },
                draw: function(ctx) {
                    
                },
                update: function(dt) {
                    
                }
            });
        }
    });
    
}