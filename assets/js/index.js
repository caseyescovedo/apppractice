// Event listener to /getTasks
const getTasks = document.getElementById('retrieve');
const list = document.querySelector('#task-list');
const addTaskButton = document.querySelector('#task-button');



const postTask = async (e) => {
  // console.log(e)
  const value = document.querySelector('#task').value;
  await fetch('http://localhost:3333/postTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item: value }),
  });
  getTasksFunc();
};

const getTasksFunc = async (e) => {
  list.innerHTML = '';
  const res = await fetch('http://localhost:3333/getTasks');
  const tasks = await res.json();
  tasks.forEach((entry) => {
    const newTask = document.createElement('li');
    const newButton = document.createElement('button');
    newButton.textContent = 'X';
    newButton.addEventListener('click', deleteTask);
    newTask.textContent = entry.item;
    newTask.id = entry._id;
    newTask.appendChild(newButton);
    list.appendChild(newTask);
  });
}

const deleteTask = async (e) => {
  const listItem = e.target.parentNode;
  await fetch('http://localhost:3333/deleteTask', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: listItem.id}),
  });
  listItem.remove();
};


getTasks.addEventListener('click', getTasksFunc);
addTaskButton.addEventListener('click', postTask);

