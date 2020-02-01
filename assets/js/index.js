console.log('testtt');

const getTasks = document.getElementById('retrieve');

const taskList = document.getElementById('task-list');

const create = document.getElementById('create');

const populateLi = (response) => {
  response.forEach((resp) => {
    const taskDiv = document.createElement('li');
    taskDiv.innerHTML = `${resp.item}<button id="${resp.message_id}" class="remove">X</button>`;
    taskList.appendChild(taskDiv);
  });
};

const queryList = () => {
  document.querySelectorAll('.remove').forEach((item) => {
    item.addEventListener('click', (e) => {
    // e.preventDefault();
      const buildObj = { id: e.target.id }
      deleteTask(buildObj);
      queryList();
    });
  });
};

const deleteTask = (targetId) => {
  fetch('/tasks/deleteTask', {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(targetId), // body data type must match "Content-Type" header
  }).then((response) => response.json())
    .then((response) => {
      taskList.innerHTML = '';

      populateLi(response);
      queryList();
    })
    .catch((error) => {
      console.log('Error fetching Tasks from client. Error: ', error);
    });
};

const fetchTasks = () => {
  fetch('/tasks/getTasks')
    .then((response) => response.json())
    .then((response) => {
      taskList.innerHTML = '';

      populateLi(response);
      queryList();
    })
    .catch((error) => {
      console.log('Error fetching Tasks from client. Error: ', error);
    });
};


getTasks.addEventListener('click', fetchTasks);
