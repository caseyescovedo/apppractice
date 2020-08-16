

const getTasks = () => {
  fetch('/secret/tasks')
    .then((res) => res.json())
    .then((tasks) => {
      const list = document.getElementById('task-list');
      list.innerHtml = '';
      tasks.forEach(task => {
        addItem(task);
      })
    });
};

const addItem = task => {
  const list = document.getElementById('task-list');
  const li = document.createElement('li');
  li.innerText = task.item;
  li.id = task._id;
  const button = document.createElement('button');
  button.innerText = 'X';
  button.className = 'remove';
  button.addEventListener('click', () => {
    fetch(`/secret/tasks/${task._id}`, {
      method: 'Delete',
    })
      .then(res => res.json())
      .then(() => {
        document.getElementById('task-list').removeChild(li);
      })
      .catch((err) => console.log(err));
  })
  li.appendChild(button);
  list.appendChild(li);
};

getTasks();

// this isn't working; its returning null for some reason, spent too long on it
  // document.getElementById('retrieve').addEventListener('click', getTasks); 

// same here :)
  // document.getElementById('task-button').addEventListener('click', (e) => {
  //   e.preventDefault();

  //   const input = document.getElementById('task');
  //   const body = {
  //     text: input.value
  //   };

  //   fetch('secret/tasks', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   })
  //     .then((res) => res.json())
  //     .then((task) => {
  //       postTask(task)
  //     })
  //     .catch((err) => console.olog(err));
  // }); 