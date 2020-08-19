
// const getButton = document.getElementById('retrieve');

const createDiv = document.getElementById('create');

document.body.addEventListener('click', (e) => {
  if (e.target.id === 'retrieve') {
    fetch('/task')
      .then((res) => res.json())
      .then((data) => {
        const taskList = document.getElementById('task-list');
        data.forEach((chunk) => {
          const { _id } = chunk;
          if (!document.getElementById(_id)) {
            const listItem = document.createElement('li');
            listItem.id = chunk._id;
            listItem.innerText = chunk.item;

            const button = document.createElement('button');
            button.className = 'remove';
            button.id = chunk._id;
            button.innerText = 'X';

            listItem.appendChild(button);
            taskList.appendChild(listItem);
          }
        });
      }).catch((err) => console.log(err));
  }

  if (e.target.id === 'task-button') {
    const task = document.getElementById('task').value;
    console.log(task);

    fetch('/task', {
      method: 'POST',
      body: JSON.stringify({ item: task }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
      .then(console.log)
      .catch((err) => console.log(err));
  }

  if (e.target.className === 'remove') {
    const target = document.getElementById(e.target.id);
    console.log('event is firing', e);
    fetch('/task', {
      method: 'DELETE',
      body: JSON.stringify({ id: e.target.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      target.remove();
    }).catch((err) => console.log(err));
  }
});
