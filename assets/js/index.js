class Task {
  constructor(text, created_at) {
    this.text = text;
    this.created_at = created_at;
  }
};

class doThis {
  static clearTasks() {
    const taskList = document.querySelector('#task-list');
    while (taskList.firstChild) {
      taskList.removeChild(taskList.lastChild);
    }
  };
  
  static getTasks() {
    const taskList = [];
    fetch('/tasks')
      .then(response => response.json())
      .then(parsedResp => {
        parsedResp.forEach((task) => {
          taskList.push(new Task(task.item, task.created_at));
        });
        doThis.clearTasks();
        taskList.forEach((task) => doThis.displayTask(task));
      });
  };

  static displayTask(task) {
    const list = document.querySelector('#task-list');
    const li = document.createElement('li');
    li.id = `${task.created_at}`;
    li.innerHTML = `
      ${task.text}
      <button class="remove" onclick="(e) => doThis.deleteTask(e)">X</button>`;
    
    list.appendChild(li);
  }

  static addTask() {
    const textBar = document.querySelector('#task');
    const item = textBar.value;
    textBar.value = '';
    const created_at = new Date().toLocaleTimeString();
    const reqBody = { item, created_at }
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody),
    };
    fetch('/tasks', postOptions)
      .then(() => {
        doThis.clearTasks();
        doThis.getTasks();
      });
  };

  static deleteTask(e) {
    const reqBody = { created_at: e.target.parentElement.id };
    const postOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody),
    }
    fetch('/tasks', postOptions)
      .then(() => {
        doThis.clearTasks();
        doThis.getTasks();
      });
  }
};

document.addEventListener('DOMContentLoaded', doThis.getTasks);
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    document.querySelector('#task-list').addEventListener('click', (e) => doThis.deleteTask(e));
  }
};
