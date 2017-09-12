
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas=document.getElementById("map");

canvas.width=300;
canvas.height=300;
context = this.canvas.getContext("2d");


var playerOne = new Player(0 ,0);

var playerTwo = new Player (20, 300);
var playerThree = new Player (10, 20);
var playerFour = new Player (12, 300);

var players = [playerOne, playerTwo, playerThree, playerFour];
var bombs = [];

playerOne.color = "red";


function update(){
    for (i=0; i < players.length; i++){
        players[i].move();
    }
}

function render(){
    context.clearRect(0,0,canvas.width,canvas.height);
    context
    for (i=0; i < players.length; i++){
        players[i].draw(context);
    }
    for (i=0; i < bombs.length; i++){
        bombs[i].draw(context);
    }
}

function frame() {
    update();
    render();
    requestAnimationFrame(frame); // request the next frame
}

document.onkeydown = function(event) {

    if (event.keyCode == '38') {
        playerOne.setDir('UP');
    }
    else if (event.keyCode == '40') {
        playerOne.setDir('DOWN');
    }
    else if (event.keyCode == '37') {
      playerOne.setDir('LEFT');
    }
    else if (event.keyCode == '39') {
       playerOne.setDir('RIGHT');
    }

    if (event.keyCode == '32') {
        playerOne.dropBomb(bombs);
    }
}

frame();

