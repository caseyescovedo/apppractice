const getAllTasks = async () => {
  // will get all tasks and do a GET request to the /task route
  const tasks = await fetch("/task");
  const data = await tasks.json();
  // console.log(data);
  // only will run addTasks if there is task data
  if (data.length > 0) addTasks(data);
};

const addTasks = (tasks) => {
  const taskList = document.getElementById("task-list");
  for (let task of tasks) {
    // make a new task LI
    // not sure if closure would be better here, but will have the dom check
    // every time to make sure that tasks of the same ID are not re-rendered
    if (!document.getElementById(task.id)) {
      const newTask = document.createElement("LI");
      newTask.id = task.id;

      // make a header

      const t = document.createTextNode(task.item);
      newTask.appendChild(t);

      // make a button with X in it
      const deleteButton = document.createElement("button");
      // adding deleteTask to run on click
      deleteButton.onclick = deleteTask;
      const buttonT = document.createTextNode("X");
      deleteButton.appendChild(buttonT);
      deleteButton.classList.add("remove");

      newTask.appendChild(deleteButton);

      taskList.appendChild(newTask);
    }
  }
};

//post request to make a new task

const newTask = async () => {
  const task = document.getElementById("task");
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item: task.value }),
  };
  try {
    const fetchResponse = await fetch(`/task`, settings);
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

const deleteTask = async (e) => {
  // first immediately remove from the DOM
  document.getElementById(e.target.parentNode.id).remove();
  // then do a delete request
  const settings = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    // backend route requires a param
    const fetchResponse = await fetch(
      `/task/${e.target.parentNode.id}`,
      settings
    );
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
};
