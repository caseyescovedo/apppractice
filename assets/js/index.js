const getTasks = () => {
  fetch('/api/tasks')
    .then((res) => res.json())
    .then((data) => {
      const taskList = document.getElementById('task-list');
      let allListItems = '';
      data.forEach((task, index) => {
        const listItem = `<li id=${task._id}>${task.item}<button class="remove" onclick="deleteTask('${task._id}')">X</button></li>`;
        allListItems += listItem;
      });
      taskList.innerHTML = allListItems;
    })
    .catch((err) => console.log(err));
};

const addTask = () => {
  const taskInput = document.getElementById('task').value;
  if (taskInput === '') alert('Please enter a task in the input field');
  else {
    fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: taskInput }),
    })
      .then((res) => res.json())
      .then((data) => getTasks())
      .catch((err) => console.log(err));
  }
};

const deleteTask = (id) => {
  fetch('/api/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id }),
  })
    .then((res) => res.json())
    .then((data) => getTasks())
    .catch((err) => console.log(err));
};

// window.addEventListener('load', () => {
//   getTasks();
// });
