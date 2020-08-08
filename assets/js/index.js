// function displayTasks(tasks) {
//   //   //   tasks = tasks.reverse();
//   //   console.log(tasks[0]);
//   console.log(tasks.length);
//   let firstIndex = 0;
//   for (let i = firstIndex; i < tasks.length; i++) {
//     output.push(tasks[i]);
//   }
//   firstIndex = tasks.length;
//   //    setTimeout(displayTasks(), 2000);

//   return output;
// }
// setInterval(function () {
//   displayTasks(mockTasks);
// }, 1000);

// const mockTasks = [
//   1,
//   2,
//   3,
//   4,
//   5,

//   //   { id: 1, task: "test1" },
//   //   { id: 2, task: "test2" },
//   //   { id: 4, task: "test4" },
//   //   { id: 3, task: "test3" },
// ];
// const output = [];
// console.log(output);

/******************************************************************************************************************************* */
function addTasks(tasks) {
  //   tasks = tasks.reverse();

  for (let i = 0; i < tasks.length; i++) {
    const tasklists = document.createElement("li");
    const board = document.getElementById("task-list");
    tasklists.innerText = tasks[i].task;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    // const att = document.createAttribute("id");
    // att.value = tasks[i].id;
    deleteButton.setAttribute("class", "remove");
    deleteButton.setAttribute("id", tasks[i].id);
    console.log(deleteButton);
    tasklists.appendChild(deleteButton);
    board.appendChild(tasklists);
  }
}

function displayTasks() {
  fetch("/tasks")
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      addTasks(data);
    });
}

window.onload = () => {
  displayTasks();
};
