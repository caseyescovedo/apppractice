// GET All Tasks and Display -------------------------------------
const fetchTasks = () => {
  fetch('/tasks')
  .then(response => response.json())
  .then(allTasks => {
    const taskList = document.getElementById('task-list')
      allTasks.forEach((task => {
        const listItem = document.createElement('li');
        listItem.innerText = task.text;
        listItem.id = task._id;
        taskList.appendChild(listItem)
      }));
    })
};

// POST Task and Display ------------------------------------------
const addTaskButton = document.getElementById('task-button')
document.getElementById('task-button').onclick = function trythis() {
  console.log('this works')
}

const taskInput = document.getElementById('task')

const postTask = () => {
  console.log('add item')
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'contenxt-type': 'application/json',
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(task => {

      const listItem = document.createElement('li');
      listItem.innerText = task.text;
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'X';
      // onclick to delete
      listItem.appendChild(deleteButton);
      document.getElementById('task-list').appendChild(listItem)

    })
}

