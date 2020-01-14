console.log('hi from the index.js file!')

/*When the button is clicked to get tasks, 
all tasks from the database should be displayed as 
list items in the #task-list element. These list items should display 
the task item followed by a button (inside the list item) with a class of 
remove and display an X. As an example, one list item might look like <li>Go 
shopping <button class="remove">X</button></li */

document.getElementById('retrieve').addEventListener('click', (e) => {
  console.log('in the first line of index.js retrieve id button')
  fetch('/secretTask')
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      data.forEach(data => {
        appendToDom(data);
      });
    });
})

// Post to page
document.getElementById('task-button').addEventListener('click', (e) => {
  const messageInput = document.getElementById('task')
  const messageText = messageInput.value
  fetch('/secret', {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ item: messageText })
  })
    .then(resp => resp.json())
    .then(data => {
      appendToDom(data);
      // const newItem = document.createElement('li');
      // newItem.id = data._id;
      // newItem.innerText = data.item;
      // document.getElementById('task-list').appendChild(newItem);
    })
})


// Helper fcn to append delete button to every task
function appendToDom(data) {
  const newItem = document.createElement('li');
  newItem.id = data._id;
  newItem.innerText = data.item;
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'remove';
  deleteBtn.innerHTML = 'X';
  deleteBtn.id = data._id;
  deleteBtn.addEventListener('click', e => {
    fetch(`/secret/${e.target.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json)
      .then(data => {
        console.log('data deleted', data);
        document.getElementById('task-list').removeChild(newItem);
      });
  });
  document
    .getElementById('task-list')
    .appendChild(newItem)
    .appendChild(deleteBtn);
}

