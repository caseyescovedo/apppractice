// //get all tasks
let notClicked = true;
const getTaskButton = document.getElementById('retrieve');

document.addEventListener('click', (e) => {
  if (e.target.innerHTML === 'Get Tasks' && notClicked) {
    notClicked = false;
    fetchTasks();
  }

  if (e.target.innerHTML === 'Add Task') {
    let message = document.getElementById('task').value;
    if (message) {
      fetch('http://localhost:3333/secrets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: message,
        }),
      }).then(fetchTasks());
    }
  }
});

function fetchTasks() {
  fetch('http://localhost:3333/secrets')
    .then((res) => res.json())
    .then((data) => {
      if (data.tasks) {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        data.tasks.forEach((task) => addItemToTaskList(task));
      }
    })
    .catch((err) => {
      console.warn(err);
    });
}

function addItemToTaskList(task) {
  const item = document.createElement('li');
  item.setAttribute('id', task._id);
  item.innerHTML = `${task.item} <button class='del' id='delete-${task._id}'>Delete</button>`;
  const taskList = document.getElementById('task-list');
  taskList.appendChild(item);
  addDeleteButtonListener(task._id);
}

function addDeleteButtonListener(taskID) {
  const button = document.getElementById(`delete-${taskID}`);
  button.addEventListener('click', () => {
    fetch(`http://localhost:3333/secrets/${taskID}`, {
      method: 'DELETE',
    }).then(fetchTasks());
  });
}
