// Prepend all Taks to UL Element
function prependTask(task) {
  const ul = document.getElementById('task-list');

  const li = document.createElement('li');
  li.id = `task-${task.id}`;
  const button = document.createElement('button');
  button.innerText = 'X';
  button.className = 'remove';

  button.onclick = () => deleteTask(task.id);

  li.innerText = task.item;
  li.appendChild(button);

  ul.prepend(li);
}

// Get all tasks
function getTasks() {
  const ul = document.getElementById('task-list');
  ul.querySelectorAll('li').forEach((n) => n.remove());
  fetch('/getTasks')
    .then((resp) => resp.json())
    .then((resp) => resp.forEach((task) => prependTask(task)));
}

// Add Task
function addTasks() {
  const item = document.getElementById('task').value;
  const today = new Date();
  const created_at =
    today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();
  const body = {
    item,
    created_at,
  };
  fetch('/postTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => prependTask(resp));
}

// Delete Task
function deleteTask(id) {
  fetch(`/deleteTask/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp) {
        const elem = document.getElementById(`task-${id}`);
        elem.parentNode.removeChild(elem);

        //getTasks();
      }
    });
}
