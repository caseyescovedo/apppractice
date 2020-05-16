/* eslint-disable consistent-return */
/*
When the button is clicked to get tasks, 
all tasks from the database should be displayed
 as list items in the `#task-list` element. 
 These list items should display the task item followed 
 by a `button` (inside the list item) with a class of `remove` 
 and display an `X`. As an example, one list item might look like
      `<li>Go shopping <button class="remove">X</button></li`
*/

function handleRetrieve() {
  // get all tasks from db

  let run = false;
  return () => {
    if (run === true) return;
    return fetch('/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('data: ', data);
        let li;
        let btn;
        console.log(data);
        data.forEach((elem, idx) => {
          // console.log(elem);
          console.log(elem.item);
          // create li
          li = document.createElement('li');
          li.innerText = elem.item;
          // create button
          btn = document.createElement('button');
          btn.className = 'remove';
          btn.innerText = 'X';
          li.appendChild(btn);
          document.getElementById('task-list').appendChild(li);
          let run = true;
        });
      });
  };
}

function handleAdd() {
  // do something

  const item = document.getElementById('task').value;
  console.log('Item: ', item);
  fetch('/api/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item }),
  });
}

function handleRemove(e) {
  // do something here to remove task
  e.preventDefault();
  console.log(e.target);
}

// get retrieve element from DOM
const retrieve = document.getElementById('retrieve');
if (retrieve) {
  console.log('hi');
  retrieve.addEventListener('click', handleRetrieve());
}

// get task-button element from DOM
const taskButton = document.getElementById('task-button');
if (taskButton) {
  console.log('task button');
  taskButton.addEventListener('click', handleAdd);
}

// get delete-button element from DOM
const deleteButton = document.getElementsByClassName('remove');
if (deleteButton) {
  console.log('delete button');
  deleteButton.addEventListener('click', (e) => handleRemove(e));
}
