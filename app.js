const express = require('express'); //make express available
const app = express(); //invoke express
const server = require('http').Server( app ) // start the express server instance
const io = require('socket.io')(server) // use socket.io for real time connections aka. wesockets

let port = process.env.PORT || 3000 ;


//serve out any static files in our public HTML folder
app.use(express.static('public'))

io.on('connection', function(socket){
  console.log(socket.id);


  socket.on('updateStudentStatus', (student)=>{
    console.log(student);
    socket.student = student;

    let students = [];

    //generate an array of all the students feedback to send down to the teacher side of things
    for (var singleStudent in io.sockets.sockets) {
      // console.log(singleStudent);
        students.push(singleStudent)
    }

    io.emit('studentList', students)

  })



})

//makes the app listen for requests on port 3000
server.listen(port, function(){
  console.log("app listening on port 3000!")
})
