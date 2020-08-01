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
        removeButton.setAttribute('id', task._id)
        listItem.innerText = task.item;
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
  if (e.target.classList.contains('remove')) {
    const body = { _id: e.target. };
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
  }
})