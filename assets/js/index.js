/*
 * Main function/event, when page loads..
*/
document.addEventListener('DOMContentLoaded', () => {
  const displayTask = document.getElementById('retrieve');
  displayTask.addEventListener('click', () => getTask());

  const addNewTask = document.getElementById('task-button');
  addNewTask.addEventListener('click', () => postTask());

  const signin = document.getElementById('submit');
  // signin.addNewTask.addEventListener('click', () => postTask());
});


/*
 * getTask does GET FETCH
*/
function getTask() {
  document.getElementById('task-list').innerHTML = '';
  fetch('/task')
    .then((res) => res.json())
    .then((array) => {
      array.forEach((task) => createTaskOnDom(task));
    })
    .catch((err) => {
      console.log('error at getTask', err);
    });
}

/*
 * createTask creates the list item on the DOM
*/
function createTaskOnDom(taskObj) {
  // console.log('taskObj received from post: ', taskObj);

  const taskList = document.getElementById('task-list');

  // creating <li>
  const listItem = document.createElement('li');
  listItem.className = 'task';
  listItem.innerText = taskObj.item;

  // delBtn functionalities
  const delBtn = document.createElement('button');
  delBtn.className = 'remove';
  delBtn.innerText = 'x';
  delBtn.onclick = () => deleteTask(taskObj._id);

  listItem.appendChild(delBtn);
  taskList.appendChild(listItem);
}

/*
 * postTask does POST FETCH
*/
function postTask() {
  const item = document.getElementById('task').value;
  // console.log({ item }); // this sets the value of item to a key of item
  // console.log('text from the task text field: ', item);
  // console.log(JSON.stringify(item));
  fetch('/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('task item received from server: ', data);
      return getTask();
    })
    .catch((error) => {
      console.error('Error at postTask:', error);
    });
}


/*
 * deleteTask does DELETE FETCH
*/
function deleteTask(id) {
  fetch(`/task/${id}`, {
    method: 'DELETE',
  })
    // .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        return getTask();
      }
      return alert('Wrong credentials!')
    })
    .catch((err) => console.log(err));
}



// When the button is clicked to get tasks, 
// all tasks from the database should be displayed as
//  list items in the #task-list element. These list items
//   should display the task item followed by a button (inside the list item)
//    with a class of remove and display an X. As an example, 
//    one list item might look like 
//    <li>Go shopping <button class="remove">X</button></li
//  Multiple clicks of the button to get tasks
//   should not display the list items multiple times

//  Clicking on the button to add a task 
//  should take the text from the input field 
//  and create a new task in the database. 
//  This task should be seen by clicking the button to get tasks after
//   it has been added. 
//   (Optionally, you can display the new task immediately after adding.)
//  Clicking on any list item's X button should remove the item from the list 
//  (immediately) and delete the task from the database
