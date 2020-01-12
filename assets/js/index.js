// Towards the end I started creating the Todo List with vanilla JS

const list = document.querySelector('ul');

const itemsList = [
  'Binary',
  'Search',
  'Tree',
];

function createTitle() {
  const title = document.createElement('h1');
  title.innerText = 'Todo List';
  document.body.prepend(title);
}

function createList(data) {
  data.forEach((item) => {
    const listItem = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    listItem.innerText = item;
    list.appendChild(listItem);
    listItem.appendChild(deleteBtn);
  });
}

// I wasn't able to connect index.js
// fetch('/secret/getTask')
//   .then(resp => resp.json())
//   .then(data => createList(data))


createList(itemsList);
createTitle();
