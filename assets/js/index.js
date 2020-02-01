
// when the get tasks button is hit we need to display all the task
// need to get the element for add task button
const retrieve = document.querySelector("#retrieve");
task.addEventListener('submit', (event) => {
  // need a fetch request for insert
  fetch('/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task })
  })
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      console.log(info)
    })
})


// need to get the element of the get tasks button
const getInfo = document.querySelector("task-button")
getInfo.addEventListener('submit', (event) => {
  // need a fetch request for /info
  fetch('/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((info) => {

      // add info to the dom logic here
      console.log(info);
    })
})


// need to create the delete button
// need to get the element for the delete button
// need a fetch request for delete
fetch('/delete', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ id })
})
  .then((response) => {
    return response.json();
  })
  .then((info) => {
    console.log(info)
  })