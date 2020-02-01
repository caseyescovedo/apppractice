window.onload = function() {
  //Caching all of the things I might need later
  console.log("Merry Christmas");
  const bodyDiv = document.getElementById("create");
  const input = document.getElementById("task");
  const addTaskBtn = document.getElementById("task-button");
  const getTaskBtn = document.getElementById("retrieve");
  const listCtr = document.getElementById("task-list");
  //This will add all of our list items
  function getList(data) {
    let listItems = "";
    for (let el of data) {
      const { id, item } = el;
      listItems += `<li id="item${id}">${item}<button id="btn${id}"class="remove">X</button></li>`;
    }
    listCtr.innerHTML = listItems;
  }
  //eventlistener on the get All Tasks button. I set unique identifying ids on the list items and the buttons so that I can find them easily when I need to delete later
  getTaskBtn.addEventListener("click", () => {
    fetch("/task")
      .then(res => res.json())
      .then(data => getList(data));
  });

  //event listener on the addTask button that takes any non empty input value and adds it to the database
  addTaskBtn.addEventListener("click", () => {
    if (input.value.trim() !== "") {
      console.log(input.value);
      fetch("/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ item: input.value })
      }).catch(err => console.log(err));
    }
  });
  //Event listener on ul bubbles up the event click event and lets me know where it takes place. I find the unique id attached to the button and list item and use it to delete the item from the database and from the dom.
  listCtr.addEventListener("click", async e => {
    if (e.target.className === "remove") {
      const id = Number(e.target.id.slice(3));
      await fetch("/task", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      const listItem = document.getElementById(`item${id}`);
      listItem.remove();
    }
  });
};
