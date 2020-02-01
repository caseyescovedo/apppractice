document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('retrieve').addEventListener('click', () => {
    getTaskData();
  });

  document.getElementById('task-button').addEventListener('click', () => {
    addTaskData();
  });
});

function removeButton(idParam) {
  fetch(`/deleteTask?id=${idParam}`, { method: 'DELETE' })
    .then(data => getTaskData())
    .catch(err => console.log('We are sorry, please try again later!'));
}

function getTaskData() {
  let taskContainer = document.getElementById('task-list');

  fetch('/getTasks')
    .then(res => res.json())
    .then(data => {
      taskContainer.innerHTML = '';
      data.forEach(element => {
        taskContainer.innerHTML += `<li>${element.item}<button class="remove" onclick="removeButton(${element.id})">REMOVE</button></li>`;
      });
    })
    .catch(err => console.log('We are sorry, please try again later!'));
}

function addTaskData() {
  let taskFieldValue = document.getElementById('task').value;

  fetch(`/postTask?task=${taskFieldValue}`, { method: 'POST' })
    .then(data => getTaskData())
    .catch(err => console.log('We are sorry, please try again later!'));
}
