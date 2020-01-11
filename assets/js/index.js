window.onload = function() {
  const taskList = document.getElementById('task-list');  
  const getTasksBtn = document.getElementById('retrieve');
  const addTaskBtn = document.getElementById('task-button');
  const input = document.getElementById("task");

  getTasksBtn.addEventListener('click', e => {
    if (taskList.childNodes.length === 0) {
      fetch('/todo')
      .then(res => res.json())
      .then(tasks => {
        console.log('tasks got from /todo: ', tasks); // this prints out all the tasks in an array: [{  id: 1, item: "do laundry", created_at: "2020-01-12T06:39:40.232Z" }, {...}, {...}]
        for (let task of tasks) {
          addTaskToListOnDOM(task.item, task.id);
        }
      })
      .catch(err => console.log(`Error from getTasksBtn: `, err));
    }
  });

  addTaskBtn.addEventListener('click', e => {
    const taskPosted = input.value;
    console.log('user typed a new task in the input field: ', taskPosted);
    fetch('/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item: taskPosted })
    })
    .then(res => res.json())
    .then(task => {
      console.log('task added to the database: ', task);
      addTaskToListOnDOM(taskPosted);
    })
    .catch(err => console.log(`Error from addTaskBtn: `, err));
  });

  const addTaskToListOnDOM = (task, id) => {
    const listElement = document.createElement('li');
    console.log('task from addTaskToListOnDOM: ', task);
    // create the textNode that would have the todo string in it
    const textNode = document.createTextNode(task);
    listElement.appendChild(textNode);
    taskList.appendChild(listElement);
  
    // create the delete button that would appear on the right of the todo item and give it an id that matches the json task id
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'remove';
    deleteBtn.id = id;
    listElement.appendChild(deleteBtn);
  }
}

// documentation used:
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://stackoverflow.com/questions/2632137/why-is-document-getelementbyid-returning-null
