// getting the button id
const getButton = document.querySelector("#retrieve");
// when the button is clicked
getButton.onClick = () => {
  fetch("/secret", {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    // json parsing returned data
    .then((data) => data.json())
    // console logging for now
    .then((json) => {
      const taskArr = [];
      json.forEach((el) => taskArr.push(el.item));
    })
    .catch((err) => console.error(err));
};

// still need to figure out how to map each value and render onto screen.
const tasksList = document.querySelector("#tasks");
tasksList.appendChild = (
  <li>
    {taskArr}
    <button class="remove">X</button>
  </li>
);

const addButton = document.querySelector("#task-button");
// need to get the values of the input field
const input = document.querySelector("#task");
// getting the current time
let n = new Date();
let time = n.now();
addButton.onClick = adding;
const adding = (input) => {
  fetch("/secret", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: {
      item: input,
      created_at: time,
    },
  }).catch((err) => console.error(err));
};

const deleteTask = document.querySelector(".remove");
deleteTask.onClick = (e) => {
  fetch("/secret", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    // e.target should give me the specific name of the item that I am deleting
    params: e.target,
  }).catch((err) => console.error(err));
};
