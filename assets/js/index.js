// button clicked get all tasks in the DB and display via the #task-list element.

// In each "li" we will need a delete button on them to and have the class remove ` class="remove" ` and display and X inside it
// ex. <li>Go shopping <button class="remove">X</button></li>
// add task button will add the task entered in the field to the DB
// once the task has been submitted it should immediately re-render
// render once the task items and not re-render them

const tasksGetter = document.getElementById('retrieve');

tasksGetter.addEventListener('click', () => {
  console.log('clicked');
});

// window.addEventListener('load', () => getTasksFromDB());

// const input = document.querySelector('input');
// const button = document.querySelector('button');

// tasksGetter.addEventListener('click', () => {
//   console.log('clicked!');
//   const inputTask = input.value;
//   const sendPostTask = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       task: inputTask,
//       created_at: 'today',
//     }),
//   };
//   fetch('/secret', sendPostTask)
//     .then((resp) => resp.json())
//     .then((data) => console.log(data))
//     .then(() => getTasksFromDB())
//     .catch((err) => console.log(err));
// });
