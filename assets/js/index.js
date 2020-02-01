// **** HELPER FUNCTIONS ****
// helper function for appending list item nodes to the dom
function createListItems(items) {
  // find parent node
  const parent = document.querySelector('#task-list');
  // for each task, create a li and a button
  items.forEach((elem) => {
    const task = document.createElement('li');
    const button = document.createElement('button');
    // set inner html to item
    task.innerHTML = elem.item;
    // set id to id
    task.id = elem._id;
    button.class = 'remove';
    button.innerHTML = 'X';
    button.id = elem._id;
    // append button to child and child to parent
    task.appendChild(button);
    parent.appendChild(task);
  });
}


document.addEventListener('DOMContentLoaded', (event) => {
  // variable to keep track of whether the retreive button should fetch data
  let reteriveButtonEnabled = true;

  document.body.addEventListener('click', (event) => {
    // if retrieve button is clicked
    if (event.target.id === 'retrieve' && reteriveButtonEnabled) {
      let tasks;
      // make a fetch request to the backend
      fetch('/tasks')
        .then((res) => res.json())
        .then((res) => {
          tasks = res;
          createListItems(tasks);
        })
        .catch((err) => console.log('there was an error fetching tasks', err));
      reteriveButtonEnabled = false;
    }

    if (event.target.id === 'task-button') {
      // pull value from text input form
      const input = document.querySelector('#task').value;
      // make a fetch request to the backend
      console.log(input);
      fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: input }),
      }).then((res) => res.json())
        .then((res) => {
          createListItems([res]);
        })
        .catch((err) => console.log('there was an error posting task', err));
    }

    if (event.target.class === 'remove') {
        const _id = event.target.id;
        fetch('/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json ' },
        body: JSON.stringify({ _id }),
      }).catch((err) => console.log('there was an error deleting tasks', err));
      const item = document.getElementById(_id);
      item.remove();
    }
  });
});
