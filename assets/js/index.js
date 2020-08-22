// const userInput = document.querySelector('#user');
// const passInput = document.querySelector('#pass');
// const submitButton = document.querySelector('#submit');

// submitButton.onclick = () => {
//   const username = userInput.value;
//   const password = passInput.value;
//   console.log(username, password);
// };
// const form = document.querySelector('#signin');
handleSubmit = () => {
  const username = document.getElementById('user').value;
  const password = document.getElementById('pass').value;
  const data = {
    username,
    password,
  };
  console.log(username, password);
  console.log(data);

  fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const listHead = document.querySelector('#task-list');
const input = document.querySelector('#task');
const addButton = document.querySelector('#task-button');
const retrieveButton = document.querySelector('#retrieve');

const currentUsername = 'Bonjay';

let toDoItemObj = {};

retrieveButton.onclick = () => {
  fetch(`/getTasks/${currentUsername}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('fetched data is: ', data);
      // toDoItemArr = data.todo; // store the data to global variable for future use when sending patch request
      data.forEach((item) => {
        if (!toDoItemObj[item._id]) {
          toDoItemObj[item._id] = true;
          printItemOut(item.title, item._id);
        }
      });
      console.log('toDoItemObj is: ', toDoItemObj);
    });
};

addButton.onclick = () => {
  const newItemName = input.value;
  addNewItem(newItemName);

  input.value = '';
  input.focus();
};

// --------helper function below-------- //
function printItemOut(itemName, itemId) {
  // create new todo item on page with delete button
  const newTodo = document.createElement('li');
  newTodo.setAttribute('id', `${itemId}`);
  const newTodoText = document.createElement('span');
  const newListButton = document.createElement('button');
  newListButton.setAttribute('class', 'remove');
  newListButton.setAttribute('id', `${itemId}-btn`);

  newTodo.appendChild(newTodoText);
  newTodoText.textContent = itemName;
  newTodo.appendChild(newListButton);
  newListButton.textContent = 'X';
  // asign the handleDelete function to the button
  newListButton.onclick = handleDelete;

  // append the completedli to listHead
  listHead.appendChild(newTodo);
}

function addNewItem(itemName) {
  fetch('/postTask', {
    method: 'POST',
    body: JSON.stringify({ username: `${currentUsername}`, task: itemName }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('data for adding item is: ', data);
      printItemOut(itemName, data.itemId);
      toDoItemObj[data.itemId] = true;
      console.log('toDoItemObj after add', toDoItemObj);
    });
}

function handleDelete(event) {
  // console.log(event.target.id);
  const listId = event.target.id.split('-')[0];
  console.log('listId is: ', listId);
  // const selector = `#${listId}`;
  // console.log('selector is: ', selector);
  // const itemToRemove = document.querySelector(selector);
  const itemToRemove = document.getElementById(listId);
  listHead.removeChild(itemToRemove);
  delete toDoItemObj[listId];
  console.log('toDoItemObj after delete', toDoItemObj);

  fetch(`/deleteTask/${currentUsername}/${listId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    console.log('response from patch request (for delete app) is: ', response);

    // if there's an error don't append new item to the document
  });
}
