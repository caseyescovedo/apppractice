const retrieveButton = document.getElementById('retrieve');
const addButton = document.getElementById('task-button');
const taskList = document.getElementById('task-list');
const input = document.getElementById('task');


const addDeleteEvent = (id) => {
  const btn = document.getElementById(id);
  btn.addEventListener('click', () => {
    const listItem = btn.parentElement;
    listItem.parentNode.removeChild(listItem);
    fetch('/tasks', {
      method: 'DELETE',
      body: JSON.stringify({
        id: listItem.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(err => console.log(err));
  });
}

const createTask = (task) => {
  const taskNode = document.createElement('li');
  taskNode.id = task._id;
  taskNode.className = 'task-item';
  taskNode.innerHTML = `${task.item}<button id="btn${task._id}" class="remove">X</button>`;
  taskList.append(taskNode);
  addDeleteEvent(`btn${task._id}`);
}

retrieveButton.addEventListener('click', () => {
  const listItems = document.getElementsByClassName('task-item');
  if (!listItems.length) {
    fetch('/tasks')
      .then(res => res.json())
      .then(tasks => {
        tasks.forEach(task => {
          createTask(task);
        });
      })
      .catch(err => console.log(err));
  }
});

addButton.addEventListener('click', () => {
  let taskText = input.value;
  if (taskText) {
    fetch('/tasks', {
      method: 'POST',
      body: JSON.stringify({
        task: taskText
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(newTaskDoc => {
        createTask(newTaskDoc);
        taskText = '';
      })
      .catch(err => console.log(err));
  }
});

