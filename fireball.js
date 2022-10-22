AFRAME.registerComponent("fireball",{
    init:function(){
        setInterval(this.fire,2000);
    },
    fire:function(){
        var els = document.querySelectorAll(".enemy");
        for(var i=0; i<els.length;i++){
            var fireball = document.createElement("a-entity");
            fireball.setAttribute("geometry",{
               primitive:"sphere",
               radius:0.1
            })
            fireball.setAttribute("material","color","#282B29");
   
            var position = els[i].getAttribute("position");
            fireball.setAttribute("position",{x:position.x+1.5,y:position.y+3.5,z:position.z});
           
            var scene = document.querySelector("#scene");
            scene.appendChild(fireball);
   
            var player = document.querySelector("#weapon").object3D;
            var enemy = els[i].object3D;

            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            var direction = new THREE.Vector3();
            direction.subVectors(position1,position2).normalize();

            fireball.setAttribute("velocity",direction.multiplyScalar(10));
            // fireball.setAttribute("dynamic-body",{mass:0,shape:"sphere"});

            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);
            
            fireball.addEventListener("collide",(e)=>{
               if(e.detail.body.el.id === "weapon"){
                   if(playerLife>0){
                       playerLife-=1;
                       element.setAttribute("text",{value:playerLife});
                   }
                   if(playerLife<=0){
                       var txt = document.querySelector("#over");
                       txt.setAttribute("visible",true);
                       
                       var tankEl = document.querySelectorAll(".enemy");
                       for(var i=0;i<tankEl.length;i++){
                           scene.removeChild(tankEl[i]);
                       }
                   }
               }
            })
        }

    }
})