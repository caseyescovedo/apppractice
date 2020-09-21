const deleteTask = (taskName) => {
    fetch(`./secret/deleteTask/taskName=${taskName}`)
    .then((response) => {
        response.json();
    })
    .then((data) => {;
        console.log(data)
    })
    .catch((err) => {
        console.error("There was an error getting the tasks from the database: ", err)
    })
}

const addTask = () => {
    const taskInput = document.getElementById('task').value;
    fetch('./secret/addtask', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskInput)
    })
    .then((response) => {
        response.json();
    })
    .then((data) => {
        let taskList = document.getElementById('task-list');
        for (const task of taskList){
            taskList.append(
                <li>
                    {task} <button class="remove" onclick={deleteTask(task)}>X</button>
                </li>
            )
        }
    })
    .catch((err) => {
        console.error("There was an error adding the task to the database: ", err)
    })
}

const getTasks = () => {
    fetch('./secret/getTasks')
    .then((response) => {
        response.json();
    })
    .then((data) => {;
        console.log(data)
    })
    .catch((err) => {
        console.error("There was an error getting the tasks from the database: ", err)
    })
}

const login = () => {
    const userInput = document.getElementById('user').value
    const passwordInput = document.getElementById('pass').value
    fetch('./login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userInput,
            passwordInput
        })
    })
    .then((response) => {
        response.json();
    })
    .then((data) => {;
        console.log(data)
    })
    .catch((err) => {
        console.error("There was an error getting the tasks from the database: ", err)
    })
}