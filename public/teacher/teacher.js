let socket = io.connect();



socket.on('connect', function(data){
  console.log("we connected to the server as" + socket.id)
})


socket.on('studentList', (students)=>{

  // console.log(students);

  let totalPaceScore = 0;
  for (let i in students) {
    console.log(students[i]);
    totalPaceScore += students[i].paceRange
  }
  totalPaceScore = totalPaceScore / students.length;

  let speed = "slower";

  if(totalPaceScore  <=5){
    speed = "slower"
  }else{
    speed ="faster"
  }

  // console.log(totalPaceScore);
  $('#paceStatus').html(`${speed} (${totalPaceScore})`)

  totalBreakTruth = 0;
  for (let student in students) {
    if(student.breakCheck) totalBreakTruth ++ ;
  }

  $('#breakStatus').html( `${totalBreakTruth} / ${students.length} students need a break.`)



})
