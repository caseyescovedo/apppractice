const deleteTask = (id) => {
  fetch(`/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task,
    }),
  })
    .then((data) => data.json())
    .then((deleted) => {
      loadTasks();
    })
    .catch((err) => {
      console.log(`Error when deleting tasks from databse: Err: ${err}`);
    });
};

const loadTasks = () => {
  fetch("/tasks", {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .then((parsed) => {
      const taskList = document.getElementById("taks-list");

      if (taskList.innerHTML !== "") {
        taskList.innerHTML = "";
      }

      parsed.forEach((savedTask) => {
        const li = document.createElement("li");

        li.innerText = savedTask.task;

        const dltBtn = docment.createElement("button");
        dltBtn.innerText = "X";
        dltBtn.classList.add("del");
        dltBtn.addEventListener("click", () => {
          deleteTask(savedTask._id);
        });
        li.append(dltBtn);
        taskList.appendChild(li);
      });
    })
    .catch((err) => {
      console.log(`Error retrieving tasks from Database: Err: ${err}`);
    });
};

loadTasks();

setInterval(() => {
  loadTasks();
}, 1000);

const signin = (user, pass) => {
  fetch(`/signin/${user}-${pass}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      pass,
    }),
  })
    .then((data) => data.json())
    .catch((err) => {
      console.log(`Error when signing in: Err: ${err}`);
    });
};

document.getElementById("task-button").addEventListener("click", () => {});
