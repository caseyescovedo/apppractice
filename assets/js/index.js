//function for deleting a task from the database
const deleteTask = (id) => {
  //isolate the id from the task item
  const deleteId = id.id;
  //use the DELETE fetch request to remove the given id from the database
  fetch(`/secret/tasks/${deleteId}`, {
    method: "DELETE",
  })
    //remove the task item from the list
    .then(() => {
      document.getElementById("task-list").removeChild(id);
    })
    .catch((err) => console.log("Unable to delete task item from list"));
};

//function to create task item
const createNewTask = (task) => {
  //create variables for list tag and list item tag for easier reference
  const list = document.getElementById("task-list");
  const newTask = document.createElement("li");
  //add task text to the new task
  newTask.innerText = task.item;
  //assign the task an id; needed for deleting
  newTask.id = task._id;
  //create a button on the task for deleting
  const button = document.createElement("button");
  //add remove class to the delete button
  button.id = "remove";
  //add display text to the delete button
  button.innerText = "X";
  //add event listener for delete button
  //invokes delete task function and passes in newTask item as argument
  button.addEventListener("click", () => {
    deleteTask(newTask);
  });
  //make the button a child of the list item
  newTask.appendChild(button);
  //make the list item a child of the list
  list.appendChild(newTask);
};

//function for getting tasks from database
const getTasks = () => {
  //use GET request to retrieve all tasks from database
  fetch("/secret/tasks")
    //convert returned response to json
    .then((resp) => resp.json())
    //add task items to page with create new Task function
    .then((tasks) => {
      tasks.forEach((task) => {
        createNewTask(task);
      });
    })
    .catch((err) => console.log("Unable to retrieve task items from list"));
};

//add event listner for get task button
document.getElementById("retrieve").addEventListener("click", () => {
  //clear list html to avoid repeating data with multiple get clicks
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  //invoke get task function
  getTasks();
});

//function for adding a task item to the database
const addTask = () => {
  //grab input from task input box
  const item = document.getElementById("task");
  //create the request body object for use in POST request
  const bodyObj = {
    item: item.value,
    created_at: Date.now(),
  };
  //send POST request with appropriate properties
  fetch("/secret/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  })
    //convert response to json
    .then((resp) => resp.json())
    //pass response to createNewTask function to add to page
    //and reset task input box to empty string
    .then((task) => {
      createNewTask(task);
    })
    .catch((err) => console.log("Unable to add task item to list"));
};

//add event listener for add task button
document.getElementById("task-button").addEventListener("click", () => {
  //invoke add task function
  addTask();
  //reset task input box to empty
  const taskBox = document.getElementById("task");
  taskBox.value = "";
});
