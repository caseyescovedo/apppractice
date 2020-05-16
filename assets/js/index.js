const addTask = () => {
  let newTask = document.getElementById("task").value;
  let time = new Date().toJSON().slice(0,10).replace(/-/g,'/');

  fetch("/api/postTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ item: newTask, created_at: time })
  })
}


const deleteTask = () => {
  let taskId = document.getElementById("remove").value

}

$(document).ready(() => {
  $("#retrieve").click(() => {
    $.get("/api/getTask", (data, status) => {
      console.log(data.rows);
      data.rows.forEach((task) => {
        $("#task-list").append(
          `<li>${task.item}<button class="remove">X</button></li>`
        )
      })
    })
  })
})

const checkLogin = () => {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user: user, pass: pass })
  })
}

