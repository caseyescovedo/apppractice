const clearTasks = () => {
  const items = document.querySelectorAll('.item');
  items.forEach((item) => item.remove());
};

const renderTasks = (tasks) => {
  const target = document.getElementById('task-list');
  tasks.map((task) => {
    target.insertAdjacentHTML(
      'beforeend',
      `<li class="item" id=task-${task._id}>${task.item} <button id=${task._id} class="remove">X</button></li>`
    );
  });
  addRemoveEventListener()
};

const getTasks = () => {
  fetch('/tasks/get')
    .then((res) => res.json())
    .then((data) => renderTasks(data))
    .catch((err) => console.log('ERROR getting tasks: ', err));
};

const addTask = () => {
  const value = document.getElementById('task').value;
  fetch('/tasks/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item: value }),
  })
    .then((res) => {
      if (res.status === 200) {
        document.getElementById('task').value = '';
        clearTasks();
        getTasks();
      }
    })
    .catch((err) => console.log('ERROR adding task: ', err));
};

const removeTask = (e) => {
  const id = e.target.id
  document.getElementById(`${id}`).parentElement.remove();
  fetch('/tasks/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id: id }),
  })
    .then((res) => {
      if (res.status === 200) {
        console.log('deleted');
      }
    })
    .catch((err) => console.log('ERROR deleting task: ', err));
}

/* ----------------------------- Event Listeners ---------------------------- */

document.getElementById('task-button').addEventListener('click', () => {
  addTask();
});

document.getElementById('retrieve').addEventListener('click', () => {
  clearTasks();
  getTasks();
});

const addRemoveEventListener = () => {
  const tasks = document.querySelectorAll('.remove');
  tasks.forEach((task) =>
    task.addEventListener('click', (e) => {
      removeTask(e)
    })
  );
};

