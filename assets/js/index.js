

const addTask = (tasks) => {
  const taskList = document.getElementById('task-list')
  tasks.forEach((task) => {
    const newItem = document.createElement('li');
    newItem.innerText = task.item;
    newItem.id = task._id;

    const button = document.createElement('button');
    button.className = 'remove';
    button.innerText = 'X';

    button.addEventListener('click', () => {
      fetch(`/api/secret/${task._id}`, {
        method: 'Delete'
      })
      .then((data) => data.json())
      .then((task) => {
        document.getElementById(task._id).remove() //?
      })
      .catch((error) => console.log(error))
    })

    newItem.appendChild(button);
    taskList.appendChild(newItem);
  });
}

const getTaskButton = document.getElementById('retrieve')
getTaskButton.addEventListener('click', () => {
  document.getElementById("task-list").innerHTML = "";
  fetch('/api/secret')
    .then((data) => data.json())
    .then((tasks) => {
      addTask(tasks);
    })
})
const addTaskButton = document.getElementById('task-button')
const inputVal = document.getElementById('task')
addTaskButton.addEventListener('click', () => {
  fetch("/api/secret", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item: inputVal.value }),
  })
    .then((data) => data.json())
    .then((tasks) => {
      addTask(tasks);
    });
})
