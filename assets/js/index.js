console.log('hitting index.js');

document.addEventListener('DOMContentLoaded', () => {
  fetch('/todo')
    .then((response) => response.json())
    .then((tasks) => console.log(tasks))
    .catch((err) => console.log('Error from Get All Tasks request', err));
});

document.body.addEventListener('click', (event) => {
  console.log(event.target);
  const { target } = event;
  if (target.id === 'retrieve') {
    fetch('/todo')
      .then((response) => response.json())
      .then((tasks) => display(tasks))
      .catch((err) => console.log('Error from Get All Tasks request', err));
  }
  if (target.id === 'task-button') {
    const newTask = document.getElementById('task').value;
    // console.log(newTask);
    fetch('/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    });
  }
  if (target.className === 'delete') {
    const dataId = target.dataset.id;
    // console.log('dataId', dataId);
    const targetTask = document.getElementById(dataId);
    fetch('/todo', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: dataId }),
    });
    targetTask.remove();
  }
  if (target.id === 'submit') {
    const userName = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    fetch('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userName, pass: password }),
    });
  }
});

const display = (tasks) => {
  const mainDiv = document.createElement('div');
  // eslint-disable-next-line no-restricted-syntax
  for (const element of tasks) {
    const containerDiv = document.createElement('div');
    const description = document.createElement('p');
    const deleteButton = document.createElement('button');
    description.innerText = element.task;
    deleteButton.setAttribute('data-id', element.id);
    // deleteButton.setAttribute('id', element.id);
    deleteButton.setAttribute('class', 'delete');
    deleteButton.innerText = 'DELETE';
    containerDiv.setAttribute('id', element.id);
    containerDiv.appendChild(description);
    containerDiv.appendChild(deleteButton);
    mainDiv.appendChild(containerDiv);
  }
  document.body.appendChild(mainDiv);
};
