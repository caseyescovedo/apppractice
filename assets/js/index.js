/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('task-list');

  const createTaskElement = (task) => {
    const id = `task${task.id}`;
    const taskElem = document.createElement('li');
    taskElem.innerHTML = task.item;
    taskElem.id = id;

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'X';
    removeBtn.className = 'remove';

    removeBtn.addEventListener('click', () => {
      const body = { id: task.id };

      fetch('/tasks', {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => console.log('successfully removed'))
        .catch((err) => console.log(err));

      document.getElementById(id).remove();
    });

    taskElem.appendChild(removeBtn);

    // return dom node
    return taskElem;
  };

  const displayTasks = (tasks) => {
    // clear task list
    taskList.innerHTML = '';

    // loop over tasks arr
    const taskNodes = tasks.map((elem) => createTaskElement(elem));

    taskList.append(...taskNodes);
  };

  // get tasks on button press
  const getTasks = () => {
    fetch('/tasks')
      .then((response) => response.json())
      .then((tasks) => {
        displayTasks(tasks);
      })
      .catch((err) => console.log(err));
  };

  const getTasksBtn = document.getElementById('retrieve');
  getTasksBtn.addEventListener('click', getTasks);

  // add task on button press
  const addTask = () => {
    // get input value and clear
    const input = document.getElementById('task').value;
    document.getElementById('task').value = '';

    // send to server
    body = { item: input };
    fetch('/tasks', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // on successful add, display new list
        console.log('task successfully added');
        getTasks();
      })
      .catch((err) => console.log(err));
  };

  const addTaskBtn = document.getElementById('task-button');
  addTaskBtn.addEventListener('click', addTask);

  // display tasks on page load
  getTasks();
});
