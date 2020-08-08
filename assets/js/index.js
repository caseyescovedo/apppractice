/****I have posted Cookies and not enough time left to do the other part of the challenges as i had spent so much time on delete feature and which i think is just one line need to be fixed


***please comment out my delete feature function and the rest will work****


*/

// assigning lasIndex so , it will remember the last message on board and will not display the same message again.
let lastIndex = 0;
function addTasks(tasks) {
  tasks = tasks.reverse();

  //   console.log(lastIndex);

  for (let i = lastIndex; i < tasks.length; i++) {
    const tasklists = document.createElement("li");
    const board = document.getElementById("task-list");
    // console.log("board", board);
    tasklists.innerText = tasks[i].task;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.setAttribute("class", "remove");
    deleteButton.setAttribute("id", tasks[i].id);
    // console.log(deleteButton);
    tasklists.appendChild(deleteButton);
    board.appendChild(tasklists);
  }
  lastIndex = tasks.length;
}
function createTasks(tasks) {
  fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tasks),
  })
    .then((response) => response.json())
    .then((newTasks) => addTasks(newTasks))
    .catch((err) => console.log(err, "Error in create Tasks"));
}

function displayTasks() {
  fetch("/tasks")
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      addTasks(data);
    });
}

function deleteFeature() {
  /***Why this following line of code is not working while it worked in addTasks function*/ ////////
  const board = document.getElementById("task-list");

  console.log(board, "board");
  const deleteButton = board.querySelectorAll("button");
  console.log(deleteButton);
  deleteButton.forEach((btn) =>
    btn.addEventListener("click", function deleteTask(event) {
      console.log("deleteButton is clicked");
      fetch(`/tasks/${event.target.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "applicaiton/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    })
  );
}

deleteFeature();
window.onload = () => {
  const retreive = document.getElementById("retrieve");

  retreive.addEventListener("click", function (event) {
    displayTasks();
    event.preventDefault();
  });

  const addButton = document.getElementById("task-button");
  addButton.addEventListener("click", function (event) {
    const task = document.getElementById("task").value;
    document.getElementById("task").value = "";
    console.log({ task });
    createTasks({ task });
    event.preventDefault();
  });
  // setInterval(displayTasks, 3000);
};
