const getTasksBtn = document.getElementById('retrieve');
const addTaskBtn = document.getElementById('task-button');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task');

const getTasks = () => {
    fetch('/tasks')
    .then((res) => res.json())
    .then((res) => {
        taskList.innerHTML = '';
        for(let i = 0; i < res.length; ++i){
            let curTask = res[i];
            let tempLi = document.createElement('li');
            tempLi.innerText = curTask.item;
            let delBtn = document.createElement('button');
            delBtn.innerText = 'X';
            delBtn.addEventListener('click', () =>{
                deleteTask(curTask._id);
            })
            tempLi.appendChild(delBtn);
            taskList.appendChild(tempLi);
        }
    })
}


const addTask = (str) => {
    const body = {
        text: str
    }
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        getTasks();
    })
}

const deleteTask = (id) => {
    const body = {
        id: id
    }
    fetch('/tasks/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((res) => {
        getTasks();
    })
}

getTasksBtn.addEventListener('click', () => {
    getTasks();
})

addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
    taskInput.value = '';
})

