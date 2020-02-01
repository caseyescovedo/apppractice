window.onload = function() {

    // const userInput = document.querySelector('#user');
    // const passwordInput = document.querySelector('#pass');
    // const signin = document.querySelector('#signin');


    // signin.addEventListener('submit', (event) => {
    //     // event.preventDefault();
    //     const username = event.target[0].value;
    //     const password = event.target[1].value;
    //     console.log(typeof username, password);

    //     fetch('/signin', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({username, password}),
    //     })
    //     // .then((response) => response.json())
    //     // .then(data => console.log(data));
    // })





    const getTaskButton = document.querySelector('#retrieve');
    const addTaskButton = document.querySelector('#task-button');
    const taskList = document.querySelector('#task-list');
    // const removeButton = document.querySelector('.remove');
    
    // console.log(getTaskButton);
    getTaskButton.addEventListener('click', getAllTasks);
    // console.log("li tags: ", document.getElementsByTagName('li'));
    addTaskButton.addEventListener('click', addTask);

    // removeButton.addEventListener('click', (event) => {
    //     console.log('event: ', event);
    // })

    
    
    
    function getAllTasks() {
        fetch('/task')
        .then(response => response.json())
        .then (data => {
            // console.log("data: ", data);
            data.forEach(task => {
                if(!document.getElementById('task'+task.id)) {
                    appendTask(task);
                }
            })
        })
        .catch((error) => {
            console.log("Error in getAllTasks: ", error);
        })
    }

    function addTask() {
        // console.log('task input: ', document.querySelector('#task').value);
        const input = document.querySelector('#task').value;
        fetch('/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: input })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // getAllTasks();
        })
        .catch((error) => {
            console.log("Error in addTask: ", error);
        })

    }

    
    function deleteTask(id) {
        fetch('/task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // getAllTasks();
        })
        .catch((error) => {
            console.log("Error in deleteTask: ", error);
        })
    }

    //<li>Go shopping <button class="remove">X</button></li>
    function appendTask(task) {
        
        const li = document.createElement('li');
        li.setAttribute('id', 'task'+task.id);
        li.innerText = task.item;
    
        const button = document.createElement('button');
        button.setAttribute('class', 'remove');
        button.setAttribute('id', task.id);
        button.innerText = 'X';
        button.addEventListener('click', (event) => {
            // console.log('event: ', event.target.id);
            deleteTask(event.target.id);
        })
        
        li.appendChild(button);
        taskList.appendChild(li);
    }
};
