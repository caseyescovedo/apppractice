// helper funciton to render DB items on screen
const renderRow = (row) => {
  // check if ID exists to prevent duplicates
  const checkItem = document.getElementById(row.id);
  if (!checkItem) {
    // create li
    const li = document.createElement('li');
    li.innerHTML = `${row.item} `;
    li.setAttribute('id', `row-${row.id}`);
    // create button
    const remove = document.createElement('button');
    remove.innerHTML = 'X';
    remove.setAttribute('id', row.id);
    remove.setAttribute('class', 'delete-button');
    li.appendChild(remove);
    document.getElementById('task-list').appendChild(li);
  }
};

// fetch request to get items in database and render them
const getTasks = () => {
  fetch('/task')
    .then((response) => response.json())
    .then((data) => data.rows)
    .then((rows) => {
      rows.forEach((el) => {
        renderRow(el);
      });
    })
    .catch((err) => console.log(err));
};

// fetch request to insert new item in to database
const addTask = (string) => {
  // console.log(string);
  const body = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: string,
    }),
  };
  fetch('/task', body)
    .then((res) => res.json())
    .then(getTasks())
    .then(() => {
      document.getElementById('task').value = '';
    })
    .catch((err) => console.log(err));
};

// fetch request to remove items
const deleteTask = (num) => {
  const body = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: num,
    }),
  };
  fetch('/task', body)
    .catch((err) => console.log(err));
};

// gets items when get tasks button is clicked or when page loads
window.addEventListener('DOMContentLoaded', () => {
  getTasks();
  document.getElementById('retrieve').addEventListener('click', getTasks);
});

// event listeners for the add task button and for the delete button
window.addEventListener('click', (event) => {
  if (event.target.id === 'task-button') {
    const newTask = document.getElementById('task').value;
    if (newTask !== '') addTask(newTask);
  }
  if (event.target.className === 'delete-button') {
    const { id } = event.target;
    document.getElementById(`row-${id}`).remove();
    event.target.remove();
    deleteTask(id);
  }
});

// console.log(document.getElementById('retrieve'));
