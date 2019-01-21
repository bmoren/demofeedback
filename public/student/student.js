let socket = io.connect();


let student = {
  'paceRange': 5,
  'breakChange': false
}

socket.on('connect', function(data){
  console.log("we connected to the server as" + socket.id)
})


$('#paceRange').on('change', (e)=>{
  console.log($('#paceRange').val());

  student.paceRange = $('#paceRange').val()

  socket.emit('updateStudentStatus', student )


})


$('#breakCheck').on('change', (e)=>{
  console.log($('#breakCheck').is(':checked'));

  student.breakCheck = $('#breakCheck').is(':checked')

  socket.emit('updateStudentStatus', student )

})


// testing...

setInterval(()=>{

  student = {
    'paceRange': Math.floor(Math.random()*10),
    'breakChange': Math.floor(Math.random()*2)
  }

  console.log(student);


  socket.emit('updateStudentStatus', student )

  socket.emit('updateStudentStatus', student )
},3000)
