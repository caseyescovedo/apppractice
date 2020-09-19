window.onload = function () {
  // Select ul component
  const taskList = document.querySelector("#task-list");

  // Helper function for each list item
  function eachTask(task) {
    const listItem = document.createElement("li");
    const listButton = document.createElement("button");
    // console.log(task)
    listItem.innerHTML = `${task.item}`;
    listItem.setAttribute("id", `id${task.id}`)
    listButton.className = "remove";
    listButton.innerText = "X";
    listButton.addEventListener("click", () => {
        fetch(`/tasks/${task.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const deleteTask = document.querySelector(`id${task.id}`);
            deleteTask.parentNode.removeChild(deleteTask);
        })
    })
    listItem.appendChild(listButton);
    return listItem;
  }

  // Get tasks from clicking "Get Tasks" button
  document.getElementById("retrieve").addEventListener("click", () => {
    fetch("/tasks")
      .then((res) => res.json())
      .then((data) => {
        taskList.innerHTML = "";
        // console.log(data);
        // Data is each row in the database
        data.forEach((ele) => {
          // Invoke helper function
          taskList.appendChild(eachTask(ele));
        });
      });
  });

  // Add tasks from clicking "Add Tasks" button
  document.querySelector("#task-button").addEventListener("click", () => {
    const newTask = document.querySelector("#task");
    fetch("/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        item: newTask.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // Data is each row in the database
          taskList.appendChild(eachTask(data));
      });
  });
};