const retrieve = document.getElementById('retrieve');
const taskButton = document.getElementById('task-button');
const taskList = document.getElementById('task-list');

const deleteTask = async (id) => {
  const currentTask = document.getElementById(id);
  taskList.removeChild(currentTask);
  const options = {
    method: 'DELETE',
  };
  try {
    await fetch(`/tasks?id=${id}`, options);
  } catch (error) {
    console.error(error);
  }
};

const newDeleteButton = (id) => {
  const button = document.createElement('button');
  button.className = 'remove';
  button.innerHTML = 'X';
  button.addEventListener('click', () => deleteTask(id.toString()));
  return button;
}

const createTask = (task) => {
  const listItem = document.createElement('li');
  listItem.setAttribute('id', task._id);
  listItem.innerHTML = `${task.item}`;
  const button = newDeleteButton(task._id);
  listItem.appendChild(button);
  taskList.appendChild(listItem);
}

const getAllTasks = async () => {
  try {
    const rawTasks = await fetch('/tasks');
    const tasks = await rawTasks.json();
    taskList.innerHTML = '';
    tasks.forEach(task => {
      createTask(task);
    });
  } catch (error) {
    console.error(error);
  }
};

const postNewTask = async () => {
  const input = document.getElementById('task').value;
  if (!input) return;
  const body = JSON.stringify({ item: input });
  const options = {
    method: 'POST',
    body,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch('/tasks', options);
    const newTask = await result.json();
    createTask(newTask);
  } catch (error) {
    console.error(error);
  }
};

retrieve.addEventListener('click', getAllTasks);

taskButton.addEventListener('click', postNewTask);
