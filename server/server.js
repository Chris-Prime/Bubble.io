var express = require('express');
var app = express();
var io = require('socket.io')(app);

const PORT = 8081;

var server = app.listen(PORT, function(){
    console.log("Listening for connections on http://"+server.address().address+":"+server.address().port);
});

function handler(req, res) {
    console.log(req, res);
}

//
var clients = [];

io.on('connection', function(socket){
    if(clients.length >= 2) {
        socket.emit('status', {
           status: 0x00,
           message: "Server full"
        });
        console.log("Client disconnected due to: Server full");
    } else {
        clients.push(socket);
        
        socket.on('packet', handlePacket);
        
        console.log("Client connected");
    }
});

function handlePacket(arg1, arg2, arg3) {
    console.log(arg1, arg2, arg3);
}