//helper function to create dom element from string
const domNode = (text) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = text;
  return wrapper.firstElementChild;
};

//render a single task or an array of tasks. skips any tasks which are already displayed.
const renderTasks = (tasks) => {
  const target = document.getElementById('task-list'); //container where the tasks will be rendered.

  for (let task of Array.isArray(tasks) ? tasks : [tasks]) { //will work on an array of tasks or a single task
    if (!target.querySelector(`#task${task.id}`)) { //check if the task is already displayed
      //if not, render the task
      const el = domNode(`
        <li id='task${task.id}'>
          <span>${task.item}</span>
          <button class='remove' onclick='removeTask(${task.id})'>X</button>
        </li>
      `);
      target.appendChild(el);
    }
  }
};

//handles form submit, validating user input and posting a request to the server. 
//renders the newly created task or an error message.
const addTask = async () => {
  const { value } = document.getElementById('task'); //get the task value from the input

  const message = document.querySelector('#create > .message'); //get the div where error messages will be displayed

  //field validation
  if (!value) {
    return message.innerText = "You must enter a value.";
  }

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item: value })
    };
    const data = await fetch('/api/task', options)
      .then(response => response.json());

    message.innerText = "";
    renderTasks(data);
  } catch (err) {
    message.innerText = 'An error occurred.'
  }
}

//get all tasks from the server and render them
const getTasks = async () => {
  const message = document.querySelector('#create > .message'); //get the div where error messages will be displayed

  try {
    const data = await fetch('/api/task')
      .then(response => response.json());

    message.innerText = "";
    renderTasks(data);
  } catch (err) {
    message.innerText = 'An error occurred.'
  }
}

//remove a task by ID.
const removeTask = async (id) => {
  const message = document.querySelector('#create > .message'); //get the div where error messages will be displayed

  try {
    await fetch(`/api/task/${id}`, { method: 'DELETE' });

    message.innerText = "";
    document.getElementById(`task${id}`).remove();
  } catch (err) {
    message.innerText = 'An error occurred.'
  }
}