const list = document.getElementById('#task-list');
const getTasks = document.getElementById('#retrieve');
getTasks.addEventListener('click', () => {
  getAllItems;
});

list.appendChild(getTasks);

function getAllItems() {
  fetch(`/secret/api`)
    .then((resp) => resp.json())
    .then((data) => {
      list.innerHTML = '';
      console.log(data);
      for (let el of data.rows) {
        const div = document.createElement('div');
        for (let key in el) {
          const innerP = document.createElement('p');
          innerP.innerText = el[key];
          div.appendChild(innerP);
        }
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', (event) =>
          deleteItem(el.task_id)
        );
        div.appendChild(deleteButton);
        list.appendChild(div);
      }
    })
    .catch((err) => console.log(err));
}

const task = document.querySelector('#task-button');
const input = document.querySelector('input');
task.addEventListener('click', () => {
  const message = input.value;
  const post = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: message,
    }),
  };
  fetch('/secret/api', post)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});
