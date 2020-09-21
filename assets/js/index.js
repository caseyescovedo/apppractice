//this is my helper function for the get all tasks button / get all tasks request 
const getHelper = (arrayOfTasks) => {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    const checkIfExists = document.getElementById(`${arrayOfTasks[i]._id}`)
    if (checkIfExists === null) {
      const task = document.createElement("LI")
      task.setAttribute('class', 'task')
      const text = document.createTextNode(`${arrayOfTasks[i].item}`);
      task.appendChild(text);
      task.setAttribute('id', arrayOfTasks[i]._id)
      document.getElementById("task-list").appendChild(task);
      const remove = document.createElement("button")
      remove.setAttribute('class', 'remove');
      remove.setAttribute('id', `${arrayOfTasks[i]._id}`)
      remove.innerText = "x"
      task.appendChild(remove); 
      remove.addEventListener('click', deleteHelper);
    }
  }
}

//GET - the retrieve button
const retrieve = document.getElementById('retrieve');
retrieve.addEventListener('click', () => {
  fetch('/testDB')
    .then(res => res.json())
    .then(response => {
      getHelper(response)
    })
    .catch(err => console.log(err))
})

//POST - adding a task button 
const input = document.getElementById('task'); 
const addTaskButton = document.getElementById('task-button');
addTaskButton.addEventListener('click', () => {
  console.log(input.value);
  const postHeader = {
    method: "POST", 
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      item: `${input.value}`
    })
  }
  fetch('/testDB', postHeader)
    .then(res => console.log(res))
    .catch(err => console.log(err))
})

//DELETE - helper function for delete 
const deleteHelper = (e) => {
  const targetButton  = document.getElementById(e.target.id)
  targetButton.remove();
  const deleteObj = {
    method: "DELETE", 
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      _id: `${e.target.id}`
    })
  }
  fetch('/testDB', deleteObj)
    .then(res => res.text())
    .then(response => console.log(response))
    .catch(err => console.log(err))
}