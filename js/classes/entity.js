function __entityClass() {
    Q.GameObject.extend("Entity", {
       init: function(props, defaultProps) {
            this.p = Q._extend({ 
            x: 0,
            y: 0,
            z: 0,
            opacity: 1,
            angle: 0,
            frame: 0,
            type: Q.SPRITE_DEFAULT | Q.SPRITE_ACTIVE,
            name: '',
          },defaultProps);
    
          Q._extend(this.p,props);
    
          this.p.id = this.p.id || Q._uniqueId();
       },
       destroy: function() {
         this.stage.remove(this);  
       },
       mark: 999999999
    });
}