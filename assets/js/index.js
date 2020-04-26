document.addEventListener('DOMContentLoaded', (event) => {
  const taskList = document.getElementById('task-list');
  const addTaskBtn = document.getElementById('task-button')
  const getTasksBtn = document.getElementById('retrieve');
  const taskInput = document.getElementById('task');
  
  function addTaskToDom(task) {
    //list item
    const taskItem = document.createElement('li');
    taskItem.innerText = task.item;
    taskItem.id = task.id;

    //delete btn
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.className = 'remove';
    deleteBtn.addEventListener('click', ()=> {
      fetch(`/tasks/${taskItem.id}`, {
        method: 'DELETE'
      })
      .then(()=> taskList.removeChild(taskItem))
      .catch(err => console.log(`/tasks/${taskItem.id} delete Error: ${err}`))
    })
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
  }
  
  function getTasks() {
    fetch('/tasks')
    .then(resp => resp.json())
    .then(tasks => {
      //handle multiple clicks of the button to get tasks 
      taskList.innerText = '';
      tasks.forEach(addTaskToDom);
    })
    .catch(err=> console.log(`/tasks get Error: ${err}`))
  }

  getTasksBtn.addEventListener('click', ()=> {
    getTasks();
  })
  
  addTaskBtn.addEventListener('click', ()=> {
    const body = {task: taskInput.value}
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(resp => resp.json())
    .then(task => {
      //clear the input box
      taskInput.value = '';
      //appending new task to dom
      addTaskToDom(task)
    })
    .catch(err => console.log(`/tasks post Error: ${err}`))
  })
})

