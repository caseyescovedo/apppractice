console.log('test');
const taskList = document.querySelector('#task-list');
const retrieveButton = document.querySelector('#retrieve');
retrieveButton.addEventListener('click', (e) => {
    fetch('/getTasks')
    .then(data => data.json())
    .then(tasks => {
        for (let i = 0; i<tasks.length; i+=1) {
            let taskItem = document.createElement('li');
            taskItem.innerHTML = tasks.rows[i].item;
            console.log(tasks.rows[i]);
            let deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'remove');
            deleteButton.innerHTML = 'x';
            deleteButton.addEventListener('click', deleteTask(e));
            taskItem.append(deleteButton);
            taskList.append(taskItem);
        }
    })
});

