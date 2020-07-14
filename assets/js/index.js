const postTask = () => {
  const taskItemValue = document.querySelector('#task').value;
  if (taskItemValue.length === 0) {
    const message = document.querySelector('#message');
    message.innerHTML = `<p>Error: task cannot be blank</p>`;
    return undefined;
  }
  const taskItem = { item: taskItemValue };
  fetch('/posttask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskItem),
  })
    .then((resp) => resp.json())
    .then(({ taskCreated }) => {
      const message = document.querySelector('#message');
      message.innerHTML = `<p>Task Created: ${taskCreated}</p>`;
      const input = document.querySelector('#task');
      input.value = '';
    })
    .catch((err) => console.log(err));
};

const getTasks = () => {
  fetch('/gettasks')
    .then((resp) => resp.json())
    .then(({ tasks }) => {
      const taskArray = tasks.map(({ item, _id, created_at }) => `<li id="${_id}">${item} <button onclick="deleteTask(this)">X</button></li>`);
      const taskList = document.querySelector('#task-list');
      taskList.innerHTML = taskArray.join('');
    })
    .catch((err) => console.log(err));
};

const deleteTask = (item) => {
  const taskId = item.parentNode.id;
  const taskItem = { taskId };
  fetch('/deletetask', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskItem),
  })
    .then((resp) => resp.json())
    .then(({ taskDeleted, deletedId }) => {
      if (!taskDeleted) {
        const message = document.querySelector('#message');
        message.innerHTML = '<p>Error deleting task.</p>';
      }
      const deletedTask = document.querySelector(`#${CSS.escape(deletedId)}`);
      deletedTask.parentNode.removeChild(deletedTask);
    })
    .catch((err) => console.log(err));
}