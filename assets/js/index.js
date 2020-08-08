const retrieve = document.getElementById('retrieve');
const addTask = document.getElementById('task-button');
const taskList = document.getElementById('task-list');

retrieve.addEventListener('click', () => getTasks());

function getTasks() {
  fetch('/getTasks')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((ele) => {
        addToList(ele.item, ele._id);
      });
    })
    .catch((err) => console.log('err fetching at client side: ', err));
}

function addToList(item, id) {
  const li = document.createElement('li');
  li.setAttribute('id', id);
  li.innerHTML = `${item}<button id="delBtn" class="remove">X</button>`;
  if (!document.getElementById(id)) taskList.appendChild(li);
}

addTask.addEventListener('click', () => {
  const task = document.getElementById('task').value;
  if (task) {
    fetch('/postTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ task }),
      getTasks();
    }).catch((err) => console.log('err addingtask at client side: ', err));
  }
});

taskList.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'delBtn') {
    deleteTask(e.target.parentNode.id);
  }
});

const deleteTask = (id) => {
  fetch(`/deleteTask/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', },
  })
    .then((res) => res.json())
    .then((id) => {
      const remove = document.getElementById(id._id);
      remove.parentNode.removeChild(remove);
    })
    .catch((err) => console.log('err deleting task at client side: ', err));
}
