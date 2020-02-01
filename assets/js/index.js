// import { application } from 'express';

console.log('index.js is connected');

const addTaskButton = document.querySelector('#task-button');
const getTaskButton = document.querySelector('#retrieve');

//function to fetch all current todos in the database via a GET request. Tasks will then be displayed for the user
getTaskButton.addEventListener('click', function displayTasks() {
  fetch('/todos')
    .then((data) => data.json())
    //tasks will be an array of objects
    .then((tasks) => loadTasks(tasks))
    .catch((err) => console.log('error in getTaskButton fetch request', err));
});

function loadTasks(tasks) {
  console.log('tasks in loadTasks after fetch: ', tasks);
  console.log('tasks.length: ', tasks.length);
  //create a taskDiv which will hold all of the tasks we receive from our fetch request
  const taskList = document.createElement('ul');
  taskList.setAttribute('id', 'task-list');
  // loop through the tasks received from our fetch request. Create new elements for each one to be displayed in along with a delete button for each task
  for (let i = 0; i < tasks.length; i++) {
    const taskDiv = document.createElement('div');
    console.log('task from loadTasks: ', tasks[i]);
    const task = document.createElement('li');
    task.textContent = tasks[i]['item'];
    const button = document.createElement('button');
    // add the unique id from our db for each task as the id for each button so that we can ensure we're deleting the correct one.
    // task[i]['id']
    button.setAttribute('id', i);
    button.setAttribute('class', 'remove');
    button.innerHTML = 'X';

    // append items to the taskList div
    taskDiv.appendChild(task);
    task.appendChild(button);
    //append taskDiv to the taskList
    taskList.appendChild(taskDiv);
  }
  document.body.appendChild(taskList);
}

// ---- POST requests
// ** not working
addTaskButton.addEventListener('submit', function addTask(task) {
  console.log('event.target.value in addTask: ', event.target.value);
  const data = event.target.value;
  fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  }).then((data) => {
    console.log('data.json() in addTaskButton: ', data.json());
  });
});
