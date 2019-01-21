let socket = io.connect();


socket.on('connect', function(data){
  console.log("connected to the server as" + socket.id)

  //get the total connected students
  socket.emit('numConnections', 'dummyData');

  //force a reset of the students status (just to clean things up incase)
  socket.emit('clearStudentStatus')

})


socket.on('totalPaceScore', (totalPaceScore)=>{

  let speed = "slower";

  if(totalPaceScore < 5){
    speed = "slower"
  }else if(totalPaceScore == 5){
    speed = "the same"
  }else{
    speed = "faster"
  }

  // console.log(totalPaceScore);
  $('#paceStatus').html(`${speed} (${totalPaceScore})`)

});


socket.on('totalBreakNeed', (tbObject)=>{

  $('#breakStatus').html( `${tbObject.need} / ${tbObject.totalNumStudents} students need a break.`)

});

socket.on('reportNumConnections',(connectionCount)=>{

  //-1 to account for the teacher
  $('#connectedStudents').html(connectionCount -1)

})


$('#clearStudents').on('click',(e)=>{
  socket.emit('clearStudentStatus')

})


setInterval(()=>{
  socket.emit('numConnections', 'dummyData');
}, 60*1000 )
