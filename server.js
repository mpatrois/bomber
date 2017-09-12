// var express = require("express");
// var app     = express();
// var path    = require("path");


// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
//   //__dirname : It will resolve to your project folder.
// });


// app.listen(3000);

// console.log("Running at Port 3000");

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
var socketLab;

io.on('connection', function (socket) {

      sockets.push(socket);
   
      socket.on('disconnect', function () {
        
          // socketLab.emit('removePlayer',socket.id);
      
      });

      socket.on('FirstMessage', function (data) {
        
          // socketLab.emit('removePlayer',socket.id);
      		console.log(data);
      });
      
      socket.on('lab', function (name) 
      {
          // socketLab=socket;
      });
      
      socket.on('move', function (dirPlayer) 
      {
        var infos={id:socket.id,dir:dirPlayer};
        // socketLab.emit('move',infos);
      });
      
      socket.on('newPlayer', function (infosPlayer)
      {
          // socketLab.emit('newPlayer',{id:socket.id,col:infosPlayer.col,name:infosPlayer.name});
      });
      
    
  });



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});