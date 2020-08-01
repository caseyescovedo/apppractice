/* eslint-disable no-underscore-dangle */

// DELETE TASK
const deleteTask = async (e) => {
  try {
    await fetch(`/tasks/${e.target.id}`, { method: 'DELETE' });
    e.target.parentNode.remove();
  } catch (err) {
    console.error(err);
  }
};

// LOAD TASK LIST
const getTasks = document.getElementById('retrieve');
getTasks.addEventListener('click', async (e) => {
  try {
    let taskList = await fetch('/tasks');
    taskList = await taskList.json();
    const taskContainer = document.getElementById('task-list');
    taskContainer.innerHTML = '';
    taskList.forEach((task) => {
      const taskItem = document.createElement('li');
      const remove = document.createElement('button');
      remove.className = 'remove';
      remove.innerHTML = 'X';
      remove.id = task._id;
      remove.onclick = deleteTask;
      taskItem.append(task.item, remove);
      taskContainer.appendChild(taskItem);
    });
  } catch (err) {
    console.error(err);
  }
});

// ADD NEW TASK
const addTask = document.getElementById('task-button');
addTask.addEventListener('click', async (e) => {
  try {
    const taskInput = document.getElementById('task');
    const item = taskInput.value;
    await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item }),
    });
    taskInput.value = '';
    getTasks.click();
  } catch (err) {
    console.error(err);
  }
});

getTasks.click();
