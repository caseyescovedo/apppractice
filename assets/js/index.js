// Function that gets and displays items from the database
function getTasks() {
  // Task list element
  const taskList = document.getElementById('task-list');
  // Empty task list to avoid adding duplicates
  taskList.innerHTML = '';
  // Fetch tasks from db
  fetch('/tasks')
  .then(res => res.json())
  .then(data => {
    // Response data is array of objects
    // Iterate over response
    for (let i = 0; i < data.length; i += 1) {
      // For each, add new list item with button inside with class remove
      let listEl = document.createElement('li');
      listEl.innerHTML = data[i].item;
      let buttonEl = document.createElement('button');
      buttonEl.innerHTML = 'X';
      buttonEl.setAttribute('class', 'remove');
      // Add onclick event to button for delete functionality
      buttonEl.setAttribute('onclick', `deleteTask(${data[i]._id})`);
      // Append button to list item
      listEl.appendChild(buttonEl);
      // Append to taskList
      taskList.appendChild(listEl);
    }
  })
  .catch(err => console.log(err));
}

// Function that adds Task to page
function addTask() {
  // Get value from input
  const task = document.getElementById('task').value;
  const reqBody = {item: task};
  // Clear out input
  document.getElementById('task').value = '';
  // Post to database
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  })
  .then(res => res.json())
  .then(data => {
    // Invoke getTasks to refresh task list with new item
    getTasks();
  })
  .catch(err => console.log(err));
}

// Function that deletes task from page
function deleteTask(id) {
  // Fetch with delete query
  fetch(`/tasks/?_id=${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    // Invoke getTasks to show new list
    getTasks();
  })
  .catch(err => console.log(err));
}

