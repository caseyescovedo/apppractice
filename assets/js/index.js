
const displayTasks = (tasks) => {
  console.log('Displaying tasks');
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
  console.log('Adding task to list');
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
  console.log('Removing task from list', id);
  const taskList = document.getElementById('task-list');
  const listItem = document.getElementById(`task-${id}`);
  taskList.removeChild(listItem);
};

const getTasks = () => {
  console.log('Invoked getTasks');

  fetch('/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('data retrieved', data);
    displayTasks(data);
  })
  .catch((error) => {
    console.log('fetch get /tasks caught error', error);
  });
};

const addTask = () => {
  console.log('Invoked addTask');
  const task = document.getElementById('task').value;
  console.log('task to add is', task);

  const newTask = {
    item: task,
    created_at: Date.now(),
  };
  
  console.log('new task object to add is', newTask);
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('data retrieved', data);
    addTasktoList(data);
  })
  .catch((error) => {
    console.log('fetch post /tasks caught error', error);
  });
};

const deleteTask = () => {
  console.log('Invoked deleteTask');
  const id = event.target.id.slice(event.target.id.lastIndexOf('-') + 1);
  console.log('id to delete is ', id);
  // const listItem = document.getElementById(`task-${id}`);
  // console.log('task to delete is', listItem.childNodes[0].nodeValue);
  // console.log('task to delete is', listItem.id);

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
    console.log('data retrieved', data);
    removeTaskFromList(id);
  })
  .catch((error) => {
    console.log('fetch delete /tasks caught error', error);
  });
};
