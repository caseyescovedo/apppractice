const getTasks = () => {
  fetch('/api/secret')
  .then((response) => response.json())
  .then((data) => {
    const tasks = document.getElementById('tasks');
    tasks.innerHTML = '';
    data.forEach((task) => {
      addItem(task)
    })
  })
}

getTasks()

const addItem = (task) => {
  const newList = document.createElement('li');
      newList.innerText = task.item;
      newList.id = task._id
      const button = document.createElement('button')
      button.innerText = 'X';
      button.addEventListener('click', () => {
        fetch(`/api/secret/${task._id}`, {
          method: 'Delete'
        })
        .then((response) => response.json())
        .then(data => {
          document.getElementById('tasks').removeChild(newList)
        })
        .catch((err) => console.log(err));
      })
      newList.appendChild(button);
      tasks.appendChild(newList)
}


document.getElementById('retrieve').addEventListener('click', getTasks)

document.getElementById('task-button').addEventListener('click', (e) => {
  e.preventDefault();

  const taskText = document.getElementById('task');

  const body = {
    item: taskText.value
  }

  fetch('/api/secret', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body:JSON.stringify(body)
  })
  .then((response) => response.json())
  .then((data) => {
    taskText.value = ''
    addItem(data)
    })
  .catch((err) => console.log(err))
})