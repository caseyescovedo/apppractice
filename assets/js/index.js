/**
 * Gets all the tasks in the database and displays them on the page with a button to remove
 */
const getTasks = () => {
  let list = document.getElementById('task-list');
  console.log(list);
  // clear out the list every time
  fetch('/tasks')
    .then((response) => response.json())
    .then((items) => {
      items.forEach((task) => {
        // create a button
        const button = document.createElement('button');
        button.innerHTML = 'X';
        button.id = task.id;
        button.className = 'remove';
        button.onclick = deleteTask(button.id);

        const newItem = document.createElement('li');
        newItem.innerText = task.item;
        newItem.id = task.id;

        newItem.appendChild(button);
        // add our item to the list
        list.appendChild(newItem);
      });
    })
    .catch((err) => console.log(err));
  // loop through the fetch response and set inner html for each item
};

const postTasks = () => {};

const deleteTask = (id) => {
  // send a fetch with request type delete
  fetch(`/tasks/${id}`, {
    method: 'delete',
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

getTasks();
