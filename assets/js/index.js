$(document).ready(() => {
  const taskList = document.querySelector('#task-list');
  const addBtn = document.querySelector('#task-button');
  const getBtn = document.querySelector('#retrieve');
  const input = document.querySelector('#task')

  getBtn.addEventListener('click', (event) => {
    console.log('getBtn clicked');
    fetch('/get')
      .then(response => response.json())
      .then(data => {
        console.log('data from getBtn: ', data);
        data.forEach((task) => {
          createNewItem(task._id, task.item);       //for each object in response array, we create a newItem
        })
      })
  })

  addBtn.addEventListener('click', (event) => {
    console.log('addBtn clicked');
    if (input.value === '') return;// dont want to continue if input is empty.
    const newTask = input.value;
    input.value = '' // clear out input field
    input.focus(); // bring focus back to input field for more inputs

    fetch('/post', {
      method: 'POST',
      body: JSON.stringify({ item: newTask, created_at: new Date() }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        createNewItem(data._id, data.item);
      })
  })

  /* ==============HELPERS================ */
  const createNewItem = (id, text) => {             //takes in '_id' and 'item' from DB
    //make sure it does not already exist on DOM
    if (document.getElementById(`id-${id}`)) {      //check if theres an element with the same _id
      return;
    }
    //create button element
    const button = document.createElement('button');
    button.setAttribute('class', 'remove');
    button.setAttribute('id', `id-${id}`);          //to help with the delete function
    button.innerHTML = 'X';
    addDeleteListener(button);
    //create list element
    const item = document.createElement('li');
    item.setAttribute('id', `id-${id}`);            // to help avoid dupes
    item.innerHTML = text;                          // setting text to item from DB
    //append elements
    item.appendChild(button);
    taskList.appendChild(item);
  }

  const addDeleteListener = (el) => {               //adds an individual 'click' listener for the element passed in
    el.addEventListener('click', (e) => {
      console.log('delete button clicked!', el.id)
      const _id = el.id.split('-')[1]; // chopping off the "id-" from the front of the element's id.
      fetch('/delete', {
        method: 'DELETE',
        body: JSON.stringify({ _id }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        deleteItemById(data._id)
      })
    })
  }
  
  const deleteItemById = (id) => {
    const ghost = document.getElementById(`id-${id}`)
    taskList.removeChild(ghost);
  }
})
