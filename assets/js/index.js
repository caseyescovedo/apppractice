/* -------------------------- DOM -------------------------- */

// ADD TASKS
const addTasks = (tasks) => {
  const taskList = document.getElementById('task-list');
  for (const task of tasks) {
    const listItem = document.createElement('li');
    const text = document.createElement('span');
    const remove = document.createElement('button');
    text.innerText = task.item;
    remove.innerText = 'X';
    remove.className = 'remove';

    listItem.appendChild(text);
    listItem.appendChild(remove);
    taskList.appendChild(listItem);
  }
}

// CLEAR ALL TASKS
const clearTasks = () => {
  document.getElementById('task-list').innerHTML = '';
}

// REMOVE TASK

// (STRETCH) COMPLETE TASK

/* ----------------------- REQUESTS ----------------------- */

// POST

// GET
const getReq = () => {
  fetch('/task')
    .then(response => {
      return response.json();
    })
    .then(data => {
      clearTasks();
      addTasks(data);
    })
    .catch(err => console.log(err));
}

// DELETE

/* ------------------------ EVENTS ------------------------ */

// SUBMIT TASK

// GET TASKS
document.getElementById('retrieve').addEventListener('click',
  getReq
);

// DELETE TASK
