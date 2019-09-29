window.onload = function() {
  const addButton = document.getElementById("task-button");
  const retrieveButton = document.getElementById("retrieve");
  const taskList = document.getElementById("task-list");
  let darkenTaskListColor = true; 

  // function to add tasks as li elements and delete buttons
  function addNewTask({ id, item }) {
    const myTask = document.createElement("li");
    if(darkenTaskListColor) {
      myTask.style.backgroundColor = "cadetblue";
    } else {
      myTask.style.backgroundColor = "aliceblue";
    }
    darkenTaskListColor = !darkenTaskListColor;
    myTask.innerText = item;
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button")
    deleteButton.innerText = 'X';
    deleteButton.addEventListener("click", () => {
      fetch('/task', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
        .then(() => {
          myTask.remove();
        })
        .catch(e => console.error('Unsuccessful delete', e))
    })
    myTask.appendChild(deleteButton);
    taskList.appendChild(myTask);
  }

  // "add task" logic
  addButton.addEventListener("click", () => {
    const task = document.getElementById("task").value;
    if(task == '') {  // validate if there is input
      return;
    } 
    fetch('/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task })
    })
      .then(res => res.json())
      .then(row => {
        addNewTask(row[0]);
      })
      .catch(e => console.error('unable to post task', e))
  })

  // "retrieve task" logic
  let wereTasksRetrieved = false;
  retrieveButton.addEventListener("click", () => {
    if(!wereTasksRetrieved) {
      fetch('/tasks')
        .then(res => res.json())
        .then(rows => {
          wereTasksRetrieved = true;
          for (let obj of rows) {
            addNewTask(obj);
          }
        })
        .catch(e => console.error(`Error retrieving tasks ${e}`))
    }
  })
}