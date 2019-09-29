const getTasksButton = document.getElementById('retrieve');
let receivedTasks = false;

getTasksButton.addEventListener('click', () => {
  if (receivedTasks === false) {
    receivedTasks = true;

    fetch('/tasks')
      .then(res => res.json())
      .then(result => {
        const taskList = document.getElementById('task-list');

        result.tasks.forEach(task => {
          let listElement = document.createElement('li');
          listElement.innerText = task;

          let removeButton = document.createElement('button');
          removeButton.innerText = 'X';
          removeButton.className = 'remove';
          listElement.appendChild(removeButton);

          taskList.appendChild(listElement);
        });
      })
      .catch(err => {
        console.log('Error getting tasks');
        return new Error(err);
      })
    }
});

const taskButton = document.getElementById('task-button');
taskButton.addEventListener('click', () => {
  const task = document.getElementById('task');

  let savedTask = fetch('/task', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({task: task.value})
    })

    console.log(savedTask);

  const taskList = document.getElementById('task-list');

  const newListElement = document.createElement('li');
  newListElement.innerText = task.value;

  const removeButton = document.createElement('button');
  removeButton.innerText = 'X';
  removeButton.className = 'remove';
  newListElement.appendChild(removeButton);

  taskList.appendChild(newListElement);
});

// I'm unable to get the task id's from the datbase but I would like to have them on each list element as a unique ID. I'd then get the id from the element when an X is clicked and pass it back to the server in order to delete the task from the database.
