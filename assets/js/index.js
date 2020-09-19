const getInput = () => document.getElementById('task').value;
const addTask = (input) => {
  document.querySelector('#task-button').addEventListener('click', () => {
    console.log(input());
    let body = input();
    const formBody = new FormData();
    formBody.set('item', body);
    const response = fetch('http://localhost:3333/tasks', {
      method: 'POST',
      body: {
        item: body,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // const content = await response.json();
    // console.log(content);
  });
};

const getTasks = (deleteCallback) => {
  document.querySelector('#retrieve').addEventListener('click', async () => {
    const response = await fetch('http://localhost:3333/tasks');
    const tasks = await response.json();
    const taskList = document.querySelector('#task-list');
    if (taskList.children.length === tasks.length) return;
    for (const task of tasks) {
      const li = document.createElement('li');
      li.innerHTML = `Task: ${task.item} Task_ID: ${task._id}<button class="remove">X</button>`;
      taskList.append(li);
      deleteCallback();
    }
  });
};

const deleteTask = (taskId) => {
  document.querySelector('.remove').addEventListener('click', async (e) => {
    console.log(e.target.parentElement);
  });
};
document.addEventListener('DOMContentLoaded', () => {
  addTask(getInput);
  getTasks(deleteTask);
});
