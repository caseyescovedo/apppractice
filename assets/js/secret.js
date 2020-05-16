function populateTasks(tasks){
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = "";
    for(const task of tasks){
        const taskListItem = createTaskListItem(task);
        taskList.appendChild(taskListItem);
    }
}

function createTaskListItem(task){
    const taskListItem = document.createElement('li');
    taskListItem.innerText = task.item;
    taskListItem.appendChild(createRemoveButton(task.id));
    return taskListItem;
}

function handleRemoveItem(event){
    // immedietly remove the element due to readme instructions
    const taskId = event.target.getAttribute('data-item-id');
    event.target.parentElement.remove();
    fetch('/tasks', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: taskId})
        })
        .then(err => console.log(err));
}

function createRemoveButton(id) {
    const removeButton = document.createElement('button');
    removeButton.innerText = 'X';
    removeButton.setAttribute('class', 'remove');
    removeButton.setAttribute('data-item-id', id);
    removeButton.addEventListener('click', handleRemoveItem);
    return removeButton;
}

function addTask(task){
    const taskList = document.querySelector('#task-list');
    taskList.appendChild(createTaskListItem(task));
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#retrieve').addEventListener('click', () => {
        fetch('/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(tasks => populateTasks(tasks));
    });

    document.querySelector('#task-button').addEventListener('click', () => {
        const task = {item: document.querySelector('#task').value};
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(task => addTask(task))
    });
});