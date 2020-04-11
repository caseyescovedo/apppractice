const list = document.getElementById("task-list");
const remove = document.createElement("button");
const get = document.getElementById("retrieve");
const taskInput = document.getElementById("task");
const post = document.getElementById("task-button");
const li = document.createElement("li");

function getTasks() {
  fetch("/items", { headers: { "Content-Type": "application/json" } })
    .then((resp) => resp.json())
    .then((items) => {
      items.forEach((item) => {
        remove.classList.add("remove");
        remove.setAttribute("id", item._id);
        remove.innerText = "X";
        li.innerText = item.item;
        list.appendChild(li);
        li.appendChild(remove);

        //Delete functionality//
        remove.addEventListener("click", (e) => {
          fetch("item", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: item._id }),
          })
            .then((resp) => resp.json())
            .then((success) => {
              if (success.success === true) {
                document
                  .getElementById("task-list")
                  .removeChild(e.target.parentElement);
              }
            })
            .catch((err) => {
              console.log(`Error: Task not deleted: ${err}`);
            });
        });
      });
    })
    .catch((err) => {
      console.log(`Error in getTask controller: ${err}`);
    });
}

function postTask() {
  fetch("/items", {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
      item: taskInput.value,
    }),
  })
    .then((res) => res.json())
    .then((newItem) => {
      taskInput.value = "";
      remove.classList.add("remove");
      remove.setAttribute("id", newItem._id);
      remove.innerText = "X";
      li.innerText = newItem.item;
      list.appendChild(li);
      li.appendChild(remove);
      //Delete functionality//
      remove.addEventListener("click", (e) => {
        document
          .getElementById("task-list")
          .removeChild(e.target.parentElement);
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
