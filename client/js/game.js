function Game(){

    // Array.prototype.diff = function(a) {
    //     return this.filter(function(i) {return a.indexOf(i) < 0;});
    // };

    // Array.prototype.diff = function(a) {
    //     return this.filter(function(i) {
    //                             console.log(a,i);
    //                             return a != i;
    //                         }
    //                     );
    // };


    var canvas = document.getElementById("map-canvas");
    canvas.width  =  MAP_ORIGINAL[0].length * Pacman.BLOCK_SIZE;
    canvas.height =   MAP_ORIGINAL.length * Pacman.BLOCK_SIZE; 
    context = canvas.getContext("2d");

    var bombs = [];

    Bombe.size = Pacman.BLOCK_SIZE;

    this.map  = new Map();
    this.players = [];


    var timeStamp = Date.now();

    this.update = function(){
        
        for (var i=0;i < this.players.length; i++) {
            this.players[i].move(bombs);
            if(this.players[i].wantToDropBomb){
                this.players[i].dropBomb(bombs);
            }
        } 

        var bombsToExplode = [];
        

        if((Date.now()-timeStamp)/1000 > 1){
            timeStamp = Date.now();
            
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

                        for (var plyIdx = 0; plyIdx < this.players.length; plyIdx++) {
                            if(this.players[plyIdx].isOnCase(c.caseX,c.caseY)){
                                this.players[plyIdx].isDead = true;
                                console.log(this.players[plyIdx]);
                            }
                        }

                    }
                    // console.log(bombsToExplode);
                    // console.log(bombs[i]);
                    bombsToExplode.push(bombs[i]);
                    // console.log(bombsToExplode);
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

    this.render = function(){
        context.clearRect(0,0,canvas.width,canvas.height);
        
        this.map.draw(context);
        
        for (i=0; i < bombs.length; i++){
            bombs[i].draw(context);
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

