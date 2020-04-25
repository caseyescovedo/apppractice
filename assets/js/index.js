const addToDOM = (tasks) => {
  const taskList = document.createElement('li');
  taskList.innerText = tasks.item;
  taskList.id = tasks.id;
  const button = document.createElement('button');
  button.innerText = 'Done'
  button.addEventListener('click', () => {
    fetch(`/secret/${taskList.id}`, {
      method: "DELETE",
    })
      .then(res => {
        document.getElementById('task-list').removeChild(taskList)
      })
      .catch(err => console.error('addToDom/DELETE error: ', err.message))
  })
  taskList.appendChild(button);
  document.getElementById('task-list').appendChild(taskList);
}

const getTasks = () => {
  fetch(`/secret/task`)
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById('task-list')
      list.innerHTML = ''
      tasks.forEach(task => {
        addToDOM(task)
      })
    })
}

getTasks();

document.getElementById('retrieve').addEventListener('click', getTasks);

document.getElementById('task-button').addEventListener('click', e => {
  e.preventDefault();
  let item = document.getElementById('task').value;
  const body = {
    item
  }
  fetch(`/secret`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(task => {
      item = '';
      addToDOM(task);
    })
    .catch(err => console.error('POST/index.js error: ', err.message))
})

