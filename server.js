var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];
var nbPlayers=0;

var socketsHosts = [];
var socketsPlayers = [];

var idPlay = 1;

function getPlayers(){
  var players = [];
  for (var i = 0; i < socketsPlayers.length; i++) {
      players.push(socketsPlayers[i].__player);
  }
  return players;
};


function removeItemFromArray(item,array){
  var idx = array.indexOf(item);
  if(idx != -1) {
    array.splice(idx, 1);
  }
}

io.on('connection', function (socket) {

      socket.on('connect_host', function () {      
        socketsHosts.push(socket);
        console.log(getPlayers());
        io.sockets.emit('welcome_host',getPlayers());
      });

      socket.on('connect_player', function () {      
        socketsPlayers.push(socket);
        socket.__player = {};
        socket.__player.id   = socket.id;
        socket.__player.name = "Player n° " + (idPlay++);
        io.sockets.emit('new_player',socket.__player);
      });


      socket.on('disconnect', function () {      
        removeItemFromArray(socket,socketsHosts);
        removeItemFromArray(socket,socketsPlayers);
        io.sockets.emit('delete_player',socket.__player);
      });


      socket.on('send_player_name', function (name) {
      	socket.__player.name = name;
        io.sockets.emit('update_player',socket.__player);
      });


      socket.on('send_move', function (direction) {
          io.sockets.emit('update_player_direction',{'id':socket.__player.id,'direction':direction});
      });
      
    
  });



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});