// append to do list to the html element
const todoList = document.getElementById('task-list');
// add click function to Get Task button
const getButton = document.querySelector('#retrieve');
getButton.addEventListener('click', () => getAllTasks());
// add click function to Add Task button
const addButton = document.querySelector('#task-button');
addButton.addEventListener('click', () => addTask());

// define get task functionality
function getAllTasks() {
  //   console.log('here');
  fetch(`/api`)
    .then((resp) => resp.json())
    .then((data) => {
      // make sure page doens't display multiple times when cliking the button multiple times
      todoList.innerHTML = '';
      // create and display li items
      for (let element of data.rows) {
        // example, <li>Go shopping <button class="remove">X</button></li>
        const li = document.createElement('li');
        for (let key in element) {
          const p = document.createElement('p');
          p.innerText = element[key];
          li.appendChild(p);
        }
        // add delete button to each li item
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.className = 'remove';
        deleteButton.addEventListener('click', () => deleteTask(element._id));
        li.appendChild(deleteButton);
        todoList.appendChild(li);
      }
    })
    .catch((err) => console.log(err));
}

// define delete task functionality
function deleteTask(item) {
  const deleteObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: item }),
  };
  fetch('/api', deleteObj)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
    })
    .then(() => getAllTasks())
    .catch((err) => {
      console.log(err);
    });
}

// define add task functionality
function addTask() {
  const newItem = document.querySelector('#task');
  const addTaskObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: newItem.value,
    }),
  };

  fetch('/api', addTaskObj)
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .then(() => getAllTasks())
    .catch((err) => console.log(err));
}
