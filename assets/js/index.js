/* -------------------------- DOM -------------------------- */


// ADD TASKS
const addTasks = (tasks) => {
  const taskList = document.getElementById('task-list');
  for (const task of tasks) {
    const listItem = document.createElement('li');
    const text = document.createElement('span');
    const remove = document.createElement('button');

    listItem.id = task._id;
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
const removeTask = (id) => {
  document.getElementById(id).remove();
}

// (STRETCH) COMPLETE TASK

/* ----------------------- REQUESTS ----------------------- */

// POST
const postReq = () => {
  const textField = document.getElementById('task');
  const item = textField.value;
  console.log(item)
  fetch('/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    addTasks(data);
    textField.value = '';
  })
  .catch(err => console.log(err));
}

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
const delReq = (e) => {
  const id = e.target.parent.id;
  console.log('id', id)
  fetch(`/task/?id=${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      removeTask(data._id);
    })
    .catch(err => console.log(err));
}

/* ------------------------ EVENTS ------------------------ */

// SUBMIT TASK
document.getElementById('task-button').addEventListener('click',
  postReq
);

// GET TASKS
document.getElementById('retrieve').addEventListener('click',
  getReq
);

// DELETE TASK
const buttons = Array.from(document.getElementsByClassName('remove'));
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click',
    delReq
  )
}
