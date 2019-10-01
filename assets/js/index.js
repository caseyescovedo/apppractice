const taskInput = document.getElementById('task');
const taskButton = document.getElementById('task-button');
const getButton = document.getElementById('retrieve');
const taskList = document.getElementById('task-list');

console.log('task input', taskInput);

getButton.addEventListener('click', function() {
  fetch('/tasks')
  .then((res) => res.json()) // parse result
  .then((tasks) => { // loop through tasks and display each in <li>
    console.log(tasks);
    for (let i = 0; i < tasks.length; i += 1) {
      const listItem = document.createElement('li');
      listItem.innerHTML = tasks[i].item;
      taskList.appendChild(listItem);
    }
  })
});

taskButton.addEventListener('click', function() {
  console.log('taskinput', taskInput.value);
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: taskInput.value}) // body data type must match "Content-Type" header
  })
  .then((response) => response.json())
  .then((result) => {
    console.log('reached the end of the post fetch', result);
  })
});


