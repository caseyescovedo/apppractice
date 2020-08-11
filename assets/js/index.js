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
          console.log("data", data);

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

            taskList.append(listItem);
            taskList.append(deleteBtn);
          });

          console.log("buttons", document.querySelectorAll(".remove"));
          const deleteButtons = document.querySelectorAll(".remove");

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
                .then(res => res.json())
                .then(data => {
                  console.log("data", data);
                  const string = `li[data-mongoid='${id}']`;
                  const currentLi = document.querySelector(string);
                  console.log(currentLi);
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
    console.log("e.target", e.target);
    const newTask = document.getElementById("task").value;

    // const body = {
    //   item: newTask
    // };

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
        console.log("data", data);
      })
      .catch(err => {
        console.log(err);
      });

    // const taskList = document.getElementById("task-list");
  });

  // const removeBtn = document.getElementsByClassName("remove");
  // removeBtn.addEventListener("click", e => {
  //   console.log("clicked a remove button");
  //   console.log(e.target);
  // });
};