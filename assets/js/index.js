let getTasksBtn = document.getElementById("retrieve");
let addTaskBtn = document.getElementById("task-button");
let taskListEl = document.getElementById("task-list");
let taskInput = document.getElementById("task");

const addTask = () => {
  console.log('addTask clicked!');
  let item = taskInput.value;

  fetch('http://localhost:3333/addTask', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item
    }),
  })
    .then(response => response.json())
    .then(task => console.log(`successfully added ${task} into the db`))
    .catch(err => console.error(err));
};

const deleteTask = (e) => {
  console.log('delete clicked')
  let item = e.target.parentElement.innerHTML;

  e.target.parentElement.removeChild(e.target.parentElement.firstChild);

  fetch('http://localhost:3333/deleteTask', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item
    }),
  })
    .then(response => response.json())
    .then(task => console.log(`successfully deleted ${task} from the db`))
    .catch(err => console.error(err));
};

const getTasks = () => {
  console.log('getTasks clicked!');

  fetch('http://localhost:3333/getTasks', {
    method: 'get'
  })
    .then(response => response.json())
    .then(tasks => {
      while (taskListEl.firstChild !== null) {
        taskListEl.removeChild(taskListEl.firstChild);
      }

      tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = task;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "remove";
        deleteBtn.innerHTML = "X";
        deleteBtn.addEventListener("click", deleteTask);

        li.appendChild(deleteBtn);
        taskListEl.appendChild(li);
      });
    })
    .catch(err => console.error(err));
};

getTasksBtn.addEventListener("click", getTasks);
addTaskBtn.addEventListener("click", addTask);
