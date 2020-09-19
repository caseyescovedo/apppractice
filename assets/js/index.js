const input = document.querySelector('input');
const addButton = document.getElementById('task-button');
const getButton = document.getElementById('retrieve');

addButton.addEventListener('click', () => {
  postTask();
})

getButton.addEventListener('click', () => {
  getAllTasks();
})

const taskList = document.getElementById('task-list')

function getAllTasks() {
  fetch('/api')
    .then((res) => res.json())
    .then((data) => {
      taskList.innerHTML = '';
      // console.log(data);
      for (let el of data) {
        for (let key in el) {
          const task = document.createElement('li')
          task.innerText = el[key];
          taskList.appendChild(task);
        }
        const deleteButton = document.createElement('button');
        deleteButton.className=('remove')
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', () => deleteTask(el._id))
        taskList.appendChild(deleteButton);
      }
    })
    .catch((err) => console.log(err));
  }

function postTask() {
  const task = input.value
  const postObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item: task,
      created_at: '2020-09-19',
    })
  }
  fetch('/api',postObj)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .then(() => getAllTasks())
    .catch((err) => console.log(err))
}

function deleteTask(task) {
  const deleteObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: task }),
  }
  fetch('/api', deleteObj)
    .then((res) => res.json())
    .then(() => getAllTasks())
    .catch((err) => {
      console.log(err);
    })
}
