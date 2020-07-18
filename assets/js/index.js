// function to fetch task list from DB and include delete button/function
const getTasks = () => {
  fetch('/tasks')
    .then((res) => res.json())
    .then((tasks) => {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';
      tasks.forEach((task) => {
        const newLi = document.createElement('li');
        newLi.innerText = task.item;
        newLi.className = 'task';
        const button = document.createElement('button');
        button.className = 'remove';
        button.innerText = 'X';
        button.addEventListener('click', () => {
          fetch(`/tasks/${task._id}`, {
            method: 'DELETE',
          })
            .then((res) => res.json())
            .then((task) => {
              document.getElementById('task-list').removeChild(newLi);
            })
            .catch((err) => {
              console.log(err);
            });
        });
        newLi.appendChild(button);
        taskList.appendChild(newLi);
      });
    })
    .catch((err) => console.log(err));
};

// event listener to get tasks on button click
document.getElementById('retrieve').addEventListener('click', getTasks);

// function to add task to list
const addTask = async () => {
  const taskInput = document.getElementById('task');
  const body = {
    item: taskInput.value,
    created_at: Date.now(),
  };
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  await getTasks();
  document.getElementById('task').value = '';
};

document.getElementById('task-button').addEventListener('click', addTask);

// function to pass form data to authentication middleware
// get input values from form and pass those in post request body
const verifyUser = () => {
  const userInput = document.getElementById('user');
  const passInput = document.getElementById('pass');
  const body = {
    user: userInput.value,
    pass: passInput.value,
  };
  fetch('/signin', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

// on submit click, send request with body info to verify
document.getElementById('submit').addEventListener('click', verifyUser);
