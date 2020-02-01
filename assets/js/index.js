/* eslint-disable no-unused-vars */
console.log('hi from index.js');

// Test Wiring For Button Clicks
// const helloWorldButtonClick = () => {
//   console.log('Hello World');
// };

const deleteClick = (e) => {
  const id = e.target.getAttribute('id').replace('id_', '');
  console.log('DELETE: ', id);

  const deletedEl = document.querySelector(`.id_${id}`);
  deletedEl.parentNode.removeChild(deletedEl);

  fetch(`/tasks/?taskId=${id}`, {
    method: 'DELETE',
  });
};

// takes in an array of items and paints them to the DOM
const renderTasks = (tasks) => {
  // get destination
  const taskList = document.querySelector('#task-list');

  // create an li for each task in the database
  for (let i = 0; i < tasks.length; i += 1) {
    const task = tasks[i];

    // prevent multiple renders of the same task
    const taskCheck = document.querySelectorAll(`#id_${task.id}`).length;
    console.log(taskCheck);
    if (taskCheck > 0) continue;

    // create a document element and add task text
    const taskElement = document.createElement('li');
    taskElement.setAttribute('id', `li_${task.id}`);
    taskElement.innerHTML = `${task.item}`;

    // create button and add to task element
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'X';
    deleteButton.setAttribute('id', `id_${task.id}`);
    deleteButton.setAttribute('class', 'remove');
    deleteButton.addEventListener('click', deleteClick);
    // append delete button
    taskElement.appendChild(deleteButton);

    // append task element to task list
    taskList.appendChild(taskElement);
  }
};

const handleGetTasksClick = () => {
  // console.log('Getting tasks');
  // fetch tasks from server
  fetch('/tasks', {
    method: 'GET',
  })
    // .then((res) => console.log(res))
    .then((res) => res.json())
    .then((res) => {
      const { tasks } = res;
      console.log(tasks);
      renderTasks(tasks);
    })
    .catch((err) => console.log(err));
  // console.log
};
