// Get tasks
const getButton = document.getElementById('retrieve');
const list = document.getElementById('task-list');
getButton.addEventListener('click', () => {
  fetch('/retrieve')
    .then((res) => res.json())
    .then((tasks) => {
      // Clear list to prevent duplicates
      list.innerHTML = '';
      const allTasks = tasks;
      // Create li for each tasl
      allTasks.forEach((task) => {
        const listItem = document.createElement('li');
        const removeButton = document.createElement('button');
        removeButton.innerText = 'X';
        removeButton.classList.add('remove');
        removeButton.setAttribute('id', task._id);
        listItem.innerText = task.item;
        listItem.setAttribute('id', task._id);
        listItem.appendChild(removeButton);
        // append to list
        list.appendChild(listItem);
      });
    });
});

// Add taks
const addButton = document.getElementById('task-button');
addButton.addEventListener('click', () => {
  const item = document.getElementById('task').value;

  const body = { item };
  fetch('/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      res.json();
      console.log(res);
    })
    .catch((err) => {
      console.log('Error in adding task', err);
    });
});

// Remove item when button clicked
list.addEventListener('click', (e) => {

  e.target.parentNode.remove();

  if (e.target.classList.contains('remove')) {
    const body = { _id: e.target.id };

    fetch('/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        res.json();
        console.log(res);
        // delete parent node
      })
      .catch((err) => {
        console.log('Error in deleting task', err);
      });
  }
});

