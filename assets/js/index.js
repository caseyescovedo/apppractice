/* eslint no-underscore-dangle:0 */

window.onload = () => {
  const retrieve = document.getElementById('retrieve');
  const taskList = document.getElementById('task-list');
  const create = document.getElementById('task-button');

  const createList = (arr) => {
    arr.forEach((el) => {
      // Create item
      const task = document.createElement('li');
      task.textContent = el.item;
      // Create button
      const button = document.createElement('button');
      button.classList.add('remove');
      button.textContent = 'X';
      button.setAttribute('id', el._id);
      button.addEventListener('click', destroyTask);

      task.appendChild(button);
      taskList.appendChild(task);
    });
  };

  function createTask() {
    const newTask = document.getElementById('task').value;
    // console.log(data);
    fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: newTask }),
    })
      .then(getTasks())
      .catch((err) => console.log(err));
  }

  function getTasks() {
    fetch('http://localhost:3333/tasks')
      .then((res) => res.json())
      .then((tasks) => {
        while (taskList.firstChild) taskList.firstChild.remove();
        createList(tasks);
      })
      .catch((err) => console.log(err));
  }

  function destroyTask(event) {
    fetch('http://localhost:3333/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: event.target.id }),
    })
      .then(getTasks())
      .catch((err) => console.log(err));
  }

  retrieve.addEventListener('click', getTasks);
  create.addEventListener('click', createTask);
};
