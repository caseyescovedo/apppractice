// DOCUMENT SELECTORS
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('task-button');
const getTasksButton = document.getElementById('retrieve');

// EVENT LISTENERS
addTaskButton.addEventListener('click', saveNewItem);
getTasksButton.addEventListener('click', getAllItems);


// FUNCTIONS


// create and append new html item
const appendItem = () => {
    // create child li 
    // add id = el.item_id
    // add innertext = el.item
    // create delete button 
        // add class = remove
        // display 'x'
        // add delete action - invoke deleteitem
    // append to taskList
}


// USER login



// GET request for all items
function getAllItems(){
    console.log('inside')
    fetch('http://localhost:3333/api')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error('Error:', err))
    
    // declare getAllItems function
    // fetch request 
        // options object
        // data -> json
            // result -> map results and pass to appendItem()
            // catch error
}

//POST request to add new item 
const saveNewItem = () => {
    // fetch request
        // options object
        // data -> json
            // pass to appendItem()
}


// DELETE request to delete item 
const deleteItem = (id) => {
    // declare deleteItem function
    // fetch request
        // options object
        // data -> invoke getAllItems
}
