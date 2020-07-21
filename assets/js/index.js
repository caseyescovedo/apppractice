const getTasksButton = document.getElementById('retrieve');
getTasksButton.addEventListener('click', () => {
  fetch('/tasks')
    .then(response => response.json())
    .then(data => {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
        const newLi = document.createElement('LI');
        newLi.innerText = data[i].item;
        newLi._id = data[i]._id;
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        newLi.appendChild(deleteButton);
        taskList.appendChild(newLi);

        deleteButton.addEventListener('click', () => {
          const { _id } = newLi;
          console.log(newLi)
          newLi.remove(newLi)
          fetch(`/tasks/${_id}`, {
            method: 'delete',
          })
            .then(response => response.json())
            .catch(err => console.log('err', err))
        });
      }
    });
})


const addTaskButton = document.getElementById('task-button');
addTaskButton.addEventListener('click', () => {
  const task = document.getElementById('task').value;
  if (task.length > 0) {
    fetch('/tasks', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: task })
    })
      .then(response => response.json())
      .catch(err => console.log(err, 'CANNOT BE EMPTY'))
  }
})
