const getItems = () => {
  // fetch request to GET all items
  fetch('/secret/tasks')
    // parse response from json to js
    .then((res) => res.json())
    // create items after receiving itemsArray back from db
    .then((itemsArray) => {
      const list = document.getElementById('task-list');
      list.innerHTML = '';
      addItem(itemsArray, list);
    })
    // add event listener to Get Tasks button; event listener should invoke getItems again
    // 
    .then(() => {
      const retrieve = document.getElementById('retrieve');
      retrieve.addEventListener('click', getItems)

      const taskInput = document.getElementById('task')
      console.log('taskInput', taskInput);

      const taskButton = document.getElementById('task-button');
      console.log('taskButton', taskButton);

      console.log('taskInput.value', taskInput.value);

      // Add Task Button: make a POST request
      taskButton.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('hello');


        // const body = {
        //   text: taskInput.value
        // }

        // fetch('/secret/tasks', {
        //   method: 'POST',
        //   header: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(body)
        // })
        //   .then(task => {
        //     addItem(task)
        //   })
        //   .catch((err) => console.log(err))
      })

    })

}
window.onload = function () {
  const signInButton = document.getElementById('signin')

  console.log('signInButton', signInButton);

  signInButton.addEventListener('click', signIn);

  const signIn = () => {
    fetch('/sign-in')
  }

  // display/refresh all items
  getItems();
}


// for each itemObj, we will render the displayed item name and a button to delete the item 
const addItem = (itemsArray, list) => {
  // const list = document.getElementById('task-list');
  itemsArray.forEach(itemObj => {
    // create a new <li> for every itemObj 
    const newLi = document.createElement('li');
    // display respective item name for each <li>
    newLi.innerText = itemObj.item;
    // assign respective id for each <li>
    newLi.id = itemObj._id;
    // 
    const button = document.createElement('button');
    button.innerText = 'X';
    button.className = 'Remove';
    button.addEventListener('click', () => {
      deleteItem(itemObj._id, newLi);
      // getItems();
    })
    newLi.appendChild(button);
    list.appendChild(newLi);
  })
};

const deleteItem = (itemId, newLi) => {
  fetch(`tasks/${itemId}`, {
    method: 'Delete'
  })
    .then((res) => res.json())
    .then(data => {
      document.getElementById('task-list').removeChild(newLi)
    })
    .catch((err) => console.log(err));
};


// // Add Task Button: make a POST request
// document.getElementById('task').addEventListener('submit', (e) => {
//   e.preventDefault();

//   const taskInput = document.getElementById('task');

//   const body = {
//     text: taskInput.value
//   }

//   fetch('/secret/tasks', {
//     method: 'POST',
//     header: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   })
//     .then(task => {
//       addItem(task)
//     })
//     .catch((err) => console.log(err))
// })

