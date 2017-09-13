
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

        var app4 = new Vue({
          el: '#table-players',
          data: {
            players: players
          }, 
          methods: {
            playersChanged: function(players) {
                // console.log(this.players);
                // console.log(this.players);
                this.players = players;
              // Vue.set(this.players,players);
              // alert(this.numbers[1]);
            }
          }
        })

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
            players = [];
            for (var i = 0; i < allPlayers.length; i++) {
                var newPlayer = new Player(map);
                newPlayer.id = allPlayers[i].id
                newPlayer.name = allPlayers[i].name

                players.push(newPlayer);
            }
            app4.playersChanged(players);
        });

        socket.on('new_player', function (newPlay) {
            console.log(newPlay);
            console.log(players);

            var newPlayer = new Player(map);
                newPlayer.id = newPlay.id
                newPlayer.name = newPlay.name

            players.push(newPlayer);

            app4.playersChanged(players);
        }); 

        socket.on('update_player', function (play) {
            for (var i = 0; i < players.length; i++) {
                if(players[i].id == play.id){
                    players[i].name = play.name;
                }
            }
            app4.playersChanged(players);
        });

        





    });



})();