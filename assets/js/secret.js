function populateTasks(tasks){
    /* populate the tasks list with items */
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = ""; // clear it first since we are getting a fresh list
    for(const task of tasks){ // loop through the tasks object and add tasks to the list
        const taskListItem = createTaskListItem(task);
        taskList.appendChild(taskListItem);
    }
}

function createTaskListItem(task){
    /* create a list item that will hold the text of the task item and hold a remove button */
    const taskListItem = document.createElement('li');
    taskListItem.innerText = task.item;
    taskListItem.appendChild(createRemoveButton(task.id));
    return taskListItem;
}

function handleRemoveItem(event){
    // immedietly remove the element due to readme instructions
    const taskId = event.target.getAttribute('data-item-id'); // get attribute that refers
                                                              // to the id of the task object
                                                              // back on the server
    event.target.parentElement.remove(); // remove list item that holds the name of the task and button
    // fetch the server with a delete method and send the id of the task to be deleted
    fetch('/tasks', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: taskId})
        })
        .then(err => console.log(err));
}

function createRemoveButton(id) {
    /* apparently we need to create a new element everytime, can't create one element
        and add them repeatedly to other elements. only the last append will show.
        which means duplicates are not being made and the reference of the element
        is being passed around into other parent elements 
    */
    const removeButton = document.createElement('button');
    removeButton.innerText = 'X';
    removeButton.setAttribute('class', 'remove');
    removeButton.setAttribute('data-item-id', id); // save data_item_id to id so we can refer later
                                                  // when we delete an item
    removeButton.addEventListener('click', handleRemoveItem); // add a event listener to handle the delete
    return removeButton;
}

function addTask(task){
    const taskList = document.querySelector('#task-list'); // get a reference to our task list element
    taskList.appendChild(createTaskListItem(task)); // append a new task list item
}

/* make sure our dom loads with all the elements then add event listeners on those elements */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#retrieve').addEventListener('click', () => {
        /* handle getting of the tasks with a get method, set content type so server knows to use json */
        fetch('/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json()) /* convert response body to json */
        .then(tasks => populateTasks(tasks)); /* populate tasks in the list from json objects of the body */
    });

    document.querySelector('#task-button').addEventListener('click', () => {
        /* handle addings the tasks with the post method */
        const task = {item: document.querySelector('#task').value}; // create task object from task input value
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(res => res.json()) // response in the body should be task object with an id and item
        .then(task => addTask(task)) // add task
    });
});