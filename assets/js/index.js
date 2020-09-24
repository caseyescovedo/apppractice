window.addEventListener('load', () => getAllItems());

const getTasksButton = document.getElementById('retrieve');
getTasksButton.addEventListener('click', () => {
  getAllItems()
})

const addTaskButton = document.getElementById('task-button');
addTaskButton.addEventListener('click', () => {
  addItem();
})

function getAllItems() {
  fetch(`/api`)
    .then((resp) => resp.json())
    .then((data) => {
      const taskList = document.querySelector('#task-list');
      taskList.innerHTML = '';
      for (let el of data) {
        const item = document.createElement('li');
        item.innerHTML = el.item;
        item.setAttribute('id', el._id)
        const deleteButton = document.createElement('button');
        deleteButton.className = 'remove';
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', () => deleteItem(el._id));
        item.appendChild(deleteButton);
        taskList.appendChild(item);
      }
    })
    .catch((err) => console.log(err));
}

function addItem() {
  const inputField = document.getElementById('task');
  const text = inputField.value;
  const postObj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item: text,
      created_at: '09/19/2020'
    }),
  };
  fetch('/api', postObj)
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .then(() => getAllItems())
    .catch((err) => console.log(err));
}

function deleteItem(id) {
  const deleteObj = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  };
  fetch('/api', deleteObj)
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .then(() => getAllItems())
    .catch((err) => console.log(err));
}