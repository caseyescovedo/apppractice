//have to fix the doubling of responses
const displayItems = (response) => {
    const taskList = document.getElementById('task-list');
    //foreach method on each of the responses
    response.forEach((taskObj, index) => {
        console.log('this is taskObj:', taskObj);
        //creating listitem
        const newListItem = document.createElement('li');
        newListItem.id = taskObj.id;
        newListItem.innerHTML = taskObj.item;
        //creating deletebuttons for each listitem
        deleteButton = document.createElement('button');
        deleteButton.id = `b${taskObj.id}`;
        deleteButton.setAttribute('class', 'remove');
        deleteButton.innerHTML = 'X';
        //giving button functionality
        deleteButton.addEventListener('click', () => {
            console.log(taskObj.item)
            axios.post('/deleteTask', {
                item: taskObj.item
            })
            .then(response => {newListItem.remove();
            }).catch(err => console.log(err));
        })
        // my logic: grabbing elements by their tag name gives me an array of li#. If I were to hit "get tasks" again, it would filter out the duplicates within in the li array
        //running out of time so I don't think I will be able to finish it
        // let listItems = document.getElementsByTagName('li');
        // listItems.filter((item,index) => {
        //     listItems.indexOf(item) === index;
        // })
        //appending the button onto the item
        newListItem.appendChild(deleteButton);
        //appending list item onto the task list
        taskList.appendChild(newListItem);
        console.log('this is tasklist', document.getElementsByTagName('li'));
    })
}

//adding a task - works
document.getElementById('task-button').addEventListener('click', (e) => {
    axios.post('/postTask', {
        item: document.getElementById('task').value
    })
    .then(response => {
    })
    .catch(err => console.log(err))
});

//get all - need to figure out a way to not duplicate it
document.getElementById('retrieve').addEventListener('click', () => {
    axios.get('/getTask')
    .then(response => {
        response = response.data.tasks;
        displayItems(response);
    })
    .catch(err => console.log(err));
})

//        username: document.getElementById('user').value,
//password: document.getElementById('pass').value

// on submit button for auth - doesn't really work... have to figure out a way to include the body. 
// i can't figure out how to stop the form's post from continuing even if i preventDefault
// this should be easy but I'm running out of time...
let myForm = document.getElementsById('signin');
let formData = new FormData(myForm);
let formButton = document.getElementById('submit');
formButton.addEventListener('click', () => {
    e.preventDefault();
    alert(`${formData}`);
    axios.post('/signin', {
        username: document.getElementById('user').value,
        password: document.getElementById('pass').value
    }).then((response) => {
        // if (response.verified === true) {
        //     //want to redirect to /secret
        // } else if (response.verified === false) {
        //     //redirect to signin with a message
        // }
    })
    .catch(err => console.log(err));
})




