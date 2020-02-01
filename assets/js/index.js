
// add an event listener to get tasks when we click the get tasks button 
const getTasks = document.querySelector('#retrieve');
getTasks.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('/getTasks')
    .then(data => data.json())
    .then(getTasks => {
      console.log('getting tasks: ', getTasks);
      appendToDom(getTasks);
    })
    .catch(err => console.log(err))
})

// EXAMPLE OF WHAT WE SHOULD APPEND TO DOM
// <li>Go shopping <button class="remove">X</button></li>
const appendToDom = (tasks) => {
  // select task-list ul to append an li for each task on the list
  const taskList = document.querySelector('#task-list');
  // loop through all the tasks and do the following:
  tasks.forEach(el => {
    const item = document.createElement('li');
    const deleteBtn = document.createElement('button');
    item.innerText = el.item;
    deleteBtn.innerText = 'X';
    deleteBtn.setAttribute('class', 'remove');
  })
};