function Game(){

   
    var canvas = document.getElementById("map-canvas");
    canvas.width  =  MAP_ORIGINAL[0].length * Pacman.BLOCK_SIZE;
    canvas.height =   MAP_ORIGINAL.length * Pacman.BLOCK_SIZE; 
    context = canvas.getContext("2d");

    var bombs = [];

    Bombe.size = Pacman.BLOCK_SIZE;

    this.map  = new Map();
    this.players = [];

    var explosions = [];


    var timeStampBomb = Date.now();
    var timeStampExplosion = Date.now();

    this.update = function(){
        
        for (var i=0;i < this.players.length; i++) {
            
            if(!this.players[i].isDead)
            {
                this.players[i].move(bombs);
                if(this.players[i].wantToDropBomb){
                    this.players[i].dropBomb(bombs);
                }
            }
        } 

        var bombsToExplode = [];
        

        if((Date.now()-timeStampBomb)/1000 > 1){
            timeStampBomb = Date.now();
            
            for (var i = 0; i < bombs.length; i++) {
                
                bombs[i].time--;
                
                if(bombs[i].time==0){

                    // console.log(bombs[i]);

                    if(bombs[i].player){
                        bombs[i].player.alreadyABomb = false;
                    }
                    var casesToDestroy = bombs[i].getCasesAimed(this.map);
                    
                    for (var caseI = 0; caseI < casesToDestroy.length; caseI++) {
                        var c = casesToDestroy[caseI];
                        this.map.map[c.caseY][c.caseX] = 2;

                        explosions.push(new Explosion(c.caseX,c.caseY));


                        for (var plyIdx = 0; plyIdx < this.players.length; plyIdx++) {
                            if(this.players[plyIdx].isOnCase(c.caseX,c.caseY)){
                                this.players[plyIdx].isDead = true;
                            }
                        }
                    }
                    bombsToExplode.push(bombs[i]);
                }
            }
        }

        // console.log(bombsToExplode,"a");


        bombs = bombs.filter(function(element){
            for (var i = 0; i < bombsToExplode.length; i++) {
                if(bombsToExplode[i] == element){
                    return false;
                }
            }
            return true;
        })

    }

    // var c=document.getElementById("myCanvas");
    // var ctx=c.getContext("2d");
    

    this.render = function(){
        context.clearRect(0,0,canvas.width,canvas.height);
        
        this.map.draw(context);
        
        for (i=0; i < bombs.length; i++){
            bombs[i].draw(context);
        }
        for (i=0; i < explosions.length; i++){
            explosions[i].draw(context);
        }
        if((Date.now()-timeStampExplosion) > 200){
            timeStampExplosion = Date.now();
            for (i=0; i < explosions.length; i++){
                explosions[i].step++;
            } 
        }
    
        for (var i = 0; i < this.players.length; i++) {
            if(!this.players[i].isDead ){
                this.players[i].draw(context);
            }
        }






    }

    this.mainLoop = function(){
        this.update();
        this.render();
    }


    // start();

}

