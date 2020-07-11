function addListeners() {
  document.querySelector('#retrieve').addEventListener('click', getTasks);

  document.querySelector('#task-button').addEventListener('click', addTask);

  document.querySelector('#task-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      removeTask(e.target);
    }
  });
}

function getTasks() {
  fetch('/tasks')
    .then((res) => res.json())
    .then((data) => {
      console.log('retrieve button data ->', data);
      const tasksArea = document.querySelector('#task-list');
      data.forEach((task) => {
        if (!document.querySelector(`#task-${task._id}`)) {
          const ele = document.createElement('li');
          ele.id = `task-${task._id}`;
          ele.innerHTML = `${task.item}<button class="remove">X</button>`;
          tasksArea.appendChild(ele);
        }
      });
    })
    .catch((err) => console.log(err));
}

async function addTask() {
  const item = document.querySelector('#task').value;
  await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('task button data ->', data);
      getTasks();
    })
    .catch((err) => console.log(err));
}

function removeTask(ele) {
  const li = ele.parentElement;

  fetch('/tasks', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: li.id.slice(5) }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('remove button data ->', data);
      li.remove();
    })
    .catch((err) => console.log(err));
}

document.addEventListener('DOMContentLoaded', () => {
  addListeners();
  getTasks();
});
