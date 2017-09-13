var canvas=document.getElementById("map");
context = this.canvas.getContext("2d");


function Bombe( x, y, size, time) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = size;
    this.time = 0;
    this.color = '#e7729F';

    this.draw = function (ctx){
        context.beginPath();
        context.arc(this.x+this.size/2, this.y+this.size/2, this.size/2, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.lineWidth = 0;

        context.font = '18pt Calibri';
        context.textAlign = "center"; 
        context.fillStyle = 'blue';
        context.fillText(this.time, this.x + this.size/2, this.y + this.size/2 +7);
    }

}


