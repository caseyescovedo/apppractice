
const taskFeed = document.querySelector('#task-list');
const taskText = document.querySelector('#task');

//used to make task list items
const listFactory = function (task) {
  const item = document.createElement("li");
  item.innerHTML = `${task.item} <button class='remove' onClick=deleteTask(${task.id})>X</button>`
  item.setAttribute("id", `listItem${task.id}`)
  return item;
}

const getTasks = function () {
  //clear list before fetching
  taskFeed.innerHTML = ""
  //fetch list from DB
  fetch("/tasks")
    .then(res => res.json())
    .then(data => data.forEach((task => taskFeed.appendChild(listFactory(task)))))
}

const postTask = function () {
  //post task to server
  fetch(`/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: taskText.value })
  })
    .then(res => res.json())
    .then(task => {
      //after response attach item
      taskText.value = "";
      taskFeed.appendChild(listFactory(task))
    })
}

const deleteTask = function (id) {
  //delete request to server
  fetch(`/tasks/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
      //after response delete item
      const deleteTask = document.querySelector(`#listItem${id}`);
      deleteTask.parentNode.removeChild(deleteTask);
    })
}