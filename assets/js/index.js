console.log("i'm in the index.js file!");

// Make fetch request to show data
// added an event listener to Get Task Button
document.getElementById("retrieve").addEventListener("click", e => {
  fetch("/secret")
    .then(resp => resp.json())
    .then(data => {
      appendToDom(data);
    });
});
// Note: could not get past this console error message: secret:1 Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0

//   console.log(data);
//   // create new "li" tag
//   const newItem = document.createElement("li");
//   // set id of "li" tag
//   newItem.id = data._id;
//   // set text of "li" tag to be input data
//   newItem.innerText = data.item;
//   // find "ul" tag on secret.html file and append new "li" item under
//   document.getElementById("task-list").appendChild(newItem);
// });

// Post task to page

document.getElementById("task-button").addEventListener("click", e => {
  const inputMsg = document.getElementById("task");
  const msgText = inputMsg.value;
  fetch("/secret", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ item: msgText })
  })
    .then(resp => resp.json())
    .then(data => {
      const newItem = document.createElement("li");
      newItem.id = data._id;
      newItem.innerText = data.item;
      document.getElementById("task-list").appendChild(newItem);
    });
});

// Helper function that includes delete
function appendToDom(data) {
  const newItem = document.createElement("li");
  newItem.id = data._id;
  newItem.innerText = data.item;
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "X";
  deleteBtn.className = "remove";
  deleteBtn.id = data._id;
  deleteBtn.addEventListener("click", e => {
    fetch(`/secret/${e.target.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json)
      .then(data => {
        console.log("data in delete", data);
        document.getElementById("task-list").removeChild(newItem);
      });
  });
  document
    .getElementById("task-list")
    .appendChild(newItem)
    .appendChild(deleteBtn);
}
