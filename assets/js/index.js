
console.log('hi from index.js')


const renderTasks = data => {
    console.log('data in rednerTAsks', data)
    const messageDisplay = document.getElementById('task-list')
    let messageList = ``
    
    data.forEach(eachData => {
        messageList += `<li id="${eachData._id}">${eachData.item}<button class="remove">X</button></li>`
    })
    messageDisplay.innerHTML = messageList;

    const buttonsDisplay = document.querySelectorAll('.remove')
    buttonsDisplay.forEach(eachButton => {
        eachButton.addEventListener('click', () => {
            deleteTask(eachButton.parentElement.getAttribute('id'))
        })
    })
}

const getTasks = () => {
    fetch('/tasks')
        .then(res => res.json())
        .then(result => renderTasks(result))
        .catch(err => console.log(err))
}

const postTask = () => {
    const newItem = document.getElementById('task').value;
    console.log('newItem in postTasks', newItem)
    document.getElementById('task').value = ''

    if (newItem) {
        fetch('/tasks', {
            method: "POST",
            headers: {
                Accept: 'application/json, text/plain, */*', 
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                item : newItem
            })
        })
            .then(res => {
                return res.json()
            })
            .then(result => {
                const addedList = document.createElement('li')
                addedList.innerHTML = `<li id="${result._id}">${result.item}<button class="remove">X</button></li>`
                document.getElementById('task-list').appendChild(addedList)
                getTasks()
            })
            .catch(err => {
                console.log(err)
            })
    } 
}


const deleteTask = data => {
    console.log('data in deleteTask', data)
    fetch('/tasks', {
        method: "DELETE",
        headers: {
            Accept: 'application/json, text/plain, */*', 
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: data
        })          
    })
    .then(res => res.json())
    .then(result => console.log(result))     
    .catch(err => {
        console.log(err)
    })
    document.getElementById('task-list').removeChild(document.getElementById(data))
}

document.getElementById('task-button').addEventListener('click', postTask)
document.getElementById('retrieve').addEventListener('click', getTasks)
getTasks()