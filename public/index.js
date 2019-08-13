var socket = io('/');
var globTest;


function createRoom()
{
  console.log("test");

  let randString = Math.random().toString(13).replace('0.', ''); //testing
  //TO DO: check with server to make sure this lobby doesn't already exist... or weirdness happens

  localStorage.setItem("name", document.getElementById("hostName").value);

  window.location = window.location.href + randString;
}

function lobbyLoaded()
{
  console.log(localStorage.getItem("name"));

  console.log(window.location.pathname.split('/')[1]); 
  //this is the first part of the URL

  //send object with 
  socket.emit('joinroom', {nickname: localStorage.getItem("name"), room: window.location.pathname.split('/')[1]});

  //test
  socket.on("new user", function(data) {
    console.log("New user. Total users: ", data); 
  });
}

