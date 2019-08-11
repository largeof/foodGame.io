var socket;

function sendInputText()
{
  console.log("test");

  let userInput = document.getElementById("inputText").value;
  
  socket.emit('message', userInput)
}

socket = io();
socket.on('message',
// When we receive data
function(data) 
{
  document.getElementById("pText").innerHTML += data + "<br>";
}   );

//send message
