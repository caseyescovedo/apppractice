const getTasksButton = document.getElementById('retrieve');
const addTaskButton = document.getElementById('task-button');
const inputTask = document.getElementById('task');

// WHEN BUTTON IS CLICKED ALL LIST ITEMS ARE DISPLAYED IN #task-list ELEMENT
getTasksButton.addEventListener('click', () => {
  getAllTasks();
});

// WHEN BUTTON IS CLICKED NEW TASK IS SUBMITTED
addTaskButton.addEventListener('click', () => {
  getAllTasks();
});

// GET ALL TASKS FUNCTION
function getAllTasks() {
  console.log('Click Happens');
  fetch(`/api`)
    .then((resp) => resp.json())
    .then((data) => {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';
      for (let el of data) {
        const li = document.createElement('li');
        li.className = 'task';
        const p = document.createElement('p');
        p.innerText = el.item;
        li.appendChild(p);
        // DELETE BUTTON
        const deleteButton = document.createElement('button');
        deleteButton.className = 'remove';
        deleteButton.innerText = 'x';
        deleteButton.addEventListener('click', (event) => deleteItem(el._id));
        li.appendChild(deleteButton);
        taskList.appendChild(li);
      }
    })
    .catch((err) => console.log(err));
}

// DELETE ITEM FUNCTION
function deleteItem(item) {
  const deleteObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: item }),
  };
  fetch('/api', deleteObj)
    .then((data) => data.json())
    .then((deleted) => {
      console.log(deleted);
    })
    .then(() => getAllTasks())
    .catch((err) => {
      console.log(err);
    });
}

// CREATE NEW TASK
addTaskButton.addEventListener('click', () => {
  const newTask = inputTask.value;
  const postObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: newTask,
    }),
  };
  fetch('/api', postObj)
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .then(() => getAllTasks())
    .catch((err) => console.log(err));
  inputTask.value = '';
});
