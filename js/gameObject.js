class GameObject extends p5.Vector {
    
    constructor(p = {}, defaults = {}) {
        super(p.x, p.y, p.z);
        
        this.p = Utils.defaults(p, {
            sleeping: false,
            hidden: false,
            private: false
        });
        this.p = Utils.defaults(this.p, defaults);
        
        delete this.p.x;
        delete this.p.y;
        delete this.p.z;
        
        if(!this.p.private) {
            if(!this.p.hidden) {
                addToGameObjects(this, true);
            }
        }
    }
    
    draw(ctx) {
        
    }
    
    update(dt) {
        
    }
    
    destroy() {
        removeFromLayer(this);
        removeFromGameObjects(this);
    }
    
}