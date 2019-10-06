console.log('hello world')

// HTML elements pre-set to secret.html  
const createDiv = document.getElementById('create');
const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('task-button');
const getTasksButton = document.getElementById('retrieve');
const taskListUl = document.getElementById('task-list');

// when getTasksButton is clicked..
getTasksButton.addEventListener('click', () => {
  console.log('get tasks button clicked')
// ..get tasks from the db..
  fetch('/secret/items')
  .then(res => res.json())
  .then(data => {
    for (let i = 0; i < data.rows.length; i += 1) {
      const taskObj = data.rows[i]
      console.log(taskObj);
// ..use the 'addTask' cb to render each one's data (obj) to the DOM
      addTask(taskObj);
    }
  })
  .catch(err => console.log(err))
})

// when addTaskButton is clicked..
addTaskButton.addEventListener('click', () => {
  console.log('add task button clicked')
// ..assign the value of the input element's text to a variable
  const itemValue = taskInput.value;
// ..store the variable as an obj..  
  // const taskObj = { item: itemValue, created_at: new Date() };
  const taskObj = { item: itemValue };
  console.log(taskObj)
// ..use the 'addTask' cb to render the new task's data to the DOM.. 
  addTask(taskObj);
// ..post the new task to the db..
  fetch('/secret/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskObj)
  })
  .then(res => res.json())
  .then(success => console.log('successful post'))
  .catch(err => console.log(err))
// ..and reset the input form's text 
  taskInput.value = '';
})

// helper function used to render tasks to the DOM
function addTask(obj) {
  const li = document.createElement('li');
  // const span = document.createElement('span');
  const removeButton = document.createElement('button');

  removeButton.setAttribute('class', 'remove')

  removeButton.onclick = removeTask;

  li.innerHTML = obj.item;
  removeButton.innerText = 'X';

  li.appendChild(removeButton);
  taskListUl.appendChild(li);
}

function removeTask() {
  const item = this.previousSibling.data;
  console.log(item)
  this.parentElement.remove();
  fetch('/secret/items', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({item})
  })
  .then(res => console.log('entry deleted from db'))
  .catch(err => console.log(err))
}
