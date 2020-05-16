/* eslint-disable */

// - Code to execute when all DOM content is loaded. 
document.addEventListener("DOMContentLoaded", function(event) {

const ul = document.querySelector('#task-list');
const retrieve = document.querySelector('#retrieve');
const addBtn = document.querySelector('#task-button');
const taskName = document.querySelector('#task');

/* Get Tasks */ 
function getTasks() {
  fetch('http://localhost:3333/api/secret', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data => {
      return renderItems(data);
    })
    .catch(err => console.log('Error getting tasks:', err))
}

function renderItems(data) {
  let tasks = data
  tasks.forEach( el => {
    let li = document.createElement('li');
    li.id = el._id;
    li.innerText = el.item;
    let btn = document.createElement('button');
    btn.className = 'remove';
    btn.innerText = 'X';
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

/* Add Task */

function checkInput() {
  if (taskName.value.length > 0 ) {
    addToDatabase();
  };
}

function addToDatabase() {
  const taskInfo = {};
  taskInfo.task = taskName.value;
  console.log(taskInfo);
  fetch('http://localhost:3333/api/secret', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskInfo)
  })
    .then(res => res.json())
    .then(data => {
      return addNewItem(data);
    })
    .catch(err => console.log('Error adding tasks:', err))
}

function addNewItem(data) {
  let li = document.createElement('li');
  li.id = data._id;
  li.innerText = data.item;
  let btn = document.createElement('button');
  btn.className = 'remove';
  btn.innerText = 'X';
  li.appendChild(btn);
  ul.appendChild(li);
}

/* Delete Task */
function deleteItem() {
  // store id of parentNode (li element) in variable
  const id = this.parentNode.id
  // remove element from dom
  // delete request using id of <li> element
}


retrieve.addEventListener('click', getTasks, {once: true})
addBtn.addEventListener('click', checkInput)
// removeBtn.addEventListener('click', deleteItem)

});