console.log('index.js is being served')

const taskList = document.querySelector('#task-list')
console.log(taskList)

const getTasks = () => {
  fetch('/tasks')
  .then(resp => resp.json())
  .then(data => {
    // console.log(data)
    data.forEach(createTasks)
  })
}

const createTasks = (task) => {
  const taskItem = document.createElement('li');
  const deleteButton = document.createElement('button')
  taskItem.id = task.id;
  taskItem.innerText = task.item;
  //DELETE BUTTON AND LOGIC
  deleteButton.className = 'remove';
  deleteButton.innerText = 'X';
  deleteButton.addEventListener('click', () => {
    fetch('/tasks', {
      method: 'DELETE',
      body: JSON.stringify({'id':taskItem.id}),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(resp => resp.json())
    .then(data => {
      //logic for removing an element
      taskList.removeChild(taskItem)
    })
    .catch(err => console.log(err))
  })
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem)
}

//Handlung input
document.getElementById('task-button').addEventListener('click', () => {
  const item = document.getElementById('task').value;
  fetch('/tasks', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({item})
  })
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    // getTasks()
  })
  .catch(err => console.log(err))
})


  getTasks()

