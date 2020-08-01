
//click get task to get task



const ul = document.getElementById('task-list')



const taskItem = (task) => {
  const li = document.createElement('li');
  li.innerText = task.item
  li.id = task._id;
  const btn = document.createElement('button');
  btn.className = 'remove';
  btn.innerHTML = 'X';
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
  li.append(btn);
  return li;
}

const getTasks = (e) => {
  ul.innerHTML = '';
  fetch('/task')
    .then(res => res.json())
    .then(data => {
      data.forEach( task => {
        ul.append(taskItem(task))
      })
    })
    .catch(err => console.log('error in tasks fetch', err));
}

const retrievebtn = document.getElementById('retrieve');
retrievebtn.addEventListener('click', getTasks)

//select text box
const postTask = (e) => {
  e.preventDefault();
  const task = document.getElementById('task')
  const body = { item: task.value }
  fetch('/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(data => {
    ul.append(taskItem(data))
    task.value = '';
  })
  .catch(err => console.log('error in postTask', err))
}

const addTask = document.getElementById('task-button');
console.log(addTask)
addTask.addEventListener('click', postTask);


// getTasks();
// retrieve.addEventListener('click', (e) => {
//   e.preventDefault();
//   console.log('retrieve clicked')
// })