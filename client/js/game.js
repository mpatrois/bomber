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
                    if(bombs[i].player){
                        bombs[i].player.alreadyABomb = false; 
                    }
                    bombsToExplode.push(bombs[i]);
                }
            }
        }


        bombs = bombs.filter(function(element){
            for (var i = 0; i < bombsToExplode.length; i++) {
                console.log(bombsToExplode[i],element);
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
            this.players[i].draw(context);
        }

    }

    this.mainLoop = function(){
        this.update();
        this.render();
    }


    // start();

}

