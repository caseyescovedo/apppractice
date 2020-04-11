//when the page loads, it will invoke the onload function
onload();

function onload() {
  //event listener for when the get tasks button is clicked
  const loadTask = document.getElementById('retrieve');
  loadTask.addEventListener('click', () => {
    getTask();
  });
  //event listener for when the add tasks button is clicked
  const addTask = document.getElementById('task-button');
  addTask.addEventListener('click', () => {
    postTask();
  });
}

//function to post the task with the input values
//Clicking on the button to add a task should take the text from the input field and create a new task in the database
function postTask() {
  const task = document.getElementById('task').value;
  document.getElementById.value = '';
  // if (!task.value) {
  //   alert('Task is empty');
  // } else {
  console.log('posting Task');
  fetch('/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/JSON',
    },
    body: JSON.stringify({ item: task }),
  })
    .then(getTask())
    .catch((err) => {
      console.error('Error in the post message from the index.js', err);
    });
  // }
}
//function to get all of the task
//When the button is clicked to get tasks, all tasks from the database should be displayed as list items in the #task-list element
function getTask() {
  fetch('/get')
    .then((res) => res.json())
    .then((res) => {
      const taskList = document.getElementById('task-list');
      //sets the task list to an empty string
      taskList.innerHTML = '';
      //loop through the task list to display the items
      for (let i = 0; i < res.length; i++) {
        //creates a list item in the task list
        let oneTask = document.createElement('li');
        //give the task an ID and context
        oneTask.id = res[i]._id;
        oneTask.innerHTML = res[i].item;

        //These list items should display the task item followed by a button (inside the list item) with a class of remove and display an X.
        //creates a delete button ans listens for when the button has been clicked
        const deleteBttn = document.createElement('button');
        deleteBttn.textContent = 'X';
        //Clicking on any list item's X button should remove the item from the list (immediately) and delete the task from the database
        deleteBttn.addEventListener('click', () => {
          deleteTask(res[i]._id);
        });
        //adds the task item to the task item list
        taskList.appendChild(oneTask);
        // attaches the task item to the delete button
        taskList.appendChild(deleteBttn);
      }
    })
    .catch((err) => {
      console.error('Error in the get message from the index.js', err);
    });
}
//Clicking on any list item's X button should remove the item from the list (immediately) and delete the task from the database
function deleteTask(id) {
  const deleteTask = document.getElementById(id);
  const tasks = document.getElementById('task-list');
  //removes the task item from the task list
  tasks.removeChild(deleteTask);
  //grabs the task by its id
  fetch(`/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'Application/JSON',
    },
  }).catch((err) => {
    console.error('Error in the delete message from the index.js', err);
  });
}
