window.onload = () => {
  // access the task list item in index.html
  const taskList = document.getElementById('task-list');


  /* 
  "get tasks" button functionality 
  */

  // access the get button
  const getButton = document.getElementById('retrieve');

  // boolean to indicate whether tasks have already been displayed
  let tasksDisplayed = false;

  // helper function that creates list items for each task
  function populateTasks() {
    // do this only if tasksDisplayed is false
    if (!tasksDisplayed) {
      // get tasks from database

      // sample tasks data
      const sample = [{_id: 1, item: 'one swag', created_at: '00:00:00'}, 
      {_id: 2, item: 'two swag', created_at: '00:01:00'}, 
      {_id: 3, item: 'three swag', created_at: '00:02:00'},
      ];

      // make and append each task to taskList
      // format of each line item: 
      // <li>Go shopping <button class="remove">X</button></li>
      sample.forEach((task) => {
        // create the line item for the task
        const li = document.createElement('li');
        li.innerHTML = task.item;

        // add id to each line item
        li.setAttribute('id', task._id);
        
        // create a button and append it to the li
        const button = document.createElement('button');
        button.innerHTML = 'X';
        button.classList.add('remove');
        li.appendChild(button);

        // append li to taskList
        taskList.appendChild(li);
      });
    }
    
    // set tasksDisplayed equal to true
    tasksDisplayed = true;
  }

  // add event listener on button
  getButton.addEventListener("click", populateTasks);


  /* 
  "add task" button functionality 
  */

  // get task info from input field
  const taskField = document.getElementById('task');

  // access the get button
  const addButton = document.getElementById('task-button');

  // create helper function to create new task and append it to list
  function addTask() {
    // add item to database

    // remember to add id to each task
    
    // create the line item for the task
    const li = document.createElement('li');
    li.innerHTML = taskField.value;
    
    // create a button and append it to the li
    const button = document.createElement('button');
    button.innerHTML = 'X';
    button.classList.add('remove');
    li.appendChild(button);

    // append li to taskList
    taskList.appendChild(li);

    taskField.value = '';
  }

  // add event listener on button
  addButton.addEventListener("click", addTask);
  

  /*
  delete task functionality
  */




}

