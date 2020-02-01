// function that will append the items to taskList
function appendToDOM(tasks) {
    // find the task-list element where all the items will be appended to
    const taskList = document.querySelector('#task-list');
    // clear previous result before adding new list elements to avoid repeats
    taskList.innerHTML = '';
    // for each task retrieved from database, append to taskList as an li 
    tasks.forEach(task => {
        // helper function below to create and append everything
        appendToTaskList(task, taskList);
    })
}

// originally function was in the forEach loop of appendToDOM, but made it 
// a separate function so that adding a task can use it too
function appendToTaskList(task, taskList) {
    // create a list element with the innertext of the passed-in task
    const listElement = document.createElement('li');
    listElement.innerText = task.item;
    taskList.appendChild(listElement);
    // append a delete button to each list element 
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'remove';
    deleteBtn.id = task._id;    // IMPORTANT for deleting the task in db
    deleteBtn.innerText = 'X';
    listElement.appendChild(deleteBtn);
}

// adding an event listener to the buttons to trigger appendToDOM/TaskList
document.addEventListener('click', (event) => {
    const taskList = document.querySelector('#task-list');
    const element = event.target;
    
    // if button is 'Get Tasks', fetch request for GET '/task'
    if (element.id === 'retrieve') {
        fetch('/task')
        .then(data => data.json())
        .then(tasks => appendToDOM(tasks));
    }

    // if button is 'Add Task', fetch request for POST '/task'
    if (element.id === 'task-button') {
        const taskItem = document.querySelector('#task').value;
        fetch('/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: taskItem })
        })
        .then(data => data.json())
        // response is the task added, so it is appended to taskList DOM
        .then(task => appendToTaskList(task, taskList));
    }

    // if button is an 'X', fetch request fro DELETE '/task'
    if (element.className === 'remove') {
        fetch('/task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: element.id })
        });
        // the parent element of the button is the li element
        // this can be removed from taskList DOM immediately after fetch
        taskList.removeChild(element.parentElement);
    }
})