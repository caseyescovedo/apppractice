/**
 *
 * ***************** SECRET.HTML ************************
 *
 */

const getTasks = document.getElementById('retrieve');
const list = document.getElementById('task-list');
let calledOnce = false;

// ADDING AN EVENT LISTENER FOR THE GET TASKS BUTTON (LIMIT TO ONE CALL)
getTasks.addEventListener('click', () => {
  if (!calledOnce) {
    calledOnce = true;
    getItems();
  }
});

const mainDiv = document.createElement('div');
mainDiv.setAttribute = ('id', 'main-div');
list.appendChild(mainDiv);

// MODULARIZED FUNCTION TO FETCH DATA FROM OUR DB FOR ALL OUR ITEMS
const getItems = () => {
  fetch('http://localhost:3333/api/getData')
    .then((response) => response.json())
    .then((data) => {
      console.log('ALL ITEMS FROM DB: ', data);
      // ITERATING OVER OUR PARSED PROMISE DATA
      data.forEach((el) => {
        // CREATING A LI ELEMENT PER ELEMENT IN OUR ARRAY
        const eachItem = document.createElement('li');
        eachItem.setAttribute('class', 'list-items');
        eachItem.innerHTML = el.item;
        // APPENDING EACH LIST ITEM TO OUR DIV
        mainDiv.appendChild(eachItem);
        // CREATING A BUTTON FOR EACH LI ELEMENT
        const button = document.createElement('button');
        eachItem.appendChild(button);
        button.setAttribute('class', 'remove');
        button.setAttribute('id', `${el.item}`);
        button.innerText = 'X';
        // ADDING AN EVENT LISTENER TO THE X BUTTON
        // THIS WILL REMOVE OUR ITEM FROM THE DOM AND FROM THE DB
        button.addEventListener('click', (e) => {
          removeItem(e.target.id);
          mainDiv.removeChild(eachItem);
        });
      });
    })
    .catch((err) => console.log('Error in Get Fetch Request: ', err));
};

const addTask = document.getElementById('task-button');
const listItems = document.getElementsByClassName('list-items');

// ADDING AN EVENT LISTENER TO THE ADD TASK BUTTON
addTask.addEventListener('click', () => {
  // WILL REMOVE OUR OBSOLETE LIST FROM THE DOM
  mainDiv.innerHTML = '';
  // STORE OUR INPUT VALUE IN A VARIABLE
  const input = document.getElementById('task').value;
  const obj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: input,
    }),
  };
  // CREATING A POST REQUEST THAT WILL ADD OUR TASK TO OUR DB
  fetch('http://localhost:3333/api/addData', obj)
    .then((response) => response.json())
    .then((data) => {
      // ONCE THE TASK ADDITION HAS BEEN SUCCESSFUL
      // WE WILL FETCH OUR UPDATED TASKS FROM THE DB TO RENDER ON OUR DOM
      getItems();
    })
    .catch((err) => console.log('Error in Post Fetch Request: ', err));
});

const removeButton = document.getElementsByClassName('remove');

// MODULARIZED FUNCTION THAT HANDLES THE DELETE FETCH REQUEST TO OUR BACKEND
const removeItem = (desiredItem) => {
  console.log('remove button clicked');
  const item = desiredItem;
  const obj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item,
    }),
  };
  fetch('http://localhost:3333/api/deleteData', obj)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log('Error in Delete Fetch Request: ', err));
};

/**
 *
 * ***************** INDEX.HTML ************************
 *
 */
