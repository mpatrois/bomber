
function Bombe(cx,cy,player) {
    this.caseX = cx;
    this.caseY = cy;
    this.size = Pacman.BLOCK_SIZE;
    this.time = 3;
    this.player = player;

    this.draw = function (ctx){
        context.beginPath();

        var posOnScreen = {x:this.caseX*this.size,y:this.caseY*this.size};

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


function Explosion(cx,cy){
    // this.caseX = cx;
    // this.caseY = cy;
    // this.size = Pacman.BLOCK_SIZE;
    time = 3;

    this.step = 0;
    var img = document.getElementById("bombe-sprite");
    
    this.draw = function(ctx){

        var posOnScreen = {x:cx* Pacman.BLOCK_SIZE, y: cy* Pacman.BLOCK_SIZE};

        // console.log(this.step);
        ctx.drawImage(img,115+this.step*42,117,42,42,posOnScreen.x,posOnScreen.y,Pacman.BLOCK_SIZE,Pacman.BLOCK_SIZE);
    }


    // return {
    //     'draw' : draw,
    //     // 'step' : step,
    // };
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