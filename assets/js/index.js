// to get all tasks
const getTasks = async () => {
  // gather items from db
  const items = await fetch('/getTasks')
    .then(data => data.json())

  // for each item in items array, create new li with button and append to task-list
  const taskList = document.getElementById('task-list');

  // if task already exists, move on. if it doesn't add to dom.
  if (document.getElementsByClassName('item').length === 0) {

    for (let i = 0; i < items.length; i++) {
      const text = items[i].item;
      // ideally would not use _id (primary key) as id for html tags, would use either hashing function or something else to be safe. Tried using timestamp before but couldn't figure out how to query timestamp in PostgreSQL -- think it has to do with type of timestamps.
      const id = items[i]._id;

      // create task li
      const task = document.createElement('li');
      const taskText = document.createTextNode(text);
      task.setAttribute('id', id);
      task.setAttribute('class', 'item');
      task.appendChild(taskText);

      // create remove button
      const button = document.createElement('button');
      const btnText = document.createTextNode('X');
      button.setAttribute('class', 'remove');
      button.appendChild(btnText);
      task.appendChild(button);

      // delete functionality
      button.onclick = () => {
        fetch('/deleteTask', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ taskId: id })
        })

        taskList.removeChild(task);
      }

      taskList.appendChild(task);
    }
  }
}

const getButton = document.getElementById('retrieve');
getButton.onclick = getTasks();

// add new task
const addButton = document.getElementById('task-button');
addButton.onclick = async () => {
  // grab text value from input box
  let newItem = document.getElementById('task').value;

  const data = await fetch('/postTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newItem: newItem })
  })
    .then(data => data.json());

  // render new task - not DRY, will refactor into smaller reusable functions to create li and button elements if I have time
  const taskList = document.getElementById('task-list');
  // create task li
  const task = document.createElement('li');
  const taskText = document.createTextNode(newItem);
  task.setAttribute('id', data[data.length - 1]._id);
  task.setAttribute('class', 'item');
  task.appendChild(taskText);

  // create remove button
  const button = document.createElement('button');
  const btnText = document.createTextNode('X');
  button.setAttribute('class', 'remove');
  button.appendChild(btnText);
  task.appendChild(button);

  // delete functionality
  button.onclick = () => {
    fetch('/deleteTask', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ taskId: data[data.length - 1]._id })
    })

    taskList.removeChild(task);
  }

  taskList.appendChild(task);

  // clear input field
  document.getElementById('task').value = '';
}

console.log('im on both html pages')