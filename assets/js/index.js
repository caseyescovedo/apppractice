
// Getting all of the tasks

const getBtn = document.getElementById('retrieve');

getBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  let tasksList;

  await fetch('/retrieve')
          .then(res => res.json())
          .then(res => {
          tasksList = res;
          })
          .catch(err => console.log('Error with fetch request: ', err));
  
  tasksList && createTaskList(tasksList);
}, {once: true})


// Sending a new task to the database

const taskBtn = document.querySelector('#task-button');
const newTask = document.getElementById('task');
let newTaskInput;

newTask.addEventListener('input', (e) => {
  newTaskInput = e.target.value;
})

taskBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  newTask.value = '';

  await fetch(`/create?newtask=${newTaskInput}`, {
            method: 'POST',
          })
          .then(res => res.json())
          .then(res => {
            console.log('THIS IS THE CLIENT: ', res)
          })
          .catch(err => console.log('Error with fetch request: ', err));

  let tasksList;

  await fetch('/retrieve')
          .then(res => res.json())
          .then(res => {
          tasksList = res;
          })
          .catch(err => console.log('Error with fetch request: ', err));
  
  tasksList && createTaskList(tasksList);
})


// Helper function to parse tasks into list items on the DOM

function createTaskList(input) {
  
  const taskContainer = document.querySelector('#task-list');
  taskContainer.innerHTML = '';
  
  input.forEach(taskObj => {
    const newListItem = document.createElement('li');
    newListItem.id = taskObj.id;
    newListItem.innerHTML = taskObj.item;
    
    const newBtn = document.createElement('button');
    newBtn.innerHTML = 'X';
    newBtn.className = 'remove';
    
    newBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      newListItem.remove();

      await fetch(`/delete?itemid=${newListItem.id}`, {
                method: 'DELETE',
              })
              .then(res => res.json())
              .then(res => console.log(res))
              .catch(err => console.log('Error with fetch request: ', err));

      let tasksList;

      await fetch('/retrieve')
              .then(res => res.json())
              .then(res => {
              tasksList = res;
              })
              .catch(err => console.log('Error with fetch request: ', err));
      
      tasksList && createTaskList(tasksList);
    })

    newListItem.appendChild(newBtn);
    taskContainer.appendChild(newListItem);
  })
}