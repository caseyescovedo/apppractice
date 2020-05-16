
////////////////////////////////////////////
// Functions to handle onclicks in secret.html
////////////////////////////////////////////

// when button is clicked, get all tasks from database
const getTasks = (e) => {
  const user = 'Kim';

  // make request to database for all tasks associated with a particular username 
  // hard code username for now, before authentication is set
  // fetch info from server 
  fetch(`/tasks/get/${user}`) 
    .then((res) => res.json())
    .then((data) => {
      const returnedItems = data;
      const taskBox = document.querySelector('#task-list');

      // don't display items if items have already been displayed
      if (!taskBox.childNodes.length) {
        // DOM manipulation
        // for each task returned, in #task-list add a new list item 
        // item should display task item, followed by a button (inside list item)
        returnedItems.forEach((task) => {
          let node = document.createElement('li');
          node.innerHTML = `${task.item} <button class="remove" onclick="removeTask();"> X </button>`;
          taskBox.appendChild(node);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add task to database
const addTask = () => {
  const user = 'Kim';
  const addButton = document.querySelector('#task-button');
  addButton.addEventListener('click', () => {
    const newTask = event.target.parentNode.querySelector('#task').value;
    event.target.parentNode.querySelector('#task').value = null;
  
    if (newTask !== '') {
      fetch('/tasks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newItem: newTask,
          user: user,
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          const taskBox = document.querySelector('#task-list');
          let node = document.createElement('li');
          node.innerHTML = `${data.item} <button class="remove" onclick="removeTask();"> X </button>`;
          taskBox.appendChild(node);

        })
        .catch((err) => console.log(err));
    }
  });
}

const removeTask = (e) => {
  const container = document.querySelector('#task-list');

  container.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }
    // console.log(event.target.parentNode.textContent);
    let itemToBeDeleted = event.target.parentNode.innerText;
    itemToBeDeleted = itemToBeDeleted.split("\n")
    itemToBeDeleted.pop();
    itemToBeDeleted = itemToBeDeleted.join(" ");
    // remove item from DOM
    event.target.parentNode.remove();
    
    // request to database to remove from database
    fetch('/tasks/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: itemToBeDeleted,
        user: 'Kim',
      })
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));

  })

  // const removeBtn = document.querySelectorAll('.remove')
  // removeBtn.addEventListener('click', () => {
  //   console.log(event.target);
  // })
};