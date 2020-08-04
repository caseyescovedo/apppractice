// when retrieve button is clicked get all tasks

// start by defining a function to get all tasks
const getAllTasks = () => {
  // send a fetch request to retrieve tasks
  fetch('./tasks')
    .then((res) => res.json())
    .then((data) => {
      // iterate through array of objects
      data.forEach((obj) => {
        // grab the unordered list
        const taskList = document.getElementById('task-list');
        const listItem = document.createElement('li');
        const listButton = document.createElement('button');
        listButton.setAttribute('class', 'remove');
        listButton.innerHTML = 'X';
        listItem.innerHTML = obj.item;
        listItem.appendChild(listButton);
        taskList.appendChild(listItem);
      });
    })
    .catch((err) => console.log(err));
};

// create a function that adds a task from the input field
const addTask = () => {
  // grab the value from inside the input
  const newTask = document.getElementById('task').value;
  const taskBody = { item: newTask };
  // send a fetch request with a post method to add a task
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskBody),
  })
    .then((res) => res.json())
    .then((data) => console.log('success', data))
    .catch((err) => console.log(err));
  // reset the input text to nothing
  document.getElementById('task').value = '';
};

// create a function that will delete a list item
const deleteTask = (task) => {
  // grab the item value
  const taskBody = JSON.stringify({ item: task });
  // send a fetch request to delete
  fetch('/tasks/:id', {
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json',
    },
    body: taskBody,
  })
    .then((res) => res.json())
    .then((data) => console.log('success', data))
    .catch((err) => console.log(err));
};

// use getAllTasks() with an event handler for Get Tasks button
const retrieveButton = document.getElementById('retrieve');
retrieveButton.addEventListener('click', () => {
  getAllTasks();
});

// use addTask() with an event handler to add a task
const taskButton = document.getElementById('task-button');
taskButton.addEventListener('click', () => {
  addTask();
});

// use deleteTask() with an event handler and innertext
const deleteButtons = document.getElementsByClassName('remove');

deleteButtons.forEach((btn) => {
  console.log('what\'s going on');
  btn.addEventListener('click', () => {
    deleteTask();
  });
});
