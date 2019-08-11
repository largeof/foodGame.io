//killall -9 node if error

var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

//if there is url parameter
app.get("/:word", function(req, res) {
  let word = req.params.word;
  res.sendFile( __dirname + "/public/lobby.html");
});


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);
var rooms = {};

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new client: " + socket.id);

    socket.on('joinroom', function(room) {
      console.log("The client joined " + room);
      this.join(room);
      if (typeof rooms[room] === 'undefined')
      {
        rooms[room] = {count: 1};
      }
      else
      {
        rooms[room].count++;
      }
      io.to(room).emit("new user", rooms[room].count)
    });
    
    socket.on('disconnect', function() {
      //if part of a room subtract them from it?
      console.log("Client has disconnected");
    });
  }
);

