let socket = io.connect();

//the student object, send this to the server when things get updated, it gets attached to the socket on the server.

let student = {
  'paceRange': 5,
  'breakCheck': false
}

console.log(student);


socket.on('connect', function(data){
  console.log("we connected to the server as" + socket.id)
})

//check and update the pace and send to the teacher
$('#paceRange').on('change', (e)=>{
  // console.log($('#paceRange').val());

  student.paceRange = $('#paceRange').val()

  socket.emit('updateStudentStatus', student )

})

//check and update the need for a break and send to the teacher
$('#breakCheck').on('change', (e)=>{
  // console.log($('#breakCheck').is(':checked'));

  student.breakCheck = $('#breakCheck').is(':checked')

  socket.emit('updateStudentStatus', student )

})

//recieve message from teacher to reset status (useful after taking a break)
socket.on('clearStatus', (data)=>{

  // reset the display
  $('#paceRange').val( 5 );
  $('#breakCheck').prop('checked', false);

  //reset the object
  // console.log("pre",student);
  student = {
    'paceRange': 5,
    'breakCheck': false
  }
  // console.log("post",student);

  // console.log($('#paceRange').val());

  //update the status
  socket.emit('updateStudentStatus', student )


})


// testing...

// setInterval(()=>{
//
//   student = {
//     'paceRange': Math.floor(Math.random()*10),
//     'breakCheck': Math.floor(Math.random()*2) ? true : false
//   }
//
//   console.log(student);
//
//
//   socket.emit('updateStudentStatus', student )
//
// },3000)
