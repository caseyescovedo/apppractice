/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

const getTasks = () => {
  const taskListEl = document.getElementById('task-list');
  fetch('/items')
    .then((data) => data.json())
    .then((tasks) => {
      taskListEl.innerHTML = '';
      tasks.forEach((task) => addItem(task));
    });
};

const addItem = (task) => {
  const taskLi = document.createElement('li');
  taskLi.innerHTML = task.item;
  taskLi.classList.add('task');
  const delButton = document.createElement('button');
  delButton.innerHTML = 'X';
  delButton.classList.add('remove');
  const body = {
    id: task._id,
  };
  delButton.addEventListener('click', () => {
    document.getElementById('task-list').removeChild(taskLi);
    fetch('/items', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .catch((err) => console.log(err));
  });
  taskLi.appendChild(delButton);
  document.getElementById('task-list').appendChild(taskLi);
};


const addTaskEl = document.getElementById('task-button');

addTaskEl.addEventListener('click', () => {
  const taskEl = document.getElementById('task');
  const body = {
    item: taskEl.value,
  };
  taskEl.value = '';
  if (body.item) {
    fetch('/items', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    //   .then(() => getTasks())
      .catch((err) => console.log(err));
  }
});

const getTasksEl = document.getElementById('retrieve');
getTasksEl.addEventListener('click', () => {
  getTasks();
});
