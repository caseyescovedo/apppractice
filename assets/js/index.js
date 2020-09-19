// You should also serve the CSS and JS that the html files are requesting. 
//These are located in the assets folder. Make sure the Content-Type header 
//is getting properly set in the HTTP response. 
//(Some methods from some frameworks infer the content type from the file extension and set the header automatically.)

// When the button is clicked to get tasks, all tasks from the database should be displayed as list items in the #task-list element. 
  // These list items should display the task item followed by a button (inside the list item) with a class of remove and display an X. 
  // As an example, one list item might look like <li>Go shopping <button class="remove">X</button></li
// Multiple clicks of the button to get tasks should not display the list items multiple times
// Clicking on the button to add a task should take the text from the input field and create a new task in the database. 
  //This task should be seen by clicking the button to get tasks after it has been added. (Optionally, you can display the new task immediately after adding.)
// Clicking on any list item's X button should remove the item from the list (immediately) and delete the task from the database

// index.js not connecting with secret.html....
// Declare constants for major tags

// body
const body = document.querySelector('body');

//title
const title = document.createElement('h1');
title.innerText('Joon\'s Tasks');
body.prepend(title);

//mainDiv
const mainDiv = document.createElement('div');
mainDiv.setAttribute('id', 'mainDiv');
body.prepend(mainDiv);

// unordered list
const ul = document.createElement('ul');
body.prepend(ul);

// get tasks
document.querySelector("#retrieve").addEventListener("click", () => {
  fetch('/api/getTask')
    .then(res => res.json())
    .then(data => {
      for (let key of data) {
        const list = document.createElement('li').innerHTML(data[key]);
        ol.appendChild(list)
      }
    })
    .catch(err => console.log(err))
});

// post tasks
    // get value of input box
const item = document.querySelector('task').value;
document.getElementById('task-button').addEventListener("click", () => {
  const postObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: item,
      date: 'hardcode this',
      created_at: `${new Date().toLocaleTimeString()}`,
      cost: 2.75
    })
  }

  fetch('/api', postObj)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
});

