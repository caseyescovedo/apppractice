const getButton = document.getElementById('retrieve');
getButton.addEventListener('click', getTasks);

const addButton = document.getElementById('task-button');
addButton.addEventListener('click', addTask);

const todoItems = [];

function getTasks() {
  fetch('/tasks/')
    .then((data) => data.json())
    .then((tasks) => {
      createList(tasks);
    });
}

function createList(array) {
  array.forEach((el) => todoItems.push(el));
  const taskList = document.getElementById('task-list');
  Array.from(taskList.children).forEach((li) => li.remove());
  todoItems.forEach((el) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.addEventListener('click', removeTask);
    button.innerHTML = 'x';
    button.setAttribute('class', 'remove');
    button.setAttribute('id', el._id);
    li.innerText = el.item;
    li.append(button);
    taskList.append(li);
  });
  todoItems.length = 0;
}

function addTask() {
  const text = {
    item: document.getElementById('task').value,
  };
  fetch('/tasks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(text),
  })
    .then(() => getTasks())
    .catch((err) => console.log(err));
}

function removeTask(e) {
  const id = e.target.id;
  fetch(`/tasks/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (res.status === 200) getTasks();
      else console.log(`error: ${res.status}, item not deleted`);
    })
    .catch((err) => console.log(err));
}
