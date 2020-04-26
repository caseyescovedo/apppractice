function getTasks() {
fetch('/secret/tasks')
  .then(res => res.json())
  .then(tasks => {
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach(addTaskToDOM);
  })
  .catch(err => console.log('Error during getting tasks:', err))
};

getTasks();

document.getElementById('retrieve').addEventListener('click', getTasks);
document.getElementById('task-button').addEventListener('click', (e) => {
  e.preventDefault();

  const taskInput = document.getElementById('task');

  const body = {
    item: taskInput.value
  }
  fetch('/secret/tasks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(task => {
    // console.log('response after posting:', task);
    taskInput.value = '';
    addTaskToDOM(task);
  })
  .catch(err => console.log('Error during posting:', err))
});

function addTaskToDOM(task) {
  const newLi = document.createElement('li');
  newLi.innerText = task.item;
  newLi.id = task._id;
  const button = document.createElement('button');
  button.innerText = 'X';
  button.className = 'remove';
  button.addEventListener('click', () => {
    fetch(`/secret/tasks/${task._id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(task => {
        console.log('Deleted task:', task);
        document.getElementById('task-list').removeChild(newLi);
      })
      .catch(err => console.log('Error during delete:', err))
  });
  newLi.appendChild(button);
  document.getElementById('task-list').appendChild(newLi);
}

