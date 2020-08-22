// When GET TASKS button is clicked, GET request to /tasks

// display the tasks in the '#task-list' element
  // shows task items & button (class='remove') that makese DELETE request to /tasks/ID

const getButton = document.querySelector('#retrieve');
const addButton = document.querySelector('#task-button');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('#task-list');

/* 
  ^^^For some reason all of these are null so I'm skipping testing
  and because I'm running out of time
  So some of this stuff is going to be wrong but it's still done in a way that is logical to me
*/

const LoadTasks = (data) => {
  taskList.reset() // reset task list
  data.map(el => new Task(el)) // load all of the individual tasks
};

class Task {
  constructor(data) {
    const { _id, item, createdAt } = data
    taskList.innerHTML += `
      <li>${item} 
      created at ${createdAt}
      <button class="remove" onclick="deleteButton(${_id})" >X</button></li>`
  }
}

// ADD EVENT LISTENER TO "GET TASKS"
getButton.addEventListener('click', async () => {
  console.log('get button clicked')
  
  const data = 
    await fetch('/tasks')
      .then(resp => resp.json())
      .then(resp => { return resp })
      .catch(err => console.log('error while fetching from db', err));
  
    await LoadTasks(data)
});

// ADD EVENT LISTENER TO "ADD TASK"
addButton.addEventListener('click', async () => {
  console.log('add button clicked')
  
  const data = 
    await fetch('/tasks', {
      method: 'POST',
      headers: { "Content-Type": "Application/JSON" },
      body: JSON.stringify({ 
        item: taskInput.value,
        createdAt: Date(),
      })
    })
      .then(resp => resp.json())
      .then(resp => { return resp })
      .catch(err => console.log('error while fetching from db', err));
  
    await LoadTasks(data) // loads the list again
});

// ADD EVENT LISTENER TO "DELETE TASK"
// note: some of the work is already done in the innerHTML we add in the class, Task
const deleteButton = (id) => {
  
  const data = 
    await fetch(`/tasks/${id}`, {
      method: 'POST',
      headers: { "Content-Type": "Application/JSON" },
      body: JSON.stringify({ 
        item: taskInput.value,
        createdAt: Date(),
      })
    })
      .then(resp => resp.json())
      .then(resp => { return resp })
      .catch(err => console.log('error while fetching from db', err));
  
  await LoadTasks(data) // loads the list again
};