// document.addEventListener('DOMContentLoaded', () => {

// Ran out of time on the last section to check cookies
// Added this code as a quick check
let pageCookie = document.cookie;

if (!pageCookie.includes('token=admin')) {
  window.location.href = '/';
}

let getTasksButton = document.getElementById('retrieve');
let addTaskButton = document.getElementById('task-button');
let taskItem = document.getElementById('task');
let taskListDiv = document.getElementById('task-list');

getTasksButton.addEventListener('click', function (event) {
  getAllTasks();
});

addTaskButton.addEventListener('click', function (event) {
  addNewTask();
});

const getAllTasks = () => {
  let taskListHTML = '';
  fetch('/api/tasks/alltasks', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('res====', res);
      res.tasks.forEach(
        (task) =>
          (taskListHTML += `<li>${task.item} <button class="remove" onClick="deleteTask('${task._id}')" id="${task._id}">X</button></li>`)
      );
      taskListDiv.innerHTML = taskListHTML;
    });
};

const addNewTask = () => {
  let newTask = taskItem.value;
  console.log('new task ====', newTask);
  let taskListHTML = '';
  fetch('/api/tasks/addtask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item: newTask,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('res====', res);
      res.tasks.forEach(
        (task) =>
          (taskListHTML += `<li>${task.item} <button class="remove" onClick="deleteTask('${task._id}')" id="${task._id}">X</button></li>`)
      );
      taskListDiv.innerHTML = taskListHTML;
    });
};
// });

const deleteTask = (itemId) => {
  let taskId = itemId;
  let htmlTaskToRemove = document.getElementById(itemId);
  htmlTaskToRemove.parentNode.removeChild(htmlTaskToRemove);

  let taskListHTML = '';
  fetch(`/api/tasks/delete/${taskId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((res) => {
      res.tasks.forEach(
        (task) =>
          (taskListHTML += `<li>${task.item} <button class="remove" onClick="deleteTask('${task._id}')" id="${task._id}">X</button></li>`)
      );
      taskListDiv.innerHTML = taskListHTML;
    });
};

const updateTaskList = (taskArr) => {
  let taskListHTML = '';
  taskArr.forEach(
    (task) =>
      (taskListHTML += `<li>${task.item} <button class="remove" onClick="deleteTask('${task._id}')" id="${task._id}">X</button></li>`)
  );
  taskListDiv.innerHTML = taskListHTML;
};
