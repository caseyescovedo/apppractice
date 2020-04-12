const tasks = document.getElementById('task-list');
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
  fetch('/items', {
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
  fetch('/items')
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      const taskList = document.getElementById('task-list');
      //sets the task list to an empty string
      taskList.innerHTML = '';
      //loop through the task list to display the items
      for (let i = 0; i < res.length; i++) {
        //creates a list item in the task list
        let oneTask = document.createElement('li');
        //These list items should display the task item followed by a button (inside the list item) with a class of remove and display an X.
        //creates a delete button ans listens for when the button has been clicked
        const deleteBttn = document.createElement('button');
        deleteBttn.textContent = 'X';
        //adds a class to the delete button
        deleteBttn.classList.add('remove');
        //connects the id from the response to the delete button
        deleteBttn.setAttribute('id', res[i]._id);
        // console.log(res[i]._id);

        //sets the inside of the task item to have the to do
        oneTask.textContent = res[i].item;
        //adds the task item to the task item list
        taskList.appendChild(oneTask);
        // attaches the task item to the delete button
        oneTask.appendChild(deleteBttn);

        //Clicking on any list item's X button should remove the item from the list (immediately) and delete the task from the database
        deleteBttn.addEventListener('click', (e) => {
          // has all of the delete task funcitonallity
          //removes the task item from the task list which will  also remove the delete button
          tasks.removeChild(e.target.parentElement);
          // console.log(_id);
          console.log(res);
          //grabs the task by its id
          fetch('/items', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'Application/JSON',
            },
            body: JSON.stringify({ _id: res[i]._id }),
          }).catch((err) => {
            console.error(`Error in the delete message from the index.js ${err}`);
          });
        });
      }
    })
    .catch((err) => {
      console.error(`Error in the get message from the index.js: ${err}`);
    });
}
