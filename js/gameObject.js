class GameObject extends p5.Vector {
    
    constructor(p = {}, defaults = {}) {
        super(p.x, p.y, p.z);
        
        this.p = Utils.defaults(p, {
            sleeping: false,
            hidden: false,
            private: false,
            lastPos: this.copy()
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
        
        this.events = [];
    }
    
    draw(ctx) {
        
    }
    
    update(dt) {
        
    }
    
    after(time, callback) {
        setTimeout(callback, time, this);
    }
    
    destroy() {
        // This removes any reference from 'engine'
        removeFromLayer(this); // Stops rendering this object
        removeFromGameObjects(this); // Stops calling updates
    }
    
    // Event System
    
    on(event, callback) {
        // Another tricky way, 'push' returns length of massive
        // because the new element is pushed to end of an array
        // we can get key 'length - 1'
        if(!this.events[event]) {
            // Event doesn't exist, lets add it
            this.events[event] = [];
        }
        return this.events[event].push(callback) - 1;
    }
    
    off(event, id) {
        id = typeof(id) === "function" ? this.events[event].indexOf(id) : id;
        if(!id) {
            delete this.events[event];
        } else {
            this.events[event].splice(id, 1);
        }
    }
    
    trigger(event, data) {
        for(var i = 0; i < this.events[event].length; i++) {
            this.events[event][i](this, data);
        }
    }
    
}