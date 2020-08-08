document.addEventListener('DOMContentLoaded', () => {
  function getTasks() {
    fetch('/getTasks')
      .then((res) => res.json())
      .then((taskObjs) => {
        taskObjs.forEach((taskObj) => {
          displayTask(taskObj);
        });
      });
  }

  function getTasksIntervals() {
    document.getElementById('task-list').innerHTML = '';
    getTasks();
  }
  setInterval(getTasksIntervals, 3000);

  function displayTask(taskObj) {
    // creates new task listItem
    const li = document.createElement('li');
    li.setAttribute('class', 'taskDisplay');
    // this taskId is useful for delete functionality
    li.setAttribute('id', taskObj.id);
    const button = document.createElement('button');
    button.setAttribute('class', 'remove');
    button.setAttribute('value', taskObj.id);
    button.innerHTML = 'X';
    button.addEventListener('click', () => removeTasks(taskObj));
    // can directly connect item on to list item
    li.innerText = taskObj.item;
    li.append(button);
    // task-list ol
    document.getElementById('task-list').append(li);
  }

  function insertTask(taskObjs) {
    const input = taskObjs;
    console.log('this is taskObjs on insertTask: ', taskObjs);
    fetch('/postTask', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((result) => {
        return displayTask(result);
      })
      .catch((error) => {
        console.log('Error in insertTask function: ', error);
      });
  }

  // for inserting tasks
  const insertButton = document.getElementById('task-button');
  insertButton.addEventListener('click', () => {
    // grab task input
    const taskInput = document.getElementById('task').value;
    console.log('task Input is ', taskInput);
    // package in object
    const userInput = { item: taskInput };
    // insert as argument in insertTask
    insertTask(userInput);
  });

  // for retrieve task
  const recieveButton = document.getElementById('retrieve');
  recieveButton.addEventListener('click', () => {
    getTasks();
  });

  function removeTasks(taskObjs) {
    const { id } = taskObjs;
    fetch(`/deleteTask/${id}`), {
        headers: {
          'content-type': 'application/json',
        },
        method: 'DELETE',
      }
        .then((res) => res.json)
        .then((data) => {
          document.getElementById(`#${id}`).remove();
          console.log('deleteTask successful');
        })
        .catch((error) => {
          console.log('Error in insertTask function:  ', error);
        });
  }
  // grab submit button add eventListener to check if user can access secretPage
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', () => {
    // grab text input for authentication
    const password = document.getElementById('pass').value;
    console.log('pw is ', password);
    // grab user
    const user = document.getElementById('user').value;
    console.log('user is ', user);
    const userInput = { user: user, password: password };
    if (user === 'codesmith' && password === 'ilovetesting') {
      fetch('/signin', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(userInput),
      })
        .then((res) => res.json())
        .then((result) => {
          return displayTask(result);
        })
        .catch((error) => {
          console.log('unsuccessful login attempt');
        });
    }
  });
});

