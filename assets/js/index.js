// js controller for secret

document.getElementById('task-button').addEventListener('click', function(e) {
  let taskInput = document.getElementById('task');
  console.log('taskInput: ', taskInput);
  let taskText = taskInput.value;
  console.log('taskText: ',taskText);
  taskInput.value = ''
  taskInput.placeholder = "enter new task";
  fetch('/createTask', {
    method: POST,
    headers: {
      "content-type": "application/json"
    },
    body:JSON.stringify({task:})
  })
});

document.getElementById('retrieve').addEventListener('click', function(e) {
  let retrieveTasks = document.getElementById('task');
  console.log('I clicked: ', retrieveTasks);
  // let taskText = taskInput.value;
  // console.log('taskText: ',taskText);
  // taskInput.value = ''
  // taskInput.placeholder = "enter new task";
  fetch('/getTasks')
  .then(response => response.json())
  .then(data => {
    // iterate through the data array
    data.forEach((task, i) => {
      
    })
  })
  })

});
