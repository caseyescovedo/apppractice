// DOM must be loaded before we can manipulate DOM
document.addEventListener('DOMContentLoaded', () => {
  // All functionality here

  // Get Tasks button event listener
  const getTasksButton = document.getElementById('retrieve');
  getTasksButton.addEventListener('click', (e) => {
    e.preventDefault();
    // Clear out existing task-list
    const taskListUL = document.getElementById('task-list');
    taskListUL.innerHTML = '';
    // Note: instead of clearing out div, should refactor to iterate through response and only append new items

    // fetch
    fetch('/getTasks')
      .then((res) => res.json())
      .then((data) => {
        // Iterate over response
        // Create li's and append to ul
        data.forEach((item) => {
          const li = document.createElement('li');
          li.setAttribute('id', item.id);
          li.innerText = item.item;

          const button = document.createElement('button');
          button.setAttribute('data-id', item.id);
          button.setAttribute('class', 'remove');
          button.innerText = 'X';

          li.appendChild(button);
          taskListUL.appendChild(li);
        });
      })
      .catch((err) => console.log(err));
  });

  // Add task button event listener
  const addTaskButton = document.getElementById('task-button');
  addTaskButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Get value from input box and clear the form
    const input = document.getElementById('task');
    const item = input.value;
    input.value = '';

    // Send post request, then get all tasks again
    const postObj = {
      item,
    };

    fetch('/postTask', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(postObj),
    })
      .then(() => {
        document.getElementById('retrieve').click();
      })
      .catch((err) => console.log(err));
  });

  // Global click handler for removing items
  // Only makes a fetch if user clicked on an 'X' button with data-id attr
  document.addEventListener('click', (e) => {
    e.preventDefault();
    // Get ID of li to delete from the button's data-id attr
    const dataId = e.target.getAttribute('data-id');

    // If the element has a data-id (only Remove buttons do)
    if (dataId) {
      // Delete the item from the DOM immediately
      const toDelete = document.getElementById(dataId);
      toDelete.parentNode.removeChild(toDelete);

      // Send DELETE request to remove item from database
      const deleteObj = {
        id: dataId,
      };
      fetch('/deleteTask', {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(deleteObj),
      })
        .catch((err) => console.log(err));
    }
  });
});
