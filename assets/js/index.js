console.log("Hello World!!");

window.onload = () => {
  const getTasksBtn = document.getElementById("retrieve");
  const addTaskBtn = document.getElementById("task-button");

  //Event Listeners
  //getTasks
  getTasksBtn.addEventListener("click", async () => {
    console.log("get tasks clicked");
    const taskList = document.getElementById("task-list");

    if (taskList.childElementCount === 0) {
      //fetch tasks
      const url = "/getTasks";
      const tasks = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          // loop thru tasks and print to DOM
          data.forEach(el => {
            // create list element
            const listItem = document.createElement("li");

            // create item
            const item = el.item;
            const item_id = el._id;
            listItem.innerText = item;
            listItem.setAttribute("data-_id", item_id);

            // create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "X";
            deleteBtn.className = "remove";
            deleteBtn.setAttribute("data-mongoId", item_id);

            // add button to list item and item item to task list
            listItem.append(deleteBtn);
            taskList.append(listItem);
          });

          const deleteButtons = document.querySelectorAll(".remove");

          // Create Delete Button event lisenters for each button/list item
          deleteButtons.forEach(btn => {
            btn.addEventListener("click", event => {
              //handle click
              console.log("clicked delete");
              const id = event.target.getAttribute("data-mongoid");

              const url = "/deleteTask";
              fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
              })
                .then(data => {
                  //find list item to remove and remove it
                  const string = `[data-_id='${id}']`;
                  const currentLi = document.querySelector(string);
                  currentLi.remove();
                })
                .catch(err => {
                  console.log(err);
                });
            });
          });
        })

        //error
        .catch(err => {
          console.log(err);
        });
    }
  });

  //Add a Task
  addTaskBtn.addEventListener("click", e => {
    console.log("addTasks clicked");
    const newTask = document.getElementById("task").value;

    const url = "/postTask";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ item: newTask })
    })
      .then(res => res.json())
      .then(data => {
        // nothing for now
      })
      .catch(err => {
        console.log(err);
      });
  });
};
