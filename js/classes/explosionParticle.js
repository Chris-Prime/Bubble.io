function __particleClass() {
    
    Q.Entity.extend("ExplosionParticle", {
       init: function(p) {
           this._super(p, {
               particles: [],
               size: 20,
               color: color("orange"),
               gravity: new p5.Vector(0, 0.9)
           });
           
           for(var i = 0; i < this.p.size; i++) {
               var p = new p5.Vector(this.p.x, this.p.y);
               p.vel = new p5.Vector(0, 0);
               p.acc = new p5.Vector(random(-3, 3), random(-8, -12));
               p.lifespan = random(4, 7); // seconds
               p.time = .0; // seconds in float
               p.radius = 3; // pixels
               p.maxRadius = random(3, 6); // pixels
               p.growSpeed = random(5, 10); // pixels per second
               
               this.p.particles.push(p);
           }
       },
       update: function(dt) {
           for(var i = 0; i < this.p.particles.length; i++) {
               var p = this.p.particles[i];
               
               p.time += dt; // turn into seconds
               
               // If particle has died
               if(p.time >= p.lifespan) {
                   this.p.particles.splice(i, 1);
                   continue;
               } else {
                    p.radius += p.growSpeed * dt;
                    if(abs(p.radius) >= p.maxRadius) p.growSpeed *= -1;
                    
                    // Add gravity
                    p.acc.add(this.p.gravity);
                    
                    p.add(p.vel);
                    p.vel.add(p.acc);
                    p.acc.mult(0);
                    
                    // Change the size
                    
                    // If hit the ground
                    if(p.y + p.radius >= height) {
                        p.vel.y *= -0.5;
                        p.y = height - p.radius;
                    }
                   
               }
           }
           if(this.p.particles.length <= 0) this.destroy();
       },
       render: function(ctx) {
            push();
            noStroke();
            for(var i = 0; i < this.p.particles.length; i++) {
            	let p = this.p.particles[i];
            	fill(this.p.color);
            	ellipse(p.x, p.y, p.radius*2, p.radius*2);
            }
            pop();
       }
    });
    
}