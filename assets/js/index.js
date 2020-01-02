window.onload = function () {

const taskList = document.getElementById('task-list');
const getList = document.getElementById('retrieve')
    getList.addEventListener('click', () => {
        fetch('/getTasks', {
            method: 'GET',
        })
        .then((data) => data.json())
        .then((data) => {
            data.forEach(info => {
                const taskItem = document.createElement('li');
                taskItem.innerHTML = info.task;
                const btn = document.createElement('button');
                btn.className = 'remove'
                taskItem.appendChild(btn);
                    btn.innerHTML = "X"
                    btn.addEventListener('click', () => {
                        fetch(`/deleteTask/${info._id}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type' : 'application/json' }
                        })
                    taskList.removeChild(taskItem);
                    })
                taskList.appendChild(taskItem);
            })
        
        })
    })
const postTask = document.getElementById('task-button');

postTask.addEventListener('click', () => {
    const taskBody = document.getElementById('task').value;
    fetch('/newTask', {
        method: 'POST',
        body:
            JSON.stringify({
                task: taskBody,
            }),
        headers: { 'Content-Type' : 'application/json' }
    })
    .then((data) => data.json())
    .then((data) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = data.task;
        const btn = document.createElement('button');
        btn.className = 'remove';
        taskItem.appendChild(btn);
            btn.innerHTML = 'X';
            btn.addEventListener('click', () => {
                this.fetch(`/deleteTask/${data._id}`, {
                    method: 'DELETE',
                    
                    headers: { 'Content-Type' : 'application/json' }
                })
                taskList.removeChild(taskItem);
            })
        taskList.appendChild(taskItem);
    })
})
}