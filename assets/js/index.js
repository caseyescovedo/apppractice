document.addEventListener('DOMContentLoaded', () => {
  // Event listeners
  document.getElementById('retrieve').addEventListener('click', () => {
    getTaskData();
  });

  function getTaskData() {
    let taskContainer = document.getElementById('task-list');

    fetch('/getTasks')
      .then(res => res.json())
      .then(data => {
        taskContainer.innerHTML = '';
        data.forEach(element => {
          taskContainer.innerHTML += `<li>${element.item}<button class="remove">REMOVE</button></li>`;
        });
      });
  }
});
