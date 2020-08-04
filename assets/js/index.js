const getTasksBtn = document.querySelector('#retrieve');
const taskList = document.querySelector('#task-list');
const addItemField = document.querySelector('#task');
const taskBtn = document.querySelector('#task-button');

getTasksBtn.onclick = getTasks;
taskBtn.onclick = addTask;

function getTasks() {
  fetch('/tasks')
    .then((response) => response.json())
    .then((data) => displayTasks(data))
    .catch((err) => console.log(err));
}

function addTask() {
  const item = addItemField.value;
  if (item === '') {
    console.log('Item field cannot be empty');
  } else {
    fetch('/tasks', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ item: item }),
    })
      .then(() => {
        addItemField.value = '';
        getTasks();
      })
      .catch((err) => console.log(err));
  }
}

function deleteTask(_id) {
  fetch(`/tasks/${_id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((confirmation) => {
      console.log(confirmation);
      const removed = document.querySelector(`#item${_id}`);
      taskList.removeChild(removed);
    })
    .catch((err) => console.log(err));
}

function displayTasks(taskArr) {
  taskList.innerHTML = '';
  taskArr.forEach((task) => {
    const item = document.createElement('li');
    item.id = `item${task._id}`;
    item.innerText = task.item;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove');
    deleteBtn.innerText = 'X';
    deleteBtn.onclick = () => deleteTask(task._id);

    item.appendChild(deleteBtn);
    taskList.appendChild(item);
  });
}
