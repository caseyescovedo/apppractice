
// ----------------------------------------GET TASKS
function getTasks() {
  fetch('/task')
  .then(response => response.json())
  .then(tasks => {
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = '';
    tasks.forEach(addTaskItem)
  })
  .catch(err => console.log('error getting tasks', err))
}
// run get tasks on page load
getTasks()
// every time get tasks button is clicked, getTasks function runs again
document.getElementById('retrieve').addEventListener('click', getTasks)


// ----------------------------------------ADD TASKS
document.getElementById('task').addEventListener('submit', event => {
  // overwrite default functionality
  event.preventDefault()
  // create variable for html input for tasks
  const taskInput = document.getElementById('task');
  // create variable body as object and store html input as value
  const body = {
    item: taskInput.value,
  }
  // send request to post data from input
  fetch('/task', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(),
  })
  .then(response => response.json())
  .then(task => {
    // clears value so get tasks are not diplayed multiple times
    taskInput.value = '';
    addTaskItem(task)
  })
  .catch(err => console.log('POST ERROR: ', err))
})

// ----------------------------------------ADD INDIVIDUAL TASK ITEM
function addTaskItem(task) {
  // create new variable and set equal to new list item
  const taskItem = document.createElement('li');
  // set inner text of each task
  taskItem.innerText = task.item;
  // assign id to each task for update/delete features
  taskItem.id = task._id;
  // create variable that creates a new button, class = remove, display 'X'
  const button = document.createElement('remove')
  button.innerText ='X';
  // add event listenter that removes the item from the list and delets it from db
  button.addEventListener('click', ()=> {
    // creates fetch request that grabs id of current task and deletes it
    fetch(`/tasks/${task._id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(task => {
      console.log(task)
    })
    .catch(err => console.log('Deletion Error', err))
  })
  // append button to each new task created
  taskItem.appendChild(button)
  // append taskItem on 'task-list'
  document.getElementById('task-list').appendChild(taskList)
}