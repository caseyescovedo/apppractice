const list = document.getElementById("task-list");
const get = document.getElementById("retrieve");
const taskInput = document.getElementById("task");
const post = document.getElementById("task-button");
const pass = document.getElementById("pass");
const user = document.getElementById("user");

function getTasks() {
  fetch("/items")
    .then((response) => response.json())
    .then((items) => {
      console.log(items);
      items.forEach((item) => {
        const li = document.createElement("li");
        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.setAttribute("id", item._id);
        remove.innerText = "X";
        li.innerText = item.item;
        list.appendChild(li);
        li.appendChild(remove);

        //Delete functionality//
        remove.addEventListener("click", (e) => {
          fetch("/items", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: item._id }),
          })
            .then((resp) => resp.json())
            .then((success) => {
              if (success.success === true) {
                list.removeChild(e.target.parentElement);
              }
            })
            .catch((err) => {
              console.log(`Error: Task not deleted: ${err}`);
            });
        });
      });
    })
    .catch((err) => {
      console.log(`Error in getTask: ${err}`);
    });
}

function postTask() {
  fetch("/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item: taskInput.value,
    }),
  })
    .then((response) => response.json())
    .then((newItem) => {
      taskInput.value = "";
      const li = document.createElement("li");
      const remove = document.createElement("button");
      remove.classList.add("remove");
      remove.setAttribute("id", newItem._id);
      remove.innerText = "X";
      li.innerText = newItem.item;
      list.appendChild(li);
      li.appendChild(remove);
      //Delete functionality//
      remove.addEventListener("click", (e) => {
        list.removeChild(e.target.parentElement);
        fetch(`/items`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: newItem._id }),
        }).catch((err) => {
          console.log(`Error: Message not deleted: ${err}`);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

post.addEventListener("click", postTask);
get.addEventListener("click", getTasks);
