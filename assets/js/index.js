
const taskList = document.querySelector("#task-list");
const getTasks = document.querySelector("#retrieve");
const submitTask = document.querySelector("#task-button");
CLIENT = "/tasks";
const inputTask = document.querySelector("#task");
let currTask;
let allTasks = [];
let fetchedData = false;

/**
 * Utils functions addNewList and deleteItem
 * addNewList takes in an id and item and add an element to the browser.
 * deleteItem is attached to the button and ready to be fired at moment noticed.
 *
 */
function addNewList(_id, item) {
  newButton = document.createElement("button");
  newButton.classList.add("remove");
  newButton.innerText = "X";
  newList = document.createElement("li");
  newButton.addEventListener("click", (event) => deleteItem(event, _id));
  newList.innerText = item;
  newList.appendChild(newButton);
  taskList.appendChild(newList);
}

async function deleteItem(event, item_id) {
  await fetch(`/tasks/${item_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error("Error:", error);
  });
  event.target.parentElement.remove();
}
/**
 * All event handlers
 *
 *
 */

inputTask.addEventListener("change", (event) => {
  currTask = event.target.value;
});

submitTask.addEventListener("click", async (event) => {
  event.preventDefault();
  if (currTask.length > 5) {
    await fetch("/tasks", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: currTask }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data._id, data.item);
        allTasks.push(data);
        addNewList(data._id, data.item);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    inputTask.value = "";
    currTask = "";
  }
});

getTasks.addEventListener("click", async (event) => {
  event.preventDefault();
  // fetch data
  if (!fetchedData) {
    await fetch("/tasks", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        allTasks = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    await allTasks.forEach(({ _id, item }) => {
      addNewList(_id, item);
    });
    fetchedData = true;
  }
});
