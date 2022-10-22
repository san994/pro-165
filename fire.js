AFRAME.registerComponent("fire",{
    init:function(){
        this.shoot()

    },
    shoot:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z"){
                var fireball = document.createElement("a-entity");
                fireball.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.1
                });

                var cam = document.querySelector("#cam-rig");
                var pos = cam.getAttribute("position");
                fireball.setAttribute("position",{
                    x:pos.x,
                    y:pos.y+1,
                    z:pos.z-0.5
                });

                var cam3d = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                cam3d.getWorldDirection(direction);

                fireball.setAttribute("velocity", direction.multiplyScalar(-50));
                fireball.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:0
                })
                
                fireball.addEventListener("collide",this.remove);

                var scene = document.querySelector("#scene");
                scene.appendChild(fireball);
            }
        })
    },
    remove:function(e){
      var scene = document.querySelector("#scene");
      //bullet element 
      var element = e.detail.target.el; 
      //element which is hit 
      var elementHit = e.detail.body.el; 
      if(elementHit.id.includes("enemy")){ 
        var countMonsterEl = document.querySelector("#countTank"); 
        var monsterFired = parseInt(countMonsterEl.getAttribute("text").value); 
        monsterFired -= 1; 
        countMonsterEl.setAttribute("text", { value: monsterFired }); 
        if (monsterFired === 0) { 
            var txt = document.querySelector("#completed"); 
            txt.setAttribute("visible", true); 
        } 
        scene.removeChild(elementHit); 
        } 
        
     //remove event listener 
     element.removeEventListener("collide", this.remove); 
     //remove the bullets from the scene 
     scene.removeChild(element);
    }
})