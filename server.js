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

class foodRoom
{
  constructor()
  {
    this.gameStarted=false;
    this.host;
    this.players=[];
  }
}

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', function (socket) 
{
  //socket joins

  //TO DO: make check to see if ok to join room

  socket.on('joinroom', function(data) 
  {
    console.log("The client joined " + data.room);
    this.join(data.room);

    //set name
    socket.nickname=data.nickname;
    if (typeof rooms[data.room] === 'undefined')
    {
      rooms[data.room] = new foodRoom(); 
      rooms[data.room].players.push({nickname: data.nickname, id: socket.id});
    }
    else
    {
      rooms[data.room].count++;
      rooms[data.room].players.push({nickname: data.nickname, id: socket.id});
    }

    console.log(rooms[data.room].players.length);

    for (let i=0; i<rooms[data.room].players.length; i++)
    {
      console.log(rooms[data.room].players[i].nickname);
    }


    io.to(data.room).emit("new user", rooms[data.room].count); // this should give names of players

    socket.on('disconnect', function() {
      //splice to remove
      for (let i=0; i<rooms[data.room].players.length; i++)
      {
        if (rooms[data.room].players[i].id == socket.id)
        {
          rooms[data.room].players.splice(i, 1); //removes from list!
        }
      }
      console.log("Client has disconnected");
      //TO DO: update clients to up refresh lists or wateva
    });
  });
}
);

function findClientsSocketByRoomId(roomId) {
  var res = []
  , room = io.sockets.adapter.rooms[roomId];
  if (room) {
      for (var id in room) {
      res.push(io.sockets.adapter.nsp.connected[id]);
      }
  }
  return res;
  }

