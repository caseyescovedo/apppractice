const getTasks = () => {
  fetch(`/tasks/getTasks`)
    .then(res => res.json())
    .then(tasks => {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';
      tasks.forEach(task => {
        postTasksToDOM(task)
        console.log('Posted task to DOM: ', task)
      }) 
    })
    .catch(err => console.log('Error inside of getTasks of index.js: ', err));
}

getTasks();


document.getElementById('remove').addEventListener('click', getTasks);

document.getElementById('task-button').addEventListener('click', e => {
  e.preventDefault();
  const taskTextInput = document.getElementById('task');
  const body = {
    task: taskTextInput.value,
  }
  fetch('/secret', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(tasks => {
    task = '';
    postTasksToDOM(tasks);
  })
  .catch(err => console.log('This is an error from POST: ', err));
})

const postTasksToDOM = (tasks) => {
  const newList = document.createElement('li');
  newList.innerText = tasks.item;
  newList.id = tasks._id;
  const button = document.createElement('button');
  button.innerText = 'X';
  button.addEventListener('click', () => {
    fetch(`/secret/${tasks._id}`, {
      method: 'DELETE',
    })
    .then(task => {
      console.log(task);
      document.getElementsByClassName('task-list').removeChild(newList);
    })
    .catch(err => console.log('This is an error during DELETE: ', err));
  })
  newList.appendChild(button);
  document.getElementsByClassName('task-list').appendChild(newList);
}