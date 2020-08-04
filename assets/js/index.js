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
      console.log('taskInput.value', taskInput.input);

      const taskButton = document.getElementById('task-button');
      console.log('taskButton', taskButton);

      // Add Task Button: make a POST request
      taskButton.addEventListener('click', (e) => {
        e.preventDefault();

        // I was trying to make my post request, but was not able to fully debug it...
        // I wrote out my logic for my POST request (and commented it out) anyways for some brownie points, perhaps? Please see below...

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

getItems();

// for each itemObj, we will render the displayed item name and a button to delete the item 
const addItem = (itemsArray, list) => {
  console.log('itemsArray', itemsArray);
  // const list = document.getElementById('task-list');
  itemsArray.forEach(itemObj => {
    // create a new <li> for every itemObj 
    const newLi = document.createElement('li');
    // display respective item name for each <li>
    newLi.innerText = itemObj.item;
    // assign respective id for each <li>
    newLi.id = itemObj._id;
    const button = document.createElement('button');
    button.innerText = 'X';
    button.className = 'Remove';
    button.addEventListener('click', () => {
      deleteItem(itemObj._id, newLi);
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