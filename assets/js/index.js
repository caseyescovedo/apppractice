console.log('hello1');
const taskList = document.getElementById("task-list");


// Fetch request to server 
let eachTask;
fetch('/tasks')
    .then(res => res.json)
    .then(data => {
        console.log(data);
        for (let x = 0; x < data.length; x++) {
            eachTask = task[x].item;
        }

    })


// getTask
const getTask = document.getElementById("retrieve");
getTask.addEventListener("click", () => {
    const retrieveElement = document.createElement("li");
    retrieveElement.innerHTML = eachTask;
    taskList.appendChild(retrieveElement);
})



// addTask
const addTaskBtn = document.getElementById('task-button');
const addTaskInput = document.getElementById('task');
addTaskBtn.addEventListener('click', () => {
    const addElement = document.createElement("li");
    addElement.innerHTML = addTaskInput.value;
    taskList.appendChild(addElement);
})


// deleteTask
const deleteTask = document.getElementById('delete-task');
deleteTask.addEventListener('click', () => {
    console.log('deleteTask');

})

