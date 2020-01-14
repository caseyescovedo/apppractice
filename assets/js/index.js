// Add Task onclick will create new todo list item in database
document.getElementById('task-button').addEventListener('click', () => {
  const listItem = document.createElement('li');
  const inputValue = document.getElementById('task').value;
  listItem.innerText = inputValue;
  document.getElementById('task-list').appendChild(listItem);

  fetch('/secret', {
    method: 'POST',
    body: JSON.stringify({ item: inputValue }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log('ERROR: ', err))

  document.getElementById('task').value = '';
})

// Get Tasks onclick will retrieve all todo list items from database and display them 
document.getElementById('retrieve').addEventListener('click', () => {
  fetch('/secret')
  .then(res => res.json())
  .then(data => {
    // console.log('get task button clicked, logging data: ', data)
    data.forEach((inputValue, index) => {
      const listItem = document.createElement('li');
      listItem.id = index;
      listItem.innerHTML = inputValue.item + `<button id=${index} class="remove">X</button>`
      document.getElementById('task-list').appendChild(listItem);
    });
  })
  .catch(err => console.log('ERROR: ', err))
})

// delete a todo list item
// grab everything with the claas "remove"
const removeClassCollection = document.getElementsByClassName('remove');
// console.log('removeClassCollection: ', removeClassCollection)
// returns a collection --> iterate through them and add event listening to each button
for (const btn of removeClassCollection) {
  // console.log('btn: ', btn)
  btn.addEventListener('click', () => {
      // Grab id of the Li in order to get the value of the list item that will be deleted
    const inputValue = document.getElementById(btn.id).value
    // console.log('inputValue', inputValue)
    fetch('/secret', {
      method: 'DELETE',
      body: JSON.stringify({ item: inputValue }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log('ERROR: ', err))
  })
}