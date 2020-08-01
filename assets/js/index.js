const { addTask } = require("../../server/controllers/taskController")

const getTasks = () => {
  fetch('/secret')
  .then((data) => data.json())
  .then((tasks) => {
    addTask(task)
  })
}

getTasks();

const addTask = (task) => {
  const taskList = document.getElementById('task-list')
  tasks.forEach((task) => {
    const newItem = document.createElement('li');
    newItem.innerText = task.text;
    newItem.id = task._id;
    const button = document.createElement('button');
    button.className = 'remove';
    button.innerText = 'X';
    button.addEventListener('click', () => {
      fetch(`/secret/${task_id}`, {
        method: 'Delete'
      })
      .then((data) => data.json())
      .then((task) => {
        document.getElementById('task-list').removeChild(newItem)
      })
      .catch((error) => console.log(error))
    })
    newItem.appendChild(button);
    taskList.appendChild(newItem);
  });
}

 