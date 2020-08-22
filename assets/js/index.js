// get tasks

const getTasksBtn = document.querySelector('#retrieve');
getTasksBtn.addEventListener('click', () => {
  // clear out the current items before you update the DOM
  const taskItemContainer = document.querySelector('#task-list');
  taskItemContainer.innerHTML = '';

  fetch('/get-tasks')
    .then((data) => data.json())
    .then((allDocs) => {
      const taskItemContainer = document.querySelector('#task-list');

      allDocs.forEach((doc) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', `${doc['_id']}`);
        listItem.innerHTML = doc['item'];

        // create delete button for each list item
        const deleteButton = document.createElement('button');
        listItem.appendChild(deleteButton);
        deleteButton.innerHTML = 'X';
        deleteButton.classList.add('remove');

        taskItemContainer.appendChild(listItem);

        // set up delete button functionality
        deleteButton.addEventListener('click', () => {
          fetch('/delete-task', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: doc['_id'] }),
          }).then(() => listItem.remove());
        });
      });
    });
});

// add tasks

const addTaskBtn = document.querySelector('#task-button');
const taskInput = document.querySelector('#task');
addTaskBtn.addEventListener('click', () => {
  fetch('/post-task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item: taskInput.value }),
  });

  //clear out input field
  taskInput.value = '';
});
