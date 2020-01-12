/*
When the button is clicked to get tasks, all tasks from the database should be displayed as list items in the #task-list element. 
These list items should display the task item followed by a button (inside the list item) with a class of remove and display an X. 
As an example, one list item might look like <li>Go shopping <button class="remove">X</button></li>
Multiple clicks of the button to get tasks should not display the list items multiple times
Clicking on the button to add a task should take the text from the input field and create a new task in the database. 
This task should be seen by clicking the button to get tasks after it has been added. 
(Optionally, you can display the new task immediately after adding.)
Clicking on any list item's X button should remove the item from the list (immediately) and delete the task from the database
*/

//on click of 'get tasks' button, fetch tasks and invoke appendToDom function for each data obj,
//which will create a <li> of each task item with a delete 'x' button per <li>
document.getElementById('retrieve').addEventListener('click', e => {
  fetch('/tasklist')
    .then(resp => resp.json())
    .then(data => {
      data.forEach(taskObj => {
        appendToDom(taskObj);
      });
    });
});

//on click of 'add task' button, grab user input in 'task' textbox and post to database as a new task item,
//then invoke appendToDom function so the newly added item will be rendered as a new <li> item with delete button
document.getElementById('task-button').addEventListener('click', e => {
  const taskInput = document.getElementById('task');
  const newTask = taskInput.value;
  fetch('/tasklist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task: newTask })
  })
    .then(resp => resp.json())
    .then(data => {
      const taskObj = data[0];
      appendToDom(taskObj);
    });
});

//function to create <li> and delete button per task item, then append these to the <ul> 'task-list'
function appendToDom(taskObj) {
  const newTask = document.createElement('li');
  newTask.id = taskObj.id;
  newTask.innerText = taskObj.item;

  const deleteBtn = document.createElement('button');
  deleteBtn.id = taskObj.id;
  deleteBtn.setAttribute('class', 'remove');
  deleteBtn.innerHTML = 'X';
  deleteBtn.addEventListener('click', e => {
    fetch(`/tasklist/${e.target.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        document.getElementById('task-list').removeChild(newTask);
      });
  });
  document
    .getElementById('task-list')
    .appendChild(newTask)
    .appendChild(deleteBtn);
}
