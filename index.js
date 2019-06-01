var express = require("express");
var socket = require("socket.io");
var http = require("http");

var app = express();

var server = http.createServer(app);
//static
app.use(express.static('public'));
var port = process.env.PORT || 3000;

//socket 
var io = socket(server);

io.on("connection",function(socket){
   console.log("Made socket connection",socket.id);

   socket.on('chat',function(data){
         io.sockets.emit('chat',data);
   });
   socket.on('typing',function(data){
         socket.broadcast.emit('typing',data);
   });

});

server.listen(port,function(){
     console.log("server started");
});