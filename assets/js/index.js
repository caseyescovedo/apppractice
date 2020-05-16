document.addEventListener("DOMContentLoaded", () => {
  console.log("page loaded");

  // Add a task to the DB
  let taskButton = document.getElementById('task-button');
  taskButton.addEventListener('click', () => {
    let newTask = document.getElementById('task');
    console.log("NEWTASK TEXT", newTask.value)
    fetch('/tasks/new', {
      method: 'POST',
      body: JSON.stringify({item: newTask.value}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.status === 200){
          fetch("/tasks")
            .then((response) => response.json())
            .then((data) => updateTaskList(data.tasks))
            .catch((error) => alert("Error getting tasks" + error));
          newTask.value = '';
        } else {
          throw Error('Error creating task')
        }
      })
      .catch(error => alert(error));

  })

  // Create function to recieve array of tasks and add to DOM
  const updateTaskList = (arrayOfTasks) => {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    arrayOfTasks.forEach((task) => {
      // Create the item
      let listItem = document.createElement("LI");
      listItem.innerHTML = task.item;
      listItem.setAttribute("id", "task" + task.id);

      // Create a button
      let button = document.createElement("BUTTON");
      button.innerHTML = "X";
      button.setAttribute("class", "remove");
      button.setAttribute("taskid", task.id);
      
      // Add functionality to delete items
      button.addEventListener("click", (event) => {
        const url = "/tasks/" + event.target.attributes.taskid.value;
        console.log(url);
        fetch(url, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.status === 200) {
              document.getElementById("task" + task.id).remove();
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
    });
  };

  // grab get tasks button
  document.getElementById("retrieve").addEventListener("click", () => {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => updateTaskList(data.tasks))
      .catch((error) => alert("Error getting tasks" + error));
  });

});
