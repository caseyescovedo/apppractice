// const getTasks = () => {
//   fetch('/get')
//     .then((res) => res.json())
//     .then((tasks) => {
//       const list = document.getElementById('task-list');
//       list.innerHTML = '';
//       // create task list
//       tasks.forEach((task) => {
//         const singleTask = document.createElement('li');
//         singleTask.id = task._id;
//         singleTask.innerText = task.item;

//         // create delete button
//         const button = document.createElement('button');
//         button.innerText = 'X';
//         button.className = 'remove';
//         button.addEventListener('click', () => {
//           console.log(task._id);
//           fetch(`/delete/${task._id}`, {
//             method: 'Delete',
//           })
//             .then((res) => res.json())
//             .then(() => {
//               document.getElementById('task-list').removeChild(singleTask);
//             })
//             .catch((err) => console.log(err));
//         });
//         singleTask.appendChild(button);
//         list.appendChild(singleTask);
//       });
//     });
// };
// // a by-default load - comment out if need to leave blank at page load
// getTasks();
// // link up get tasks button
// const getTaskButton = document.getElementById('retrieve');
// getTaskButton.addEventListener('click', getTasks);

// // activate form entry and submit
// const addTaskButton = document.getElementById('task-button');
// addTaskButton.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const inputField = document.getElementById('task');
//   const body = { item: inputField.value };

//   fetch('/post', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       getTasks();
//       console.log('added task');
//     })
//     .catch((err) => console.log(err));
// });

const getTasks = () => {
  fetch('/get')
    .then((res) => res.json())
    .then((tasks) => {
      const list = document.getElementById('task-list');
      list.innerHTML = '';
      // create task list
      tasks.forEach((task) => {
        addTask(task);
      });
    });
};
// a by-default load - comment out if need to leave blank at page load
getTasks();

const addTask = (task) => {
  const singleTask = document.createElement('li');
  singleTask.id = task._id;
  singleTask.innerText = task.item;
  const list = document.getElementById('task-list');
  // create delete button
  const button = document.createElement('button');
  button.innerText = 'X';
  button.className = 'remove';
  button.addEventListener('click', () => {
    console.log(task._id);
    fetch(`/delete/${task._id}`, {
      method: 'Delete',
    })
      .then((res) => res.json())
      .then(() => {
        document.getElementById('task-list').removeChild(singleTask);
      })
      .catch((err) => console.log(err));
  });
  singleTask.appendChild(button);
  list.appendChild(singleTask);
};

// link up get tasks button
const getTaskButton = document.getElementById('retrieve');
getTaskButton.addEventListener('click', getTasks);

// activate form entry and submit
const addTaskButton = document.getElementById('task-button');
const addTaskForm = document.forms['task-submission'];
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = addTaskForm.querySelector('input[type="text"]').value;
  console.log(value);

  const inputField = document.getElementById('task');
  const inputBody = { item: inputField.value };

  fetch('/post', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(inputBody),
  })
    .then((res) => res.json())
    .then((task) => {
      //console.log();
      addTask(task);
      //console.log('added task');
    })
    .catch((err) => console.log(err));
});
