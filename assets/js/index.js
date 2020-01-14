// document.addEventListener('DOMContentLoaded', ready);
// wrap all DOM manipulation in ready function if adding defer to secret html is not allowed

// placing reference for manipulating the DOM
{
  /* <div id="create">
    <input id="task" placeholder="enter new task" type="text"></input>
    <button id="task-button">Add Task</button>
    <button id="retrieve">Get Tasks</button>
  </div>
  <ul id="task-list"></ul> */
}

// example of li for task-list:
// <li>Go shopping <button class="remove">X</button></li>

// taskItem.textContent = 'Hello World';
// taskDiv.appendChild(taskItem);

const btnGetTasks = document.getElementById('retrieve');
const btnAddTask = document.getElementById('task-button');
btnGetTasks.addEventListener('click', getTasks);
btnAddTask.addEventListener('click', addTask);

// clears contents of tasklist before getting tasks again
function clear() {
  const tasks = document.getElementById('task-list');
  while (tasks.firstChild) tasks.removeChild(tasks.firstChild);
}

// getTasks function
async function getTasks() {
  clear();
  const taskList = document.getElementById('task-list');
  const response = await fetch('/secret/tasks');
  const result = await response.json();
  console.log(result);
  result.forEach(i => {
    console.log(i);
    const taskItem = document.createElement('li');
    taskList.appendChild(taskItem);
    taskItem.textContent = i.item;
    const removeTask = document.createElement('button');
    taskItem.appendChild(removeTask);
    removeTask.id = i._id;
    removeTask.class = 'remove';
    removeTask.textContent = `X`;
    removeTask.addEventListener('click', async () => {
      const response2 = await fetch(`/secret?id=${removeTask.id}`, { method: 'DELETE' });
      const result2 = await response2.json();
      console.log('deleted', removeTask.id);
      getTasks();
    });
  });
}

async function addTask() {
  const inputTask = document.getElementById('task');
  const payload = {
    item: inputTask.value
  };
  console.log(payload);
  await fetch('/secret', {
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(payload),
    method: 'POST'
  });
  console.log('addedTask', inputTask.value.toString());
}
