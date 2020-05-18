const addBtn = document.querySelector('#task-selector');
const inputBox = document.querySelector('#task');

inputBox.addEventListener('keypress', addItem);


function addItem(){
  let input = document.querySelector('#task');
  const li = document.createElement('li');
  li.setAttribute('id', input.value);
  li.appendChild(document.createTextNode(input.value));
  const ul = document.querySelector('#task-list');
  ul.appendChild(li);

  input.value = '';
  addToDB();
}

addBtn.addEventListener('click', addItem)


const deleteBtn = document.querySelector('#retrieve');

deleteBtn.addEventListener('click', function deleteItem(){
  const ul = document.querySelector('#task-list');
  const input = document.querySelector('#task');
  const item = document.getElementById(input.value);
  ul.removeChild(item);

  deleteFromDB();
})


const addToDB = () => {
  const FormData = {};
  fetch('http://localhost:3333/secret/', {
    method: 'PUT',
    body: FormData
  })
  .then(res => res.json())
  .then(err => console.log(err))
}

const deleteFromDB = () => {
  const FormData = {};
  fetch('http://localhost:3333/secret/', {
    method: 'DELETE',
    body: FormData
  })
  .then(res => res.json())
  .then(err => console.log(err))
}