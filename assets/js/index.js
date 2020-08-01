// Get tasks
const getButton = document.getElementById('retrieve');
const list = document.getElementById('task-list');
getButton.addEventListener('click', () => {
  fetch('/retrieve')
    .then((res) => res.json())
    .then((tasks) => {
      console.log('tasks:', tasks);
      const allTasks = tasks;
      list.innerHTML = '';
      allTasks.forEach((task) => {
        const listItem = document.createElement('li');
        const removeButton = document.createElement('button');
        removeButton.innerText = 'X';
        removeButton.classList.add('remove');
        removeButton.setAttribute('id', task._id);
        listItem.innerText = task.item;
        listItem.setAttribute('id', task._id);
        listItem.appendChild(removeButton);
        list.appendChild(listItem);
      });
    });
});

// Add taks
const addButton = document.getElementById('task-button');
addButton.addEventListener('click', () => {
  const item = document.getElementById('task').value;
  console.log('item', item);
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
  console.log(e.target);
  if (e.target.classList.contains('remove')) {
    const body = { _id: e.target.id };
    console.log(e.target.id);
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
        const parentNode = e.target.parentNode();
        parentNode.delete();
      })
      .catch((err) => {
        console.log('Error in deleting task', err);
      });
  }
});

// redirect to secret page on signin submit
const signInForm = document.getElementById('signin');
signInForm.addEventListener('submit', window.location('/secret'))


signInForm.addEventListener('submit', () => {
  const username = document.getElementById('user').value;
  const password = document.getElementById('pass').value;
  const body = { username, password }
  fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((tasks) => {})
    .catch((err) => {
      console.log('Error in signin post request');
    });
});
