/*
-------------------------------------
Functions for Creating and rendering
DOM Elements
-------------------------------------
*/

const createDeleteButton = (task) => {
  const deleteButton = document.createElement('button');
  const buttonValue = document.createTextNode('X');
  deleteButton.setAttribute('class', 'remove');
  deleteButton.addEventListener('click', () => {
    removeButton(task._id);
  });
  deleteButton.appendChild(buttonValue);
  return deleteButton;
};

const createTaskListItem = (task) => {
  const listItemClassName = 'listItem';
  const listNode = document.createElement('li');
  listNode.setAttribute('id', task._id);
  listNode.setAttribute('class', listItemClassName);
  const taskText = document.createTextNode(task.item);
  listNode.appendChild(taskText);
  return listNode;
};

const renderTasks = (parentNode, data) => {
  parentNode.innerHTML = '';
  data.forEach((task) => {
    const taskListItem = createTaskListItem(task);
    const deleteButton = createDeleteButton(task);
    taskListItem.appendChild(deleteButton);
    parentNode.appendChild(taskListItem);
  });
};

/*
-------------------------------
Event Handlers
-------------------------------
*/

const fetchTasks = () => {
  const nodeToAttachTo = document.getElementById('task-list');
  fetch('http://localhost:3333/tasks')
    .then((response) => response.json())
    .then((tasks) => renderTasks(nodeToAttachTo, tasks))
    .catch((e) => {
      alert('There was a failure of the getting of the tasks');
      console.log('Fetching Tasks was an epic failure. Try again', e);
    });
};

const addTask = () => {
  const taskInput = document.getElementById('task');
  const taskItemValue = taskInput.value;
  if (!taskItemValue) {
    alert('Silly, silly person, nothing is not a task. Please give me data');
    return;
  }

  fetch('http://localhost:3333/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item: taskItemValue }),
  })
    .then((response) => response.json())
    .then((task) => {
      if (!task._id) throw { message: 'Task Problem', task: task };
      const nodeToAttachTo = document.getElementById('task-list');
      const taskListItem = createTaskListItem(task);
      const deleteButton = createDeleteButton();
      taskListItem.appendChild(deleteButton);
      nodeToAttachTo.appendChild(taskListItem);
      taskInput.value = '';
    })
    .catch((e) => {
      alert('EVERYTHING FAILED...WHHHHHYYYYyyyyy?');
      console.log('ERROR!', e);
    });
};
const removeButton = (id) => {
  fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((task) => {
      if (!task._id) throw { message: 'Task Problem', task: task };
      fetchTasks();
    })
    .catch((e) => {
      alert('EVERYTHING FAILED...WHHHHHYYYYyyyyy?');
      console.log('ERROR!', e);
    });
};
