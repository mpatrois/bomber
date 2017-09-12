
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


var canvas=document.getElementById("map");
canvas.width=300;
canvas.height=300;
context = this.canvas.getContext("2d");
/*context.fillRect(20, 20, 100, 100);*/


function Personne( x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = 20;

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

}

var posX=0;
var posY=0;
var playerOne = new Personne(posX , posY);

var playerTwo = new Personne (20, 300);
var playerThree = new Personne (10, 20);
var playerFour = new Personne (12, 300);
var players = [playerOne, playerTwo, playerThree, playerFour];

document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
        playerOne.dy=-1;
        playerOne.dx=0;
    }
    else if (e.keyCode == '40') {
        // down arrow
        playerOne.dy=1;
        playerOne.dx=0;
    }
    else if (e.keyCode == '37') {
        // left arrow
        playerOne.dx=-1;
        playerOne.dy=0;
    }
    else if (e.keyCode == '39') {
        // right arrow
        playerOne.dx=1;
        playerOne.dy=0;
    }
}

function update(){
    for (i=0; i < players.length; i++){
        players[i].move();
    }
}

function render(){
    context.clearRect(0,0,canvas.width,canvas.height);
    for (i=0; i < players.length; i++){
        context.fillRect(players[i].x, players[i].y, players[i].size, players[i].size);
    }
}

function frame() {
    update();
    render();
    requestAnimationFrame(frame); // request the next frame
}

frame();

