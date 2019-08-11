var socket = io('/');
var globTest;


function createRoom()
{
  console.log("test");

  let randString = "aBc"; //testing

  localStorage.setItem("name", document.getElementById("hostName").value);

  window.location = window.location.href + randString;
}

function lobbyLoaded()
{
  console.log(localStorage.getItem("name"));

  console.log(window.location.pathname.split('/')[1]); // this is the first url arg

  socket.emit('joinroom', window.location.pathname.split('/')[1]);

  //test
  socket.on("new user", function(data) {
    console.log("New user. Total users: ", data); 
  });
}

