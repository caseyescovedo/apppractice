const getItems = () => {
  fetch('/secret/tasks')
    // parse response from json to js
    .then((res) => res.json())
    .then((itemsArray) => {
      // const list = document.getElementById('task-list');
      addItem(itemsArray);
    })
}

// display/refresh all items
getItems();

// for each itemObj, we will render the displayed item name and a button to delete the item 
const addItem = (itemsArray) => {
  const list = document.getElementById('task-list');
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
      deleteItem(itemObj._id);
      // getItems();
    })
    newLi.appendChild(button);
    list.appendChild(newLi);
  })
};

const deleteItem = (itemId) => {
  fetch(`tasks/${itemId}`, {
    method: 'Delete'
  })
    .then((res) => res.json())
    .then(data => {
      document.getElementById('task-list').removeChild(newLi)
    })
    .catch((err) => console.log(err));
};

// const retrieve = document.getElementById('retrieve');

// retrieve.addEventListener('click', () => {
//   getItems();
// })