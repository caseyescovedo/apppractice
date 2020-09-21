// declare constants for frequently manipulated elements
const taskInput = grab('task');
const addTaskButton = grab('task-button');
const getTasksButton = grab('retrieve');
const taskList = grab('task-list');

getTasksButton.addEventListener('click', () => getAndDisplay());
addTaskButton.addEventListener('click', () => addTask());

// functionality
// grab element by id
function grab(string) {
  return document.getElementById(string);
}

// send credentials to server for auth
function sendCredentials() {
  const username = usernameInput.value;
  const password = passwordInput.value;
  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: username, pass: password }),
  };
  fetch('/secret', reqObj).catch(
    (err) => (document.innerHTML = `<p>${err}</p>`)
  );
}
// get and display all tasks in db
function getAndDisplay() {
  fetch('/secret/all')
    .then((data) => data.json())
    .then((todos) => appendAllTodos(todos))
    .catch((err) => (taskList.innerHTML = `<p>${err}</p>`));
}

//append all todoItems to taskList
function appendAllTodos(list) {
  taskList.innerHTML = '';
  for (let el of list) {
    taskList.appendChild(createTodo(el));
  }
}

//create a todoItem comprising <li><div><h1>item
function createTodo(item) {
  const todoElement = document.createElement('li');
  const todoBox = document.createElement('div');
  todoBox.classList.add('todo-box');
  const todo = document.createElement('h1');
  todo.innerText = item.item;
  //create delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.classList.add('remove');
  deleteButton.addEventListener('click', () => deleteTask(item.id));
  todoBox.appendChild(todo);
  todoBox.appendChild(deleteButton);
  todoElement.appendChild(todoBox);
  todoElement.setAttribute('id', `todoItem${item.id}`);
  return todoElement;
}

function addTask() {
  const input = taskInput.value;
  taskInput.value = '';
  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item: input }),
  };
  fetch(`/secret`, reqObj)
    .then((data) => data.json())
    .then((createdItem) => taskList.appendChild(createTodo(createdItem)))
    .catch((err) => (taskList.innerHTML = `<p>${err}</p>`));
}

function deleteTask(id) {
  const itemToDelete = document.getElementById(`todoItem${id}`);
  itemToDelete.remove();
  const reqObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  };
  fetch(`/secret`, reqObj).catch(
    (err) => (taskList.innerHTML = `<p>${err}</p>`)
  );
}
