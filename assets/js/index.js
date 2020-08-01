/* eslint-disable no-underscore-dangle */

// DELETE TASK
const deleteTask = async (e) => {
  try {
    // Get database task _id from button id
    await fetch(`/tasks/${e.target.id}`, { method: 'DELETE' });

    // delete <li> containing button after successful db deletion
    e.target.parentNode.remove();
  } catch (err) {
    console.error(err);
  }
};

// LOAD TASK LIST
const getTasks = document.getElementById('retrieve');
getTasks.addEventListener('click', async (e) => {
  try {
    // taskList is array of db doc objects (1 per task)
    let taskList = await fetch('/tasks');
    taskList = await taskList.json();

    // delete all existing items in <ul> to avoid double-display
    const taskContainer = document.getElementById('task-list');
    taskContainer.innerHTML = '';

    // iterate through task objects
    // creating a <li> holding item text & button w/ item _id for each
    // then append <li> to <ul>
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
  // retrieve item desc from text input
  const taskInput = document.getElementById('task');
  const item = taskInput.value;

  // Don't send fetch requests for empty tasks
  if (item.trim() !== '') {
    try {
      // send item descto server
      await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item }),
      });

      // clear input box
      taskInput.value = '';

      // reload tasks to include newly submitted tasks
      getTasks.click();
    } catch (err) {
      console.error(err);
    }
  } else {
    alert('Please enter a description to submit new tasks.');
  }
});

// fetch all current tasks from db on page load
getTasks.click();
