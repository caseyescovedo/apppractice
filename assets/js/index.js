/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

// declare get taskList so we can append lists from database to it
const taskList = document.getElementById('task-list');
// get buttons so we can add event listeners to them
const getButton = document.getElementById('retrieve');
const postButton = document.getElementById('task-button');
const taskInput = document.getElementById('task');

// let taskArr = [];

// create a function to deliver the delete fetch request after pressing x button
const deleteTask = (elemId) => {
  fetch('/task', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    // ensure id of the element to be deleted is turned into json before sending
    body: JSON.stringify({
      id: elemId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('deleted', data[0]);
      // remove list from DOM by selecting the element by id and removing it
      const listToDelete = document.getElementById(data[0]._id);
      listToDelete.parentNode.removeChild(listToDelete);
    })
    .catch((err) => console.log('error in deleteFunc', err));
};

// create function to create a list based on the object that comes back from database
const createListElement = (obj) => {
  // create a condition so that the same task doesn't get added twice
  if (document.getElementById(obj._id) !== null) return;
  // otherwise create a list element
  const list = document.createElement('li');
  list.innerText = obj.item;
  list.className = 'list-class';
  list.id = obj._id;
  // append list to taskList
  taskList.appendChild(list);

  // create a deleteButton associated with each list
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.className = 'remove';
  // add an event listener so that when you click it
  // it deletes the item with the same id in the database
  deleteButton.addEventListener('click', () => deleteTask(obj._id));
  list.appendChild(deleteButton);
};

// create a function to fetch all the tasks from the database after pressing 'get tasks'
const getAllTasks = () => {
  fetch('/task')
    .then((res) => res.json())
    .then((data) => {
    //   if (data == taskArr) return;
    //   taskArr = data;
      console.log(data);
      // iterate through each row of the array and create a list element
      for (const obj of data) {
        // invoke createListElement on each object of the array
        createListElement(obj);
      }
    })
    .catch((err) => console.log('Error in getButton', err));
};

// add the event listening and function to the getButton
getButton.addEventListener('click', () => getAllTasks());

// create addTask function that adds tasks to the database and html list
const addTask = () => {
  // create a new date object to record timestamp
  const date = new Date();
  // make a fetch post request to post data into database
  fetch('/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // ensure id of the element to be added is turned into json before sending
    body: JSON.stringify({
      item: taskInput.value,
      // turn date into JSON string before sending off
      createdAt: date.toJSON(),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('posted', data);
      // invoke createListElement using the data that was posted to the database
      createListElement(data[0]);
    })
    .catch((err) => console.log('error in addTask Func', err));
};

// invoke addTask function when you click on postButton
postButton.addEventListener('click', () => addTask());

// load tasks when window loads
window.addEventListener('load', () => getAllTasks());
