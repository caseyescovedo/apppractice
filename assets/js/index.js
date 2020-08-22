window.onload = () => {

// Some global variables
const createContainer = document.getElementById('create');
const itemInput = document.getElementById('task');
const postTaskButton = document.getElementById('task-button');
const getTasksButton = document.getElementById('retrieve');
const taskList = document.getElementById('task-list');

// Checking to see if we've already retrieved our tasks
let retrieved = false;

// Get tasks functionality
getTasksButton.addEventListener('click', () => {
  if (retrieved) return;
  fetch('/tasks')
    .then(res => res.json())
    .then(data => {
      data.rows.forEach(task => {
        // Make li node
        const taskListItem = document.createElement('li');
        taskListItem.innerText = task.item;
        taskListItem.id = task.id;
        // Make button node
        const removeButton = document.createElement('button');
        removeButton.class = 'remove';
        removeButton.innerText = 'X';
        removeButton.addEventListener('click', removeThisTask);
        taskListItem.appendChild(removeButton);
        // Add entire node to list
        taskList.appendChild(taskListItem);
      });
      // Make sure it only happens once
      retrieved = true;
    })
    .catch(err => {
      console.log(err);
    });
});

// Post task functionality
postTaskButton.addEventListener('click', () => {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({item: itemInput.value})
  })
  .then(res => res.json())
  .then(data => {
    // Make node immediately
    const taskListItem = document.createElement('li');
    taskListItem.innerText = itemInput.value;
    taskListItem.id = data.itemId;
    // Make button node
    const removeButton = document.createElement('button');
    removeButton.class = 'remove';
    removeButton.innerText = 'X';
    removeButton.addEventListener('click', removeThisTask);
    taskListItem.appendChild(removeButton);
    // Add entire node to list
    taskList.appendChild(taskListItem);
    // Reset input field
    itemInput.value = '';
  })
  .catch(err => {
    console.log(err);
  });
});

// Remove task functionality
const removeThisTask = e => {
  fetch('/tasks', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({itemId: e.target.parentNode.id})
  })
  .then(data => {
    taskList.removeChild(e.target.parentNode);
  })
  .catch(err => {
    console.log(err);
  });
};

};
