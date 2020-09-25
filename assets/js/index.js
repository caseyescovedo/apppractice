/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

//! i am getting 'cannot read property of 'addEventListener' of null.. i tried putting at end of body but only solution I could find was doing if statement below
// i seem to be stuck on accessing the task-list button and trying to add the event listener to it
const tasksList = document.getElementById('task-list');
if (tasksList) {
  tasksList.addEventListener('click', () => {
    console.log('gettask button was clicked');
  });
}
tasksList.appendChild(tasks);

function getAllTasks() {
  fetch('/api')
    .then((resp) => resp.json())
    .then((data) => {
      tasksList.innerHTML = '';
      for (const el of data.rows) {
        const div = document.createElement('div');
        for (const key in el) {
          const innerP = document.createElement('p');
          innerP.innerText = el[key];
          div.appendChild(innerP);
        }
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', (event) => deleteItem(el._id));
        div.appendChild(deleteButton);
        tasksList.appendChild(div);
      }
    })
    .catch((err) => console.log(err));
}
