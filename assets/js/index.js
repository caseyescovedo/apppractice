//When the button is clicked to get tasks, all tasks from the database should be displayed as list items in the `#task-list` element. These list items should display the task item followed by a `button` (inside the list item) with a class of `remove` and display an `X`. As an example, one list item might look like
//`<li>Go shopping <button class="remove">X</button></li`

fetch('/users')
    .then(resp => resp.json())
    .then(data =>{
        console.log(data);
        data.forEach((taskObj, index) =>{
            const newTask = document.createElement('li')
            newTask.id = taskObj.id
            newTask.innerText = taskObj.item ;
            document.getElementById('task-list').appendChild(newTask);
        })
    })

const taskInput = document.getElementById('retrieve');
const taskText = taskInput.value
document.getElementById('task-button').addEventListener('click',(e)=>{
    const taskText = document.getElementById('task').value;
    console.log(taskText)
    fetch('/users', {
        method: 'POST',
        header: {'content-type': 'application/json'},
        body: JSON.stringify({ item: taskText })
    })
    .then(resp => resp.json())
    .then(data =>{
        console.log(data);
        data.forEach((taskObj, index) =>{
            const newTask = document.createElement('li');
            const taskObj = taskObj[0];
            newTask.id = taskObj.id
            newTask.innerText = taskObj.item
            document.getElementById('task-list').appendChild(newTask);
    })
});

document.getElementsByClassName('remove').add('click', (e) => {
    const taskText = document.getElementById('task-list').value;
    console.log(taskText)
    fetch('/users', {
        method: 'DELETE',
        header: {'content-type': 'application/json'},
        body: JSON.stringify({ item: taskText })
    })
    .then(resp => resp.json())
    .then(data =>{
        console.log(data);
        data.forEach((taskObj, index) =>{
            const taskObj = taskObj.id;
            document.getElementById('task-list').removeChild(newTask);
    })
});




