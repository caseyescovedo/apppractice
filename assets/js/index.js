// having trouble wiping out my list items on each get items request
// workaround possibilities (ran out of time to implement): 
// 1) considered populating an array for front-end display purposes and emptying the array on each request prior to repopulating
// 2) attempting to implement map method to create a new array each time the button is clicked
let itemList = [];

// fetch request to display all items
// --- need to wipe out previous data before rendering each get request ---
document.querySelector('#retrieve').addEventListener('click', () => {
  fetch('/secret/items')
  .then(res => res.json())
  .then(data => {
    displayItem(data);
  })
})

// add event listener for Add Task button
document.querySelector('#task-button').addEventListener('click', () => {
  const taskInput = document.getElementById('task');
  const taskText = taskInput.value;
  document.getElementById('task').value = '';

  fetch('/secret/items', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      item: taskText
    })
  })
    .then(res => res.json())
    .then(data => {
      displayItem(data);
    })
})

// helper function to display item data;
function displayItem (data) {
  data.forEach((itemObj, index) => {
    // create new list item
    const newItem = document.createElement('li');
    newItem.id = itemObj.id;
    newItem.innerText = itemObj.item;
    document.getElementById('task-list').appendChild(newItem);

    // create remove button and append
    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.textContent = 'X';
    newItem.appendChild(remove);

    // add event listener to remove button
    remove.addEventListener('click', (event) => {
      const parent = remove.parentNode;
      const grandparent = parent.parentNode;
      const id = parent.id;

      grandparent.removeChild(parent);

      // send delete request to backend
      fetch(`/secret/items/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => console.log(data))
    })
  })
}