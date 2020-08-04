// const { get } = require("request");

/*
 * createTaskListElements
 * INPUT: a JS object representing all documents in the Tasks collection
 * ACTION: use data in INPUT to populate and inject li elements into the DOM
 */
const createTaskListElements = (tasksArray) => {
  // Create a reference to the <ul> element with id #task-list in secret.html
  const taskListContainer = document.getElementById('task-list');
  if (!taskListContainer.innerHTML.length) {
    // Loop through each task item in the response array
    tasksArray.forEach((taskObject) => {
      // Append <li> elements to the container, 
      // each populated with task item data and a delete button
      taskListContainer.innerHTML += `<li id=${taskObject._id}>${taskObject.item} <button class='remove'>X</button></li>`;
    });

    // Create array of all the <li> items in secret.html DOM
    const listElements = document.querySelectorAll('li');
    // Create array of all the delete buttons in secret.htm DOM (1-to-1 with listItems)
    const deleteButtons = document.getElementsByClassName('remove');

    addDeleteFunctionality(deleteButtons, listElements);
  }
};

/* 
 * addDeleteFunctionality 
 * INPUT: an array of DOM button elements + an array of DOM li elements
 * ACTION: Add click event listener that deletes the document with a delete button's li id attribute
 */
const addDeleteFunctionality = (deleteButtons, listItems) => {
  // Convert NodeList to Array for iteration
  const listElements = Array.from(listItems);
  // Loop over all delete buttons, adding a click event listener to each
  Array.from(deleteButtons).forEach((deleteButton, i) => {
    // Create variable to hold the 1-to-1 match with a given delete button
    const correspondingItem = listElements[i];
    // Add DELETE functionality to each delete button's click handler
    deleteButton.addEventListener('click', () => {
      // Make DELETE request with this item's database ID (stored in
      // <li> element id attribute) as the endpoint parameter
      fetch(`/api/tasks/${correspondingItem.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          correspondingItem.remove();
          console.log(`index.js: TASK DELETED SUCCESSFULLY`);
        })
        .catch((err) => {
          console.log(`index.js: ERROR DELETING A TASK:\n${err}`);
        });
    });
  });
}

/* 
 * addCreateFunctionality
 * INPUT: A DOM button element
 * ACTION: Add click event listener that posts to the DB with input value
 */
const addCreateFunctionality = (addTaskButton) => {
  addTaskButton.addEventListener('click', async () => {
    // Store text string from input field (only one in secret.html)
    const itemText = document.querySelector('input').value;
    // Clear input field visually for user
    document.querySelector('input').value = '';
    // Make POST request with itemText in body
    fetch('/api/tasks', {
      method: 'POST',
      // NOTE: body data type must match Content-Type header
      body: JSON.stringify({ itemText }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`index.js: TASK ADDED SUCCESSFULLY:\n${data}`);
      })
      .catch((err) => {
        console.log(`index.js: ERROR ADDING A TASK:\n${err}`);
      });
  });
}

window.addEventListener('load', () => {

  // Upon Get Tasks button click, all tasks from database should be displayed as <li> items in the #task-list element
  // Each list item should display the task item text followed by a nested <button class='remove'>X</button> element
  const getTasksButton = document.getElementById('retrieve');
  getTasksButton.addEventListener('click', () => {
    // Make a GET request to the /tasks endpoint in our server
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => {
        console.log(`index.js: TASKS DATA GOTTEN:\n${data[0]._id}`);
        createTaskListElements(data);
      })
      .catch((err) => {
        console.log(`index.js: ERROR GETTING ALL TASKS:\n${err}`);
      });
  });

  const addTaskButton = document.getElementById('task-button');
  addCreateFunctionality(addTaskButton);
});