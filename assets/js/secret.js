const addTask = document.getElementById('task-button');
const getTask = document.getElementById('retrieve');
const remove = document.getElementsByClassName("remove");


addTask.addEventListener('click', () => {
  const task = document.getElementById('task').value;
  const body = {
    name: task,
  };
  console.log(task);
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((resp) => {
      console.log(resp);
      const list = document.getElementById('task-list');
      const newLi = document.createElement('li');
      newLi.innerHTML = task;
      const button = document.createElement('button');
      button.className = 'remove';
      button.innerHTML = 'X';
      newLi.append(button);
      list.appendChild(newLi);
    })
    .catch((err) => console.log(err));
});

getTask.addEventListener('click', () => {
  fetch('/tasks')
    .then((resp) => resp.json())
    .then((tasks) => {
      // console.log(tasks);
      tasks.forEach((task) => {
        const newLi = document.createElement('li');
        newLi.innerText = task.item;
        document.getElementById('task-list').appendChild(newLi);
      });
    })
    .catch((err) => console.log('Error during get: ', err));
});

remove.addEventListener('click', () => {
  const x = remove.parentElement();
  const body = {
    name: x.value
  }
  fetch('/tasks', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

});
