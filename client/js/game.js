function Game(){

    var canvas = document.getElementById("map-canvas");
    canvas.width  =  MAP_ORIGINAL[0].length * Pacman.BLOCK_SIZE;
    canvas.height =   MAP_ORIGINAL.length * Pacman.BLOCK_SIZE; 
    context = canvas.getContext("2d");

    var bombs = [];

    Bombe.size = Pacman.BLOCK_SIZE;

    this.map  = new Map();
    this.players = [];

    this.update = function(){
        if(this.players){
            for (var i=0;i < this.players.length; i++) {
                this.players[i].move(context);
            } 
        }
    }

    this.render = function(){
        context.clearRect(0,0,canvas.width,canvas.height);
        this.map.draw(context);
    
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].draw(context);
        }

        // for (i=0; i < bombs.length; i++){
        //     bombs[i].draw(context);
        // }
    }

    this.mainLoop = function(){
        this.update();
        this.render();
    }


    // start();

}

