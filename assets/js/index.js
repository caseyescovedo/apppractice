function returnCookie(cookieName) {
  const ths = cookieName + '=';
  const allThs = document.cookie.split(';');
  for (let ii = 0; ii < allThs.length; ii++) {
    let temp = allThs[ii].trim();
    if (temp.indexOf(ths) == 0) return temp.substring(ths.length, temp.length);
  }
  return null;
}

function validatePage() {
  let postTasks = document.getElementById('task-button');
  let fetchTasks = document.getElementById('retrieve');

  postTasks.addEventListener('click', async function (evt) {
    evt.preventDefault();
    const taskDescription = document.getElementById('task').value;
    // console.log('Go Create a Task :: ', taskDescription);
    await addTasks(taskDescription);
  });

  fetchTasks.addEventListener('click', async function (evt) {
    evt.preventDefault();
    await apiFetchTasks();
  });

  (async function () {
    await apiFetchTasks();
  })();
}

async function removeTaskEvent(taskId) {
  await removeTask(taskId);
}

async function apiFetchTasks() {
  fetch('/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${returnCookie('token')}`,
    },
  })
    .then((res) => res.json())
    .then(renderTasks)
    .catch(console.log);
}

async function addTasks(item) {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${returnCookie('token')}`,
    },
    body: JSON.stringify({ item }),
  })
    .then((res) => res.json())
    .then(renderTasks)
    .catch(console.log);
}

async function removeTask(id) {
  fetch(`/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${returnCookie('token')}`,
    },
  })
    .then((res) => res.json())
    .then(renderTasks)
    .catch(console.log);
}

function renderTasks(resp) {
  let taskBoard = document.getElementById('task-list');
  let htmlfragments = '';
  if (resp && resp.tasks && Array.isArray(resp.tasks)) {
    resp.tasks.forEach((tsk) => {
      htmlfragments += `<li>${tsk.item} <button class="remove" onclick="removeTaskEvent('${tsk._id}')"> X </button></li>`;
    });
  }
  const taskDescription = document.getElementById('task');
  taskDescription.value = '';
  taskBoard.innerHTML = htmlfragments;
}
