
function Bombe(cx,cy,player) {
    this.caseX = cx;
    this.caseY = cy;
    this.size = Pacman.BLOCK_SIZE;
    this.time = 3;
    this.player = player;

    this.draw = function (ctx){
        context.beginPath();

        var posOnScreen = {x:this.caseX*this.size,y:this.caseY*this.size}

        context.arc(posOnScreen.x+this.size/2,posOnScreen.y+this.size/2, this.size/2, 0, 2 * Math.PI, false);
        context.fillStyle = this.player.color ;
        context.fill();
        context.lineWidth = 0;

        context.font = '14pt Calibri';
        context.textAlign = "center"; 
        context.fillStyle = 'white';
        context.fillText(this.time, posOnScreen.x+this.size/2,posOnScreen.y+this.size/2 +7);
    }


    this.onexplode = function(){

    }

}


// function Brick(x,y){
// 	this.x = x;
//     this.y = y;
//     this.size = 20;
//     this.color = "orange";

//      this.draw = function (ctx){
//  	    ctx.fillStyle = this.color;
// 		ctx.fillRect(this.x, this.y, this.size, this.size);
//     }


// }