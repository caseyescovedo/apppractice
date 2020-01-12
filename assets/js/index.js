// js controller for secret

// create task button
document.getElementById('task-button').addEventListener('click', function(e) {
  let taskInput = document.getElementById('task');
  console.log('taskInput: ', taskInput);
  let taskText = taskInput.value;
  console.log('taskText: ',taskText);
  taskInput.value = ''
  taskInput.placeholder = "enter new task";
  fetch('/createTask', {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body:JSON.stringify({task: taskText})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    helpAppendDom (data[0]);
  })
});

// get tasks button
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
    console.log(data);
    // iterate through the data array
    data.forEach((task, i) => {
      //create new task list item
      const newTask = document.createElement('li');
      // create description/formatting
      newTask.innerText = `${task.item} - ${task.created_at}`;
      // create html id
      newTask.id = task.task_id;
      // create delete button
      let dButton = document.createElement('button');
      dButton.innerHTML = 'delete item';
      newTask.appendChild(dButton);
      // append to task-list <ul>
      document.getElementById('task-list').appendChild(newTask);
    })

  })
});



const helpAppendDom = (taskObj) => {
  //create new task list item
  const newTask = document.createElement('li');
  // create description/formatting
  newTask.innerText = `${taskObj.item} - ${taskObj.created_at}`;
  // create html id
  newTask.id = taskObj.task_id;
  // create delete button
  let dButton = document.createElement('button');
  dButton.innerHTML = 'delete item';
  newTask.appendChild(dButton);
  // append to task-list <ul>
  document.getElementById('task-list').appendChild(newTask);
}
