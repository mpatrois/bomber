
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas=document.getElementById("map");

canvas.width=800;
canvas.height=500;
context = this.canvas.getContext("2d");


var playerOne = new Player(0 ,0);

var playerTwo = new Player (20, 300);
var playerThree = new Player (10, 20);
var playerFour = new Player (12, 300);

var players = [playerOne];
// var players = [playerOne, playerTwo, playerThree, playerFour];
var bombs = [];
var bricks = [];


Bombe.size = Player.size = 20;

var nbColumn = 20;
var nbRow = 20;



// bricks.push(new Brick(1*Player.size,5*Player.size));
// bricks.push(new Brick(2*Player.size,2*Player.size));
// bricks.push(new Brick(3*Player.size,8*Player.size));
// bricks.push(new Brick(4*Player.size,2*Player.size));

playerOne.color = "red";

canvas.width = Player.size * nbColumn;
canvas.height = Player.size * nbRow;

map  = new Map(Player.size);


function update(){
    for (i=0; i < players.length; i++){
        players[i].move();
    }
}

function render(){
    context.clearRect(0,0,canvas.width,canvas.height);

    map.draw(context);
    
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

