
const displayTasks = (tasks) => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    const listText = document.createTextNode(task.item);
    listItem.id = `task-${task._id}`;
    const listButton = document.createElement('button');
    const buttonText = document.createTextNode('X');
    listButton.className = 'remove';
    listButton.id = `button-${task._id}`;
    listButton.addEventListener('click', deleteTask);
    listButton.appendChild(buttonText);
    listItem.appendChild(listText);
    listItem.appendChild(listButton);
    taskList.appendChild(listItem);
  })
};

const addTasktoList = (task) => {
  const taskList = document.getElementById('task-list');
  const listItem = document.createElement('li');
  const listText = document.createTextNode(task.item);
  listItem.id = `task-${task._id}`;
  const listButton = document.createElement('button');
  const buttonText = document.createTextNode('X');
  listButton.className = 'remove';
  listButton.id = `button-${task._id}`;
  listButton.addEventListener('click', deleteTask);
  listButton.appendChild(buttonText);
  listItem.appendChild(listText);
  listItem.appendChild(listButton);
  taskList.appendChild(listItem);
};

const removeTaskFromList = (id) => {
  const taskList = document.getElementById('task-list');
  const listItem = document.getElementById(`task-${id}`);
  taskList.removeChild(listItem);
};

const getTasks = () => {
  fetch('/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    displayTasks(data);
  })
  .catch((error) => {
    console.log('fetch get /tasks caught error', error);
  });
};

const addTask = () => {
  const task = document.getElementById('task').value;
  const newTask = {
    item: task,
    created_at: Date.now(),
  };
  
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  })
  .then((response) => response.json())
  .then((data) => {
    addTasktoList(data);
  })
  .catch((error) => {
    console.log('fetch post /tasks caught error', error);
  });
};

const deleteTask = () => {
  const id = event.target.id.slice(event.target.id.lastIndexOf('-') + 1);
  const task = { _id: id };

  fetch('/tasks', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
  .then((response) => response.json())
  .then((data) => {
    removeTaskFromList(id);
  })
  .catch((error) => {
    console.log('fetch delete /tasks caught error', error);
  });
};
