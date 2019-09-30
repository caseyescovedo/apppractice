const text = document.getElementById('task');
const addButton = document.getElementById('task-button');
const getButton = document.getElementById('retrieve');
const deleteButton = document.getElementsByClassName('remove');
const list = document.getElementById('task-list');
const submitButton = document.getElementById('sumbit')

// function that will create markup for a single task
function markupTask(task) {
    const taskMarkup = document.createElement('li');
    taskMarkup.innerText = task.item;
    const button = document.createElement('button');
    button.className = 'remove';
    button.innerText = 'X';
    button.onclick = () => deleteTodo(task._id)
    taskMarkup.appendChild(button);
    return taskMarkup;
    //return `<li>${task.item}<button id=${task._id}class="remove">X</button></li`
}

// function that will display all the tasks stored in the db
function getTasks(arrayOfTasks) {
    // iterate through array of tasks and create markup for each one
    arrayOfTasks.map((element) => {
        //console.log(element)
        list.appendChild(markupTask(element));
    })
}

// function that makes an axios call to my pathway that will actually put tasks on the dom
async function displayTasks(url) {
    const response = await axios.get(url);
    // pull specific data out of response
    let taskArr = response.data.rows;
    //console.log(taskArr)
    // call helper function on array of data
    getTasks(taskArr);
}

// actually pass in url, this should happen when get tasks button is clicked
//displayTasks('http://localhost:3333/todos');

getButton.addEventListener('click', () => {
    displayTasks('http://localhost:3333/todos')
}, {once : true}) 

// when addButton is clicked, save input to db by making a post request and clear input field 
addButton.addEventListener('click', async () => {
    // grab what is stored in text input
    const newTask = {item: text.value};
    // pass to controller
    const response = await axios.post('http://localhost:3333/todos', newTask)
    // make new todo
    list.appendChild(markupTask(response.data.rows[0]))
    // clear field
    text.value = ''
})

// when delete button is clicked, use the id of the specific task to remove it from the database
// deleteButton.addEventListener('click', async (id) => {
//     const taskId = {_id: id}
//     const response = await axios.delete('http://localhost:3333/todos', {data: {taskId}});
//     displayTasks('http://localhost:3333/todos')
// })

async function deleteTodo(id) {
    console.log('id', id);
    const taskId = {_id: id};
    await axios.delete('http://localhost:3333/todos', {data: taskId});
    list.innerHTML = null;
    displayTasks('http://localhost:3333/todos');
}

// when submit button is clicked, it should redirect user to sercret page 
submitButton.addEventListener('click', () => {
    location.href = 'http://localhost:3333/secret'
})