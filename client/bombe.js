var canvas=document.getElementById("map");
context = this.canvas.getContext("2d");


function Bombe( x, y, size, time) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = 20;
    this.time = 0;

}


