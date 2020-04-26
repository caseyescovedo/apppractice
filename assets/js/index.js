///////// SECRETE PAGE functionalities //////////
// Upon page load, send GET to retrieve all tasks from db.
// CB func to send GET request to server to retrieve tasks from db.
const getTasksFromDB = () => {
  fetch('/task', {
    method: 'GET',
  })
  .then(tasks => tasks.json())
  .then(array => {
    // First, clear <li>s inside <ul>.
    ul.innerHTML = '';

    // Iterate over the array of tasks and create a <li> elem for each.
      // Display all <li> inside #task-list.
    array.forEach((task) => {
      const newLi = document.createElement('li');
      newLi.innerText = task.item;

      // Attach a delete btn to each <li>.
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'X';
      deleteBtn.setAttribute('class', 'remove');
      // Give each btn a unique id corresponds to the task's SQL _id.
      deleteBtn.setAttribute('id', task._id);
      // Upon btn click, invoke CB func that deletes the task from db.
      deleteBtn.addEventListener('click', (e) => deleteTaskFromDB(e.target.id))
      // newLi.appendChild(document.createElement('br'));
      newLi.appendChild(deleteBtn);

      // Adding each <li> to <ul>:
        // Using .prepend so newer items are on top.
      document.querySelector('#task-list').prepend(newLi);
    })
  })
  .catch(err => {console.log(err)})
};

getTasksFromDB();

const ul = document.querySelector('#task-list');

const addTaskBtn = document.querySelector('#task-button');
addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // Grab the text value in input field.
  const inputField = document.querySelector('#task');
  const taskTitle = inputField.value;

  const taskToBeAdded = { item: taskTitle };

  // Send POST req to server to add task.
  fetch('/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskToBeAdded)
  })
  .then(res => res.json())
  .then(data => {
    // console.log('data came back from POST req:', data);
    // Upon successful post, clear the input field, clear <ul>, and retrieve data from db again.
    inputField.value = '';
    ul.innerHTML = '';
    getTasksFromDB();
  })
  .catch(err => {console.log(err)})
});

const retrieveBtn = document.querySelector('#retrieve');
retrieveBtn.addEventListener('click', () => {
  // console.log('retrieveBtn clicked');
  getTasksFromDB();
});

// CB func that sends the delete req to server to delete task from db:
const deleteTaskFromDB = (id) => {
  // The id will be found by server in req.params
  fetch(`/task/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then(data => {
    // Upon successful deletion, clear all <li>s, and retrieve all from db again.
      // This way the user doesn't have to click 'Get Task' to refresh the view.
    document.querySelector('#task-list').innerHTML = '';
    getTasksFromDB();
  })
  .catch(err => {console.log(err)})
};