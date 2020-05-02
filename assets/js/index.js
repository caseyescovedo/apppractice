const taskList = document.getElementById('task-list')
const task = document.getElementById('task')
const parser = new DOMParser()


// Helper function that adds a new task to the DOM:
function addEachTask (eachTask) {
    // giving each button for each task that task's ID in the database 
    const text = 
    `<li>
        ${eachTask.item}
        <button onClick="deleteTask(this)" id="${eachTask._id}" class="remove">X</button>
    </li>`

    const resultHTML = parser.parseFromString(text, 'text/html')
    taskList.appendChild(resultHTML.documentElement)
}

function addAllTasks () {
    fetch('/gettasks')
    .then((tasks) => {
        return tasks.json()
    })
    .then((data) => {
        for (let eachTask of data) {
            // If the task does NOT exist on the DOM then add it: 
            if(document.getElementById(eachTask._id) === null)
            addEachTask(eachTask)
        }
    })
}

const getTaskBtn = document.getElementById('retrieve')
getTaskBtn.addEventListener('click', addAllTasks)
const addTaskBtn = document.getElementById('task-button')
addTaskBtn.addEventListener('click', addNewTask )

function addNewTask() {
    fetch('/posttask', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
            item: task.value
        })
    })
    .then(response => {
        response.json().then(body => 
            addEachTask(body)
        )
    })
}

// Send the ID in the X <button> to the backend, so the task with that specific ID can be deleted
function deleteTask(e) {
    // console.log(e)
    const id = e.id
    fetch('/deletetask', {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            id: id,
        })
    })
    .then(response => {
        if(response.status === 200) {
            const removeBtn = document.getElementById(id)
            removeBtn.parentElement.remove()
        }
    })
}