
const taskList = document.getElementById('task-list');

const getTasks = document.getElementById('retrieve');
const submitTask = document.getElementById('task-button');
const task = document.getElementById('task');

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
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(targetId),
  }).then((response) => response.json())
    .then((response) => {
      taskList.innerHTML = '';

      populateLi(response);
      queryList();
    })
    .catch((error) => {
      console.log('Error deleting Tasks from client. Error: ', error);
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

const addTask = (taskMessage) => {
  fetch('/tasks/postTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskMessage),
  }).then((response) => response.json())
    .then((response) => {
      taskList.innerHTML = '';

      populateLi(response);
      queryList();
    })
    .catch((error) => {
      console.log('Error posting Task from client. Error: ', error);
    });
};


getTasks.addEventListener('click', fetchTasks);
submitTask.addEventListener('click', () => {
  const submissionObj = { task: task.value };

  task.value = '';

  addTask(submissionObj);
});
