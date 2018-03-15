

class Scene extends GameObject {
    
    constructor(p, defaults) {
        super(p, Utils.defaults(defaults, {
            id: 0,
            active: false
        }));
    
        this.gameObjects = [];
    }
    
    insert(obj, layer) {
    	if(obj instanceof GameObject || typeof(obj.update) === "function") {
    		if(this.gameObjects.indexOf(obj) < 0) {
    			this.gameObjects.push(obj);
    			obj.trigger('scene.inserted');
    			obj.scene = this;
    			if(typeof(layer) !== "undefined") {
    				addToLayer(obj, typeof(layer) === "boolean" ? (obj.z || 0) : layer);
    			} 
    			return obj;
    		}
    	}
    	return false;
    }

    remove(obj, layer) {
    	var i;
    	if((i = this.gameObjects.indexOf(obj)) > 0) {
    	    obj.trigger('scene.removed');
    		this.gameObjects.splice(i, 1);
    		if(layer) {
    		    removeFromLayer(obj, obj.z);
    		}
    	}
    	return false;
    }
    
    update(dt) {
        for(var i = 0; i < this.gameObjects.length; i++) {
    		if(!this.gameObjects[i].sleeping) {
    			if(this.gameObjects[i]._update) {
				    this.gameObjects[i]._update(dt / 1000);
    			} else {
    				this.gameObjects[i].update(dt / 1000);
    			}
    		}
	    }
    }
    
    destroy() {
        this.destroyInternal();
        
        this.gameObjects.forEach(function(el){
            el.scene.remove(el, true);
        });
    }
    
}