let taskObj = {}
document.getElementById("retrieve").addEventListener('click', () => {
    // ensure that the input goes back to placeholder
    fetch('/secret/getTask')
        .then(resp => resp.json())
        .then(data => {
            console.log('this is the recived data from index.js fetch to get data', data)
            const results = data
            for (let el of results) {
                for (let key in el) {
                    let newTask = document.createElement('li')
                    let deleteButton = document.createElement('button')
                    deleteButton.className = 'remove'
                    deleteButton.innerHTML = "X"
                    newTask.innerText = `${el[key]}`
                    console.log('this is inner next ++++++', newTask)
                    newTask.appendChild(deleteButton)
                    document.getElementById('task-list').appendChild(newTask)

                }
            }
        })
        .catch(err => {
            console.log('err from fetch getdata =====>', err)
        })
    document.getElementById('retrieve').disabled = true;

})

document.getElementById("task-button").addEventListener('click', () => {
    const taskText = document.getElementById('task').value
    console.log('im here before fetch/secret')
    fetch('/secret', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ task: taskText })
    })
        .then(resp => console.log('im here in then', resp.json()))
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log('there was a err on front end posting data', err))

})

// didnt have enough time to finish delete but got the basic funciton of everything else working

// tried to quickly get delete working this was my code below
// also did have the intnal request ot 

// document.getElementById("remove").addEventListener('click', () => {
//     fetch('/secret')
//         .then(data => {

//         })
//         .catch(err => console.log('there was an error deleteing', err))


// })




// document.getElementById("task-button").addEventListener('click', (e) => {
//     // ensure that the input goes back to placeholder
//     const taskInput = document.getElementById('task')
//     const taskText = taskInput.value;
//     taskInput.value = 'enter new task'
//     fetch('/')

// })