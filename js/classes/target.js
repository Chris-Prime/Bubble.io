function __targetClass() {
    
    // Quick fix
    
    // Šteimane 26th March of 2018 :)
    
    Q.Entity.extend("Target", {
       init: function(p) {
           this._super(p, {
               maxRadius: 10,
               color: "#FFFFFF",
               radius: 1,
               growSpeed: 10 // pixels per seconds
           });
           
           this.on("mousePressed");
       },
       mousePressed: function() {
         if(dist(mouseX, mouseY, this.p.x, this.p.y) <= this.p.radius) {
             this.trigger('hit');
             this.hit();
         }  
       },
       hit: function(addParticle) {
         addParticle = addParticle || true;
         this.destroy();
         
         // Add particle
         if(addParticle) {
             var score = random(1, 20);
             this.stage.insert(new Q.ExplosionParticle({
                 color: heatColor(score, 1, 20),
                 size: 35,
                 x: this.p.x,
                 y: this.p.y
             }));
             this.stage.insert(new Q.TextPopup({
                 label: "+" + round(score),
                 //color: heatColor(score, 1, 20),
                 x: this.p.x,
                 y: this.p.y - this.p.radius - 5
             }));
         }
       },
       grow: function(dt) {
         this.p.radius = clamp(this.p.radius + this.p.growSpeed * dt, 0, this.p.maxRadius);
       },
       update: function(dt) {
           this.grow(dt);
       },
       render: function(ctx) {
           noStroke();
           fill(this.p.color);
           ellipse(this.p.x, this.p.y, this.p.radius * 2, this.p.radius * 2);
       }
    });
    
}