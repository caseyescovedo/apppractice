function getTasks() {
  let ul = document.getElementById('task-list');
  ul.innerHTML = "";

  fetch('/task')
  .then(response => response.json())
  .then(response => {
    response.forEach( data => {
      createTask(ul, data);
    })
  })
}

function addTask() {
  let ul = document.getElementById('task-list');
  let item = document.getElementById('task').value;
  if (item) {
    let created_at = new Date().toISOString();
    fetch('/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item, created_at })
    })
    .then(response => response.json())
    .then(data => {
      createTask(ul, data);
    })
  }
}

function deleteTask(_id) {
  fetch(`/task?_id=${_id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.status === 200) {
      let li = document.getElementById(`task${_id}`);
      li.remove();
    }
  })
}

function createTask(ul, data) {
  let li = document.createElement('li');
  li.id = `task${data._id}`;
  let button = document.createElement('button');
  button.className = 'remove';
  button.innerText = 'X';
  li.innerText = data.item;
  li.appendChild(button);
  ul.appendChild(li);
  button.addEventListener('click', () => deleteTask(data._id));
}