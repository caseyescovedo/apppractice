console.log('index.js')
// add an event listener to get tasks when we click the get tasks button 
const getList = document.querySelector('#retrieve');
console.log(getList);
let clicked = false;
getList.addEventListener('click', (e) => {
  e.preventDefault();
  if(clicked === false){
    fetch('/getTasks')
    .then(data => data.json())
    .then(getTasks => {
      console.log('getting tasks: ', getTasks);
      appendToDom(getTasks);
    })
    .catch(err => console.log(err))
  }
  clicked = true;
})

// EXAMPLE OF WHAT WE SHOULD APPEND TO DOM
// <li>Go shopping <button class="remove">X</button></li>
const appendToDom = (tasks) => {
  // select task-list ul to append an li for each task on the list
  const taskList = document.querySelector('#task-list');
  // loop through all the tasks and do the following:
  tasks.forEach(el => {
    // create both item li element and delete button element
    const item = document.createElement('li');
    const deleteBtn = document.createElement('button');
    // set text for item to whatever the response text is
    item.innerText = el.item;
    // set text for delete button to X
    deleteBtn.innerText = 'X';
    // set classname remove to delete button
    // also set a data- attribute so you can get the id of the item for deletion
    deleteBtn.setAttribute('class', 'remove');
    deleteBtn.setAttribute('data-id', el.id);
    // append everything to dom
    item.appendChild(deleteBtn);
    taskList.appendChild(item);
  })
};

const addBtn = document.querySelector('#task-button');
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const item = document.querySelector('#task').value;
  fetch('/newTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item }),
  })
    .catch((err) => console.log(err));
})

document.body.addEventListener('click', (e) => {
  if (e.target.className === 'remove') {
    fetch('/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: e.target.dataset.id })
    })
      .catch((err) => console.log(err));
  }
})