//ul element in DOM
const ul = document.getElementById('task-list');

//create li elements for ul
const taskItem = (task) => {
  //create li element, set innertText and id -> to identify deletion
  const li = document.createElement('li');
  li.innerText = task.item;
  li.id = task._id;
  
  //create button for deletion of li
  const btn = document.createElement('button');
  btn.className = 'remove';
  btn.innerHTML = 'X';

  //event listener to delete task from db and from DOM
  btn.addEventListener('click', e => {
    e.preventDefault();
    fetch(`/task/${li.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      ul.removeChild(li);
    })
    .catch(err => console.log('error in delete', err))
  })

  //append btn to li
  li.append(btn);

  return li;
}

//get ALL tasks from db
const getTasks = (e) => {
  //reset the ul
  ul.innerHTML = '';

  //retrieve all tasks from db
  fetch('/task')
    .then(res => res.json())
    .then(data => {
      data.forEach( task => {
        ul.append(taskItem(task));
      })
    })
    .catch(err => console.log('error in tasks fetch', err));
}

//attach getTasks to retrieve button
const retrievebtn = document.getElementById('retrieve');
retrievebtn.addEventListener('click', getTasks);

//input text box
const inputTask = document.getElementById('task');

//post task to DB and DOM
const postTask = (e) => {
  e.preventDefault();
  //select input text box

  //create body object
  const body = { item: inputTask.value };

  //post request to add task to db
  fetch('/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(data => {
    ul.append(taskItem(data));
    inputTask.value = '';
  })
  .catch(err => console.log('error in postTask', err))
}

//attach postTask to addTask button
const addTask = document.getElementById('task-button');
addTask.addEventListener('click', postTask);

//BONUS: pressing enter in textbox will post task
inputTask.addEventListener('keypress', e => {
  if (e.key === 'Enter') postTask(e);
});

