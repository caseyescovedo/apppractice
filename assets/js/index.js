const form = document.getElementById("create");

window.addEventListener("DOMContentLoaded", event => {
  getTasks();

  document.getElementById("task-button").addEventListener("click", postTask);
  document.getElementById("retrieve").addEventListener("click", getTasks);
});

function addTask(data) {
  data.item.map(val => {

    let newListItem = document.createElement("li");

    newListItem.innerText = val.item;

    document.getElementById("task-list").appendChild(newListItem);
  })
}

function postTask(e) {
  const taskInput = document.getElementById("task").nodeValue;
  fetch("/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: taskInput }),
      })
      .then(data => {
          data.json();
      })
      .then(data => {
        document.getElementById('task').value = '';
      })
      .catch(err => {
        console.log(err)
      })
      getTasks();
}

function getTasks() {
  fetch("/todo")
    .then(response => response.json())
    .then(data => {
      addTask(data);
    })
     .catch((err) => console.log(err));
}

function deleteTask(e) {
  const { id } = event.target;

  fetch(`/todo/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      if(data) {
        event.target.removeChild()
      }
    })
    .catch((err) => console.log(err));
};
