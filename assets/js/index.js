// NOTE: I seem not to be targeting elements properly somehow...

// LOGIN PAGE
const body = document.querySelector('body');
const user = document.getElementById('user');
const pass = document.getElementById('pass');
const submitButton = document.getElementById('submit');

// SECRET PAGE
const newTask = document.getElementById('task');
const addTaskButton = document.getElementById('task-button');
const retrieveButton = document.getElementById('retrieve');
const taskList = document.getElementById('task-list');

// Login Authentication
submitButton.addEventListener('click', () => {
  fetch('/signin', {
    body: {
      username: user.value,
      password: pass.value
    }
  })
    .then(response => console.log('authentication process complete'))
    .catch(err => console.log(err));
});

// Get tasks
retrieveButton.addEventListener('click', () => {
  fetch('/api')
    .then(response => response.json())
    .then(data => {
      taskList.innerText('');
      for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        for (let detail in data[i]) {
          const p = document.createElement('p');
          p.innerHTML = detail;
          li.appendChild(p);
          const button = document.createElement('button');
          button.innerText = "Delete Task";
          button.addEventListener('click', () => {
            deleteItem(data[i]._id);
          });
        }
        taskList.appendChild(li);
      }
    })
    .catch(err => console.log(err));
});

// Add task
addTaskButton.addEventListener('click', () => {
  fetch('/api', {
    method: 'POST',
    body: {
      item: newTask.value,
      created_at: new Date()
    }
  })
    .then(response => response.json())
    .then(() => getTasks());
});

function deleteItem(id) {

};