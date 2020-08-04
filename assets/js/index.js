// Don't know everything going on here...running out of time

const getTasks = () => {
  fetch('/secret')
    .then((resp) => resp.json())
    .then((tasks) => {
      const list = document.getElementById('list');
      tasks.forEach((task) => {
        const newLi = document.createElement('li');
        newLi.innerText = task.item;
        newLi.id = task.item_id;
        newLi.created_at = task.created_at;
        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.addEventListener('click', () => {
          fetch(`/secrets/${item_id}`, {
            method: 'Delete',
          })
            .then((resp) => resp.json())
            .then((reminder) => {
              document.getElementById('list').removeChild(newLi);
            })
            .catch((er) => console.log('ERROR IN getTask in index.js: ', err));
        });
        newLi.appendChild(button);
        list.appendChild(newLi);
      });
    });
};

getTasks();

const addTask = (task) => {
  const newLi = document.createElement('li');
  newLi.innerText = task.item;
  newLi.id = task.item_id;
  newLi.created_at = task.created_at;
  const button = document.createElement('button');
  button.innerText = 'Delete';
  button.addEventListener('click', () => {
    fetch(`/secret/${item_id}`, {
      method: 'Delete',
    })
      .then((resp) => resp.json())
      .then(() => {
        document.getElementById('list'.removeChild(newLi));
      })
      .catch((err) => console.log(`ERROR in addTask in index.js: `, err));
  });
  newLi.appendChild(button);
  list.appendChild(newLi);
};

document.getElementById('refresh').addEventListener('click', getTasks);

document.getElementById('taskInput').addEventListener('submit', (e) => {
  e.preventDefault();

  const taskTextInput = document.getElementById('taskTest');

  const body = {
    text: taskTextInput.value,
  };

  fetch('/secret', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((reminder) => {
      addItem(task);
    })
    .catch((err) => console.log(`ERROR IN POST METHOD in index.js: `, err));
});
