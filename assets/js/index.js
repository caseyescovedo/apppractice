
document.addEventListener('DOMContentLoaded', () => {

  const getTasks = document.querySelector('#retrieve');
  getTasks.addEventListener('click', retrieve);

  const addBtn = document.querySelector('#task-button');
  addBtn.addEventListener('click', addTask);

  const taskList = document.querySelector('#task-list');
  taskList.addEventListener('click', remove);

});


// === retrieves all tasks from database === //
async function retrieve() {
  try{

    const data = await fetch('/retrieve'); // fetch all the tasks in the database
    const tasks = await data.json();
    
    clearTasks(); // clears tasks before called, so no duplicates are shown
    createList(tasks); // create task lis and append them to the DOM

  } catch (error) {
    console.log('problem in front end fetch retrieve ', error)
  }
}

// === adds task to DOM and to database === //
async function addTask() {
  const item = document.querySelector('#task').value;

  // === Immediately append to the DOM === //
  createList([{ item }]);

  const response = await fetch(`/add/${item}`)
  const data = await response.json();
  console.log('front end response from adding task ', data)

  document.querySelector('#task').value = '';

// === Ashamed that I couldn't get this post to work... === //
  // try {
  //   const data = await fetch('/add', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(item)
  //   })
  //   const response = await data.json();

  //   console.log('front end response from post ', response);

  // } catch (error) {
  //   console.log('problem in front end fetch addTask ', error)
  // }
}

// === removes tasks from DOM and from db === //
async function remove(e) {
  if (e.target.className = 'remove') {
    const button = e.target;
    const task = button.parentElement.textContent.slice(0, -1);
    button.parentElement.remove();

    try {
      const response = await fetch(`/remove/${task}`, {
        method: 'DELETE',
      })
      const data = response.json();

      console.log('got this front end from deleting task ', data)
    } catch (error) {
      console.log(error);
    }
  }
}

// == create a list of tasks and append them to the DOM == //
function createList(tasks) {
  const listParent = document.querySelector('#task-list')
  tasks.forEach(task => {
    listParent.append(createTask(task));
  })
}

// == create an li and button for each task == //
function createTask(task) {
  const li = document.createElement('li');

  const button = document.createElement('button')
  button.className = 'remove';
  button.textContent = 'X';

  li.textContent = task.item;
  li.append(button);
  console.log(li);
  return li;
}

// === clears tasks so that there aren't multiples === //
function clearTasks() {
  const list = document.querySelector('#task-list');

  list.innerHTML = '';
}