// When the button is clicked to get tasks, all tasks from the database should be displayed as list items in the #task-list element. These list items should display the task item followed by a button (inside the list item) with a class of remove and display an X. As an example, one list item might look like <li>Go shopping <button class="remove">X</button></li

const retrieveButton = document.querySelector('#retrieve');

retrieveButton.addEventListener('click', () => {
  console.log('Get Tasks clicked');

  fetch('/tasks', { 'Content-Type': 'application/json' })
  .then(resp => resp.json())
  .then(parsedData => {
    const taskList = document.querySelector('#task-list');
    parsedData.forEach(item => {
      // create list item
      let taskItem = document.createElement('li');
      taskItem.setAttribute('id', `${item['_id']}`);
      taskItem.innerHTML = item['item'];

      // create delete button
      let deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'X';
      taskItem.setAttribute('class', 'remove');
      taskItem.appendChild(deleteButton);

      // add to list
      taskList.appendChild(taskItem);

      // deleteButton event listener
      deleteButton.addEventListener('click', () => {
        fetch('/tasks', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: item['_id'] }),
        })
          .then(res => taskItem.remove())
          .catch(err => console.log(err));
      });
    });
  })
  .catch(err => console.log(err));
});


// Clicking on the button to add a task should take the text from the input field and create a new task in the database. This task should be seen by clicking the button to get tasks after it has been added. (Optionally, you can display the new task immediately after adding.)

const taskButton = document.querySelector('#task-button');
const taskInput = document.querySelector('#task');
taskButton.addEventListener('click', () => {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item: taskInput.value }),
  })
    .then((res) => {
      return res.json();
    })
    .then(parsedData => {
      // create list item
      let taskItem = document.createElement('li');
      taskItem.setAttribute('id', `${parsedData['_id']}`);
      taskItem.innerHTML = parsedData['item'];

      // create delete button
      let deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'X';
      taskItem.setAttribute('class', 'remove');
      taskItem.appendChild(deleteButton);

      // add to list
      const taskList = document.querySelector('#task-list');
      taskList.appendChild(taskItem);

      // deleteButton event listener
      deleteButton.addEventListener('click', () => {
        fetch('/tasks', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: parsedData['_id'] }),
        })
          .then(res => taskItem.remove())
          .catch(err => console.log(err));
      });

      // clear input box
      taskInput.value = '';
    })
    .catch((err) => console.log(err));

  taskInput.value = '';
});