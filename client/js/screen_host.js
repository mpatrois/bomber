
(function(){


    document.addEventListener('DOMContentLoaded',function(){

        var game = new Game();

        window.setInterval(function(){
            game.mainLoop();
        }, 1000 / Pacman.FPS);


         var tablePlayers = new Vue({
          el: '#table-players',
          data: {
            players: game.players
          }, 
          methods: {
            playersChanged: function(players) {
                this.players = game.players;
            }
          }
        })

        var socket = io.connect();

        socket.on('connect', function () {
            socket.emit("connect_host");
        });

        socket.on('disconnect', function () {
            socket.emit("disconnect_host");
        });

        socket.on('welcome_host', function (allPlayersData) {
            game.players = [];
            for (var i = 0; i < allPlayersData.length; i++) {
                var newPlayer = new Player(game.map);
                newPlayer.id = allPlayersData[i].id;
                newPlayer.name = allPlayersData[i].name;
                newPlayer.color = allPlayersData[i].color;

                game.players.push(newPlayer);
            }
            tablePlayers.playersChanged(game.players);
        });

        socket.on('new_player', function (newPlayData) {
            var newPlayer = new Player(game.map);
                newPlayer.id = newPlayData.id
                newPlayer.name = newPlayData.name
                newPlayer.color = newPlayData.color

            game.players.push(newPlayer);

            tablePlayers.playersChanged(game.players);
        }); 

        socket.on('update_player', function (play) {
            for (var i = 0; i < game.players.length; i++) {
                if(game.players[i].id == play.id){
                    game.players[i].name = play.name;
                }
            }
            tablePlayers.playersChanged(game.players);
        });

        socket.on('update_player_direction', function (data) {
            for (var i = 0; i < game.players.length; i++) {
                if(game.players[i].id == data.id){
                    game.players[i].setDue(data.direction);
                }
            };
        });

        socket.on('delete_player', function (dataPlay) {
            var idx = -1;
            for (var i = 0; i < game.players.length; i++) {
                if(game.players[i].id == dataPlay.id){
                    idx = i;
                }
            }
            game.players.splice(idx, 1);
            tablePlayers.playersChanged(game.players);
        });


    });



})();