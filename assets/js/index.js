window.onload = function () {
const taskList = document.getElementById('task-list');
const retrieve = document.getElementById('retrieve');
const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('task-button');

// check for cookie on page load
const checkCookie = () => {
  fetch('http://localhost:3333/secret', {
    method: 'GET', 
    cookie: document.cookie
  })
  .then(res => console.log(res))
  .then(() => {
    console.log('sucess')
  })
  .catch(err => console.log);
};

//fetch an index of all tasks from the database
const renderTasks = () => {
  fetch('http://localhost:3333/api')
  .then(res => res.json())
  .then(res => {
     //create li elements and delete buttons for each task in the database
    res.forEach(task => {
      createLiElements(task)
    })
  })
  .catch(err => console.log('Error in the get request: ' + err));
};

retrieve.addEventListener('click', () => {
  taskList.innerHTML = '';
  renderTasks();
});

addTaskButton.addEventListener('click', (e) => {
  e.preventDefault()
  const task = taskInput.value
  
  //check to see if there is a task in the input to make sure to not post an empty string to the db
  if(task){
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task}),
    })
    .then(res => res.json())
    .then((res) => {
      taskInput.value = ''
      const newTask = {
        item: task,
        _id: res._id
      }
      createLiElements(newTask)
    })
    .catch(err => console.log('Error in the post request: ' + err));
  };
});

const createLiElements = (task) => {
  const li = document.createElement('li');
  const button = document.createElement('button');
  li.innerText = task.item;
  button.innerText = 'X';
  taskList.appendChild(li);
  li.appendChild(button);
  
  //event listener to make a delete request and delete task from the dom
  button.addEventListener('click', () => {
    fetch(`/api/${task._id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      li.innerHTML = '';
      button.innerHTML = '';
    })
    .catch(err => console.log('Error in the delete\ request: ' + err));
  })
};

checkCookie();
};
