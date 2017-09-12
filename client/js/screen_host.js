
(function(){


    document.addEventListener('DOMContentLoaded',function(){

        var canvas = document.getElementById("map-canvas");
        canvas.width  =  MAP_ORIGINAL[0].length * Pacman.BLOCK_SIZE;
        canvas.height =   MAP_ORIGINAL.length * Pacman.BLOCK_SIZE; 


        context = canvas.getContext("2d");

        var bombs = [];

        Bombe.size = Pacman.BLOCK_SIZE;

        map  = new Map();

        var players = [];

        // player = new Player(map);
        
        players = [];

        function update(){
            for (var id in players) {
                players[id].move(context);
            }
        }

        function render(){
            context.clearRect(0,0,canvas.width,canvas.height);

            map.draw(context);
            
            for (var id in players) {
                players[id].draw(context);
            }
            for (var i = 0; i < players.length; i++) {
                players[i].draw(context);
            }

            for (i=0; i < bombs.length; i++){
                bombs[i].draw(context);
            }
        }

        function mainLoop() {
            update();
            render();
        }

        window.setInterval(mainLoop, 1000 / Pacman.FPS);

        var keyMap = {};
        keyMap[KEY.ARROW_LEFT]  = LEFT;
        keyMap[KEY.ARROW_UP]    = UP;
        keyMap[KEY.ARROW_RIGHT] = RIGHT;
        keyMap[KEY.ARROW_DOWN]  = DOWN;

        document.addEventListener("keydown", function(e) {
                if (typeof keyMap[e.keyCode] !== "undefined") { 
                    
                    for (var id in players) {
                        players[id].setDue(keyMap[e.keyCode]);
                    }

                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                return true;
            }, true);

        var socket = io.connect();
        
        var myPlayer = {
            id:0,
            name:"Thomas"
        }

        socket.on('connect', function () {
            socket.emit("connect_host");
        });

        socket.on('disconnect', function () {
            socket.emit("disconnect_host");
        });

        socket.on('welcome_host', function (allPlayers) {
            players = {};
            for (var i = 0; i < allPlayers.length; i++) {
                var newPlayer = new Player(map);
                // newPlayer.setCase(1,1);
                
                players[allPlayers[i].id] = newPlayer;

            }

            console.log(players);
        });

        socket.on('new_player', function (newPlayerId) {

            var newPlayer = new Player(map);
            // newPlayer.setCase(1,1);
            players[newPlayerId] = newPlayer;
            console.log(players);
        });





    });



})();