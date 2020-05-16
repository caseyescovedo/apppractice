document.addEventListener("DOMContentLoaded", () => {
  console.log("page loaded");

  // HELPER FUNCTIONS
  // Create a new list item and add to task-list
  const addListItemToDom = (taskList, itemValue, itemID) => {

    const listItem = document.createElement("LI");
    listItem.innerHTML = itemValue;
    listItem.setAttribute("id", "task" + itemID);

    // Create a button
    const button = document.createElement("BUTTON");
    button.innerHTML = "X";
    button.setAttribute("class", "remove");
    button.setAttribute("taskid", itemID);
    
    // Add functionality to delete items
    button.addEventListener("click", (event) => {
      const url = "/tasks/" + event.target.attributes.taskid.value;
      fetch(url, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 200) {
            document.getElementById("task" + itemID).remove();
          } else {
            throw Error("Error deleting task item, try again");
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    });

    // Append the button to the list item
    listItem.appendChild(button);
    // Append the listitem to the tasklist
    taskList.appendChild(listItem);
  };

  // Receive array of tasks and add to DOM
  const updateTaskList = (arrayOfTasks) => {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    arrayOfTasks.forEach((task) => {
      addListItemToDom(taskList, task.item, task.id);
    });
  };

  // Fetch all tasks and update DOM
  const getAllTasks = () => {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => updateTaskList(data.tasks))
      .catch((error) => alert("Error getting tasks" + error));
  }

  // Add a eventlistener to add tasks to the DB
  let taskButton = document.getElementById('task-button');
  taskButton.addEventListener('click', () => {
    let newTask = document.getElementById('task');
    fetch('/tasks/new', {
      method: 'POST',
      body: JSON.stringify({item: newTask.value}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.status === 200){
          getAllTasks()
          newTask.value = '';
        } else {
          throw Error('Error creating task')
        }
      })
      .catch(error => alert(error));

  })

  // Add eventlistener to Get Tasks button
  document.getElementById("retrieve").addEventListener("click", () => {
    getAllTasks()
  });

});
