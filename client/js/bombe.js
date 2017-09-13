
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


    this.getCasesAimed = function(map){

        var cases = [];

        var isWall = false;


        //RIGHT
        for (var cX = this.caseX; cX < this.caseX + 3; cX++) {

            if (map.isWall(cX,this.caseY)){
                isWall = true;
            };

            if(!isWall){
                cases.push({caseX:cX,caseY:this.caseY});
            }
        }

        isWall = false;

        //LEFT
        for (var cX = this.caseX-1; cX > this.caseX - 3; cX--) {

            if (map.isWall(cX,this.caseY)){
                isWall = true;
            };

            if(!isWall){
                cases.push({caseX:cX,caseY:this.caseY});
            }
        }


        isWall = false;
        //UP
        for (var cY = this.caseY-1; cY > this.caseY - 3; cY--) {

            if (map.isWall(this.caseX,cY)){
                isWall = true;
            };

            if(!isWall){
                cases.push({caseX:this.caseX,caseY:cY});
            }
        }

         var isWall = false;
        //DOWN
        for (var cY = this.caseY+1; cY < this.caseY + 3; cY++) {

            if (map.isWall(this.caseX,cY)){
                isWall = true;
            };

            if(!isWall){
                cases.push({caseX:this.caseX,caseY:cY});
            }
        }


        return cases;


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