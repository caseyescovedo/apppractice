window.addEventListener('DOMContentLoaded', () => {
  const getTasksButton = document.querySelector('#retrieve');
  const addTaskButton = document.querySelector('#task-button');
  const taskList = document.querySelector('#task-list');

  const getTasks = () => {
    fetch('http://localhost:3333/api/secret', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(({ tasks }) => {
        const tasksArray = tasks.map(({ _id, item }) => `<li id=${_id}>${item}<button class="remove" onclick="deleteTask('${_id}')">X</button></li>`);
        taskList.innerHTML = tasksArray.join('');
      })
      .catch((err) => console.log('Error getting tasks:', err));
  };

  const postTask = () => {
    const item = document.querySelector('#task').value;
    const task = { item };
    fetch('http://localhost:3333/api/secret', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then(() => {
        getTasks();
      })
      .catch((err) => console.log('Error adding task:', err));
  };

  const deleteTask = (id) => {
    const task = document.querySelector(`#${id}`);
    task.remove();

    fetch('http://localhost:3333/api/secret', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then(() => {
        getTasks();
      })
      .catch((err) => console.log('Error deleting task:', err));
  };

  getTasksButton.addEventListener('click', getTasks);
  addTaskButton.addEventListener('click', postTask);
});
