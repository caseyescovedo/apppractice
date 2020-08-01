// ! Get all the elements after getTasks is hit
const getTasks = () => {
  fetch('/tasks') // make fetch request to get all tasks in the database
  .then((res) => res.json())
  .then((data) => {
    const listOfTasks = document.getElementById('task-list') // reset the list of Tasks
    listOfTasks.innerHTML = '' // resets innerHTML to empty string so each get request will not keep appending all in database
    for (let i = 0; i < data.length; i++){ // create a new element for each item in data
      // Adding the to the element
      const newTask = document.createElement('li')
      newTask.innerText = data[i].item;
      // Creating the button
      const button = document.createElement('button')
      button.innerText = 'X'
      // adding X button functionality on click will delete from the database and remove from the list immediately
      button.addEventListener('click', () => {
        fetch(`/tasks/${data[i]._id}`, {
          method: 'Delete'
        })
        .then((resp) => resp.json())
        .then(data => {
          document.getElementById('task-list').removeChild(newTask)
        })
        .catch((err) => console.log(err))
      })
      newTask.appendChild(button)
      listOfTasks.appendChild(newTask)
    }
  })
}

// ! Configuring the get Tasks button -- on click will execute get tasks
document.getElementById("retrieve").addEventListener('click', getTasks)



// ! Configuring the addTask button to call addTask and add to the list
document.getElementById('task-button').addEventListener('click', () => {
  const newTaskText = document.getElementById('task');
  console.log(newTaskText.value)
  const taskObject = {
    item: newTaskText.value
  }
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    },
    body: JSON.stringify(taskObject)
  })
})




