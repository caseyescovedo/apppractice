function deleteListItem(id) {
  fetch(`/secret/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((data) => data.json())
    .then((deletedOrNah) => {
      // reload the tasks on the page
      loadTasks();
    })
    .catch((err) => {
      console.log(`Error when deleting task from db: ${err}`);
    });
}

function loadTasks() {
  fetch('/secret/tasks')
    .then((data) => {
      // parse the data
      return data.json();
    })
    .then((parsed) => {
      const taskList = document.getElementById('task-list');

      // if we already have tasks on the page, wipe it and reload so we don't get duplicates or stale data
      if (taskList.innerHTML) {
        taskList.innerHTML = '';
      }

      // loop over our parsed array of tasks
      parsed.forEach((task) => {
        // create list of tasks
        const li = document.createElement('li');
        li.innerText = task.item;
        // readme doesnt seem to indicate that it wants this classname added but I saw it in the .css file so im adding it lolol
        li.className = 'task';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'remove';
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => deleteListItem(task._id));

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    })
    .catch((err) => {
      console.log(`error getting tasks from DB: ${err}`);
    });
}

function createTask() {
  const inputField = document.getElementById('task');
  const taskToAdd = inputField.value;
  // throw an error message is the input is blankd
  if (!taskToAdd) {
    return window.alert('You must enter text into the field before you can save a task');
  }
  fetch('/secret/tasks', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      taskToAdd
    })
  }).then(() => {
    // refetch the messages since we need to update the list
    loadTasks();
  });

  inputField.value = '';
}

document.getElementById('task-button').addEventListener('click', createTask);
document.getElementById('retrieve').addEventListener('click', loadTasks);
