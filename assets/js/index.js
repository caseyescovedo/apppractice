/* eslint-disable */

// - Code to execute when all DOM content is loaded. 
document.addEventListener("DOMContentLoaded", function(event) {

const ul = document.querySelector('#task-list');
const retrieve = document.querySelector('#retrieve');
const newTask = document.querySelector('#task');


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

// These list items should display the task item followed by a `button` (inside the list item) with a class of `remove` and display an `X`. As an example, one list item might look like
// `<li>Go shopping <button class="remove" >X</button></li`


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
  }

  )
    

  console.log('data is ', data)
  // assign innertext to li and create id of objectId
    // attach remove button to parent li
  // append li to ul 
}


retrieve.addEventListener('click', getTasks, {once: true})


});