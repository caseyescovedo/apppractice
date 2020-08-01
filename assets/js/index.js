const getButton = document.getElementById('retrieve');
getButton.addEventListener('click', getTasks);

const todoItems = [];

function getTasks() {
  console.log('works');
  fetch('/tasks/')
    .then((data) => data.json())
    .then((tasks) => {
      //   console.log(tasks);
      createList(tasks);
    });
}

function createList(array) {
  array.forEach((el) => todoItems.push(el.item));
  const taskList = document.getElementById('task-list');
  Array.from(taskList.children).forEach((li) => li.remove());
  todoItems.forEach((el) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.innerHTML = 'x';
    button.setAttribute('class', 'remove');
    li.innerText = el;
    li.append(button);
    taskList.append(li);
  });
  todoItems.length = 0;
}
