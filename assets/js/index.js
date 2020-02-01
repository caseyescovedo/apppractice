const taskList = document.querySelector('#task-list');

taskList.addEventListener('submit', (event) => {
  const task = event.target[0].value;
  if (task.className === 'task-button') {
    fetch('/secret/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    })
      .then((res) => res.json());
  } else if (task.className === 'retrieve') {
    fetch('/secret/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: task.dataset.id,
      }),
    });
  }
});

const render = (tasks) => {
  tasks.forEach((task) => {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('data-id', task.id);
    deleteButton.setAttribute('class', 'delete');
    document.body.appendChild(deleteButton);
  });
};
