
function Player(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = 30;
    this.color = "black";

    this.move = function(){

        this.x+=this.dx;
        this.y+=this.dy;

        if ( this.x + this.size >= canvas.width || this.x < 0){
            this.dx = 0;
        }
        if ( this.y + this.size >= canvas.height || this.y < 0){
            this.dy = 0;
        }
    }

    this.draw = function (ctx){
    	ctx.fillStyle = this.color;
    	ctx.fillRect(this.x, this.y, this.size, this.size);
    }


        
    this.drawPlayer=function() 
    {
        context.beginPath();
        context.rect(this.x,this.y, 15, 15);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
        context.font = "18px serif";
        context.fillText(this.name, this.x, this.y);
    }
        
    this.movePlayer=function(){
        // console.log(this.dir);
        if(this.dir!="STOP")
        this.move(this.dir);
    }
        
    this.setDir=function(dir){
        
        if(dir=="UP"){
            this.dy =- 1;
			this.dx = 0;
        }
        else if(dir=="DOWN"){
            this.dy=1;
			this.dx = 0;
        }
        else if(dir=="LEFT"){
           this.dx =- 1;
			this.dy = 0;
        } 
        else if(dir=="RIGHT"){
            this.dx=1;
			this.dy = 0;
        }
    }

    this.dropBomb = function(bombs){
    	var bomb = new Bombe(this.x,this.y,this.size,2);
        bomb.time = 3;
        
        setInterval(function(){
            if(bomb.time >0){
                bomb.time--;
            }
        },1000);
        
        bombs.push(bomb);
    }

}