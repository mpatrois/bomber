var canvas=document.getElementById("map");
context = this.canvas.getContext("2d");


function Bombe(x,y,time) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = 20;
    this.time = 0;
    this.color = '#e7729F';

    this.draw = function (ctx){
    	context.beginPath();
		context.arc(this.x+this.size/2, this.y+this.size/2, this.size/2, 0, 2 * Math.PI, false);
		context.fillStyle = this.color;
		context.fill();
		context.lineWidth = 0;
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