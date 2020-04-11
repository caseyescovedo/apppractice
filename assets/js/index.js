 window.onload = () => {
    document.getElementById('task-button').addEventListener('click', postTask);
    document.getElementById('retrieve').addEventListener('click', getTasks);
};

const getTasks = () => {
  fetch('/getTasks')
    .then(res => res.json())
    .then(res => {
      const taskList = document.getElementById('task-list');
      for (let i = 0; i < res.length; i++) {
        let taskItem = document.createElement('li')
        taskItem.id = res[i]._id
        taskItem.innerHTML = res[i].item

        let deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = 'X';
        deleteBtn.addEventListener('click', () => {
          deleteTask(res[i]._id);
        })
        taskList.appendChild(taskItem);
        taskItem.appendChild(deleteBtn);
      }
    })
}

const postTask = () => {
  let inputField = document.getElementById('task').value
  document.getElementById('task').value = '';
  fetch('/postTask', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      item: inputField
    })
  })
    .then(getTasks())
    .catch(err => console.log(err));
}

const deleteTask = (id) => {
  let deletionItem = document.getElementById(id);
  let item = document.getElementById('task-list');
  item.removeChild(deletionItem);
  fetch(`/delete/${id}`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' }
  })
    .catch(err => console.log(err))
}
