// render tasks
const renderTasks = tasksDB => {
  const tasksDisplay = document.getElementById('task-list');
  let taskItems = '';

  tasksDB.forEach(taskItem => {
    taskItems += `
      <li id="${taskItem._id}">${taskItem.item}<button class="remove">X</button></li>
    `;
  });
  tasksDisplay.innerHTML = taskItems;

  const buttonsDisplay = document.querySelectorAll('.remove');
  buttonsDisplay.forEach(button => {
    button.addEventListener('click', () => {
      deleteTask(button.parentElement.getAttribute('id'));
    });
  });
};

// get tasks
const getTasks = () => {
  fetch('/tasks')
    .then(res => res.json())
    .then(tasksDB => renderTasks(tasksDB))
    .catch(err => console.log(err));
};

// post task
const postTask = () => {
  const newTask = document.getElementById('task').value;
  document.getElementById('task').value = '';

  fetch('/secret', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ item: newTask })
  })
    .then(res => res.json())
    .then(tasksDB => renderTasks(tasksDB))
    .catch(err => {
      console.log(err);
    });
};

// delete task
const deleteTask = taskId => {
  fetch('/secret/' + taskId, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(tasksDB => renderTasks(tasksDB))
    .catch(err => {
      console.log(err);
    });
};

// handle task events
document.getElementById('task-button').addEventListener('click', postTask);
document.getElementById('retrieve').addEventListener('click', getTasks);
