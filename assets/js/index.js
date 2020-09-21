// const body = document.querySelector('body');
// const body = document.body

const task_list = document.getElementById('task-list');
const retrieve = document.getElementById('retrieve');
retrieve.addEventListener('click', () => {
  task_list.innerHTML = '';
  fetch('/secrets/get')
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const div = document.createElement('div');
        const list = document.createElement('li');
        list.innerText = `ID: ${data[i]['_id']} Item: ${data[i]['item']} Created: ${data[i]['created_at']}`;
        const button = document.createElement('button');
        button.innerHTML = 'X';
        button.onclick = function onClick() {
          let id = data[i]['_id'];
          fetch('/secrets/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          }).then((data) => {
            fetch('/secrets/get'); // not sure why this doesn't automatically refresh the list?
          });
        };
        list.appendChild(button);
        div.appendChild(list);
        task_list.appendChild(div);
      }
    });
});

function post() {
  let variable = document.getElementById('task').value;
  fetch('/secrets/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ variable }),
  });
}
