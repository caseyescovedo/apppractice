//get task button 
const getTaskButton = document.querySelector('#retrieve');
//add task button
const addTaskButton = document.querySelector('#task-button');

//event handler to get tasks from database
getTaskButton.addEventListener('click', () => getTasks());
//event handler to add task to database
addTaskButton.addEventListener('click', () => addTask());

//add a task to the database
const addTask = () => {
    //get input field value
    const info = document.querySelector('#task').value;
    //create new date obj
    const date = new Date();
    //create a string to format date properly
    let formattedDate = `${date.getMonth()}/${date.getDate()}`;

    //post body for post request
    const postData = {
        "item": info,
        "created_at": formattedDate,
    };
    //post header information for post request
    const postObj = {  
        method: "POST",
        headers: {
            "content-type" : "application/json; charset=UTF-8"
        },
        body: JSON.stringify(postData),
    };
    //fetch request to add information to database
    fetch('/api', postObj)
    .then(data => data.json())
    .then(done => console.log(done))
    .catch((err) => {
        console.log(err)
    })
}

//handle for body element
const body = document.querySelector('body'); 
//render tasks to dom
const getTasks = () => {
    //retrieve items from databasee
    fetch('/api')
    .then(data => data.json())
    .then(done => {
        //create elements
        //render dom with appropriate tasks
    })
    .catch((err) => {
        console.log(err)
    })
};