
const taskList = document.getElementById('task-list');
const getTaskButton = document.getElementById('retrieve');
const addTaskButton = document.getElementById('task-button');


// event listener for "Get Tasks" button
getTaskButton.addEventListener('click', (e) => {
  e.preventDefault();
  getTasks(e);
});

// event listener for the "Add Task" button
addTaskButton.addEventListener('click', (e) => {
  e.preventDefault();
  const taskInput = document.getElementById('task').value;
  addTask(taskInput);
});


// fetch all tasks from db
const getTasks = (e) => {
  fetch('/tasks')
    .then((res) => res.json())
    .then((data) => {
      taskList.innerHTML = '';
      data.forEach(task => {
        addLi(task);
      });
    })
    .catch((err) => console.log('err in index gettasks ', err));
};

// add one text to the db and add to task-list
const addTask = (taskInput) => {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ taskInput }),
  })
  .then((res) => res.json())
  .then((data) => {
    addLi(data);
  }).catch((err) => console.log('err in index add task ', err));
};

// delete one task from db and remove from <ul>
const deleteTask = (id) => {
  console.log(id)
  fetch(`/tasks/${id}`, {
    method: 'DELETE',
  })
  .then((res)=> res.json())
  .then((data) => {
    console.log('task deleted: ', data);
    const deleted = document.getElementById(id);
    taskList.removeChild(deleted);
  }).catch((err) => console.log('err in index delete task ', err));
};


// add new <li> to task list with a button and text from task
const addLi = (task) => {
  const newLi = document.createElement('li');
  newLi.id = task.id;
  const button = document.createElement('button');
  button.innerText = 'X';
  button.addEventListener('click', ()=>{deleteTask(newLi.id)});
  button.className = 'remove';
  newLi.innerText = task.item;
  newLi.appendChild(button);
  taskList.appendChild(newLi);
};