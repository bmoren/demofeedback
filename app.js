const express = require('express'); //make express available
const app = express(); //invoke express
const server = require('http').Server( app ) // start the express server instance
const io = require('socket.io')(server) // use socket.io for real time connections aka. wesockets

let port = process.env.PORT || 3000 ;

let totalConnectionCount = 0;


//serve out any static files in our public HTML folder
app.use(express.static('public'))

io.on('connection', function(socket){
  console.log(socket.id);

  // console.log(Object.keys(io.sockets.sockets).length);
  totalConnectionCount = Object.keys(io.sockets.sockets).length;
  // console.log(io.sockets.sockets);


  //report the total number of connections
  socket.on('numConnections', (data)=>{
     io.emit('reportNumConnections', totalConnectionCount);
  })

  socket.on('clearStudentStatus',(data)=>{
    io.emit('clearStatus');
  })


  socket.on('updateStudentStatus', (student)=>{
    // console.log(student);
    //set the incoming student status to be bound to the temp socket connection
    socket.student = student;


    //calculate the pace score and average it, then send it to the teacher.
    let totalPaceScore = 0;
    for (let i in io.sockets.sockets) {
      if(io.sockets.sockets[i].student){
        // console.log(io.sockets.sockets[i].student.paceRange);
        totalPaceScore += Number(io.sockets.sockets[i].student.paceRange)
      }
    }
    //divide the total score by the number of students (-1 to account for a teacher)

    totalPaceScore = totalPaceScore / (totalConnectionCount -1) ;
    totalPaceScore = Math.floor(totalPaceScore);

    //would be nice to also send down a list of all the current selection of paces to 'weight' how good the agerage is, there is likely a more equitable way to do this...
    io.emit('totalPaceScore', totalPaceScore)


    //tally the folks who need a break.
    let totalBreakNeed = 0;
    for (let i in io.sockets.sockets) {
      if(io.sockets.sockets[i].student){
        console.log(io.sockets.sockets[i].student.breakCheck);
        if(io.sockets.sockets[i].student.breakCheck){ totalBreakNeed ++}
        // console.log(totalBreakNeed);
        io.emit('totalBreakNeed', {'need':totalBreakNeed, 'totalNumStudents': totalConnectionCount -1 })
      }
    }

  }) //close updateStudentStatus

}) //close connection

//makes the app listen for requests on port 3000
server.listen(port, function(){
  console.log("app listening on port 3000!")
})
