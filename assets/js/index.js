
//need to add a counter to prevent multiple clicks- is this debounce?

const getTasks = document.querySelector('#retrieve')
// console.log('getTasks', getTasks)

getTasks.addEventListener('click', () => {
    fetch('/get')
    .then(resp => resp.json())
    .then(data => {
        const list = document.querySelector('#task-list'); //why does querySelector work but getElementById doesnt? is it because of the hashtag? if not, there isnt consistency
        // console.log('data in front end', data) //[{...},{...},{...}]
        data.forEach((task) => {
            const newTask = document.createElement('li');
            // newTask.className = 'task';
            newTask.innerText = task.item;
            newTask._id = task._id;

            //create delete button
            const delBtn = document.createElement('button');
            delBtn.className = 'remove';
            delBtn.innerText = 'X';
            newTask.append(delBtn)
            delBtn.addEventListener('click', () => {
                // console.log('task in delete fetch', task)
                // console.log('task._id in delete fetch', task._id)
                fetch(`delete/${task._id}`, {
                    method: 'DELETE'
                })
                .then(resp => resp.json())
                .then(data => {
                    // console.log('data', data);
                    document.querySelector('#task-list').removeChild(newTask);          
                })
            })
            //append the newTask to the DOM
            // list.appendChild(newTask)
            list.append(newTask)
        })
    })
})


//post task (add it to the DOM)
const addTask = document.querySelector('#task-button')
addTask.addEventListener('click', () => {
    const item = document.querySelector('#task').value; 
    //my post route is working with postman and when i click the button "add task", but its not wokring on this 
    fetch('/post', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({item})
    }).then(resp => resp.json())
    .then(task => {
        const list = document.querySelector('#task-list'); //why does querySelector work but getElementById doesnt? is it because of the hashtag? if not, there isnt consistency
        console.log('data in here bitch', task)
        console.log('typeof data', typeof task)

        //data is an object- can we wrap it in an array
            const newTask = document.createElement('li');
            newTask.innerText = task.item;
            newTask._id = task._id;

            //create delete button
            const delBtn = document.createElement('button');
            delBtn.className = 'remove';
            delBtn.innerText = 'X';
            newTask.append(delBtn)
            delBtn.addEventListener('click', () => {
                fetch(`delete/${task._id}`, {
                    method: 'DELETE'
                })
                .then(resp => resp.json())
                .then(data => {
                    // console.log('data', data);
                    document.querySelector('#task-list').removeChild(newTask);          
                })
            })
            //append the newTask to the DOM
            list.appendChild(newTask)
            // list.append(newTask)
        })
    // .catch(err => console.log('err in addTask fetch', err))
})
