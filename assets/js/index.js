window.addEventListener("load", () => {
  let tasks = [];

  //get all tasks
  function getTasks() {
    fetch("/getTasks", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(result => result.json())
      .then(result => {
        result.forEach(task => {
          tasks.push(task.item);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTasks();
  console.log("tasks array = ", tasks);

  let allTasks = document.querySelector("#task-list");

  const populateTasks = () => {
    console.log("in populateTasks");
    allTasks.innerHTML = "";
    getTasks();
    for (let i = 0; i < tasks.length; i++) {
      console.log("current task to add is:", tasks[i]);
      let newTask = document.createElement("li");
      const deleteButton = document.createElement("button");
      newTask.id = tasks[i]._id;
      newTask.innerHTML = tasks[i];
      deleteButton.className = "deleteButton";
      deleteButton.innerText = "X";
      deleteButton.addEventListener("click", () => {
        fetch("/deleteTask/:id", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "DELETE",
          body: JSON.stringify({ item: tasks[i], id: newTask.id })
        });
      });
      allTasks.appendChild(newTask);
      newTask.appendChild(deleteButton);
    }
  };

  let getButton = document.querySelector("#retrieve");

  getButton.addEventListener("click", () => {
    while (allTasks.firstChild) {
      allTasks.removeChild(allTasks.firstChild);
    }
    populateTasks();
  });

  let taskInput = document.querySelector("#task");
  let addButton = document.querySelector("#task-button");

  const addNewTask = val => {
    let newToAdd = { item: val };
    console.log(newToAdd);
    console.log(`before post Task`);
    fetch("/postTask", {
      method: "POST",
      body: JSON.stringify(newToAdd),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(task => {
        console.log(`Added task to Mongo: ${newToAdd}`);
      })
      .then(task => {
        populateTasks();
      });
  };

  addButton.addEventListener("click", () => {
    console.log(`inside add task`);
    console.log(taskInput.value);
    addNewTask(taskInput.value);
  });
});
