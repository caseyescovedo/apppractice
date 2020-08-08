function retrieve() {
  fetch('/getAllTasks')
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('task-list').innerHTML = '';
      data.forEach((el) => {
        const li = document.createElement('li');
        const task = document.createTextNode(el.item);

        const delBtn = document.createElement('button');
        delBtn.setAttribute('class', 'remove');
        delBtn.setAttribute('id', el._id);
        delBtn.innerText = 'X';
        delBtn.addEventListener('click', delTask);

        li.appendChild(task);
        li.appendChild(delBtn);

        document.getElementById('task-list').appendChild(li);
      });
    })
    .catch((err) => console.log('err at retrieve', err));
}

function delTask(e) {
  const id = e.target.id;
  const temp = document.getElementById(`${id}`);
  temp.parentNode.parentNode.removeChild(temp.parentNode);
  fetch(`/deleteTask/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).catch((err) => console.log('err at delTask:', err));
}

function postTask(e) {
  const task = document.getElementById('task').value;
  fetch('/postTask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  }).catch((err) => console.log('err at postTask:', err));
}

window.onload = (event) => {
  document.getElementById('retrieve').addEventListener('click', retrieve);
  document.getElementById('task-button').addEventListener('click', postTask);
};
