const express = require('express'); //make express available
const app = express(); //invoke express
const server = require('http').Server( app ) // start the express server instance
const io = require('socket.io')(server) // use socket.io for real time connections aka. wesockets

let port = PROCESS.ENV.PORT || 3000 ;

//serve out any static files in our public HTML folder
app.use(express.static('public'))

io.on('connection', function(socket){
  console.log(socket.id);


  socket.on('login', (userInfo)=>{
    socket.userInfo = userInfo;
  })

  socket.on('pollSpeed', (pollSpeed)=>{
    socket.pollSpeed =  pollSpeed;

  })

})

//makes the app listen for requests on port 3000
server.listen(, function(){
  console.log("app listening on port 3000!")
})
