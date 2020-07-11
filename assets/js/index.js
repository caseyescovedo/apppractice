const retrieveButton = document.querySelector('#retrieve')

const addTaskText = document.querySelector('#task')
const addTaskButton = document.querySelector('#task-button')

const taskList = document.querySelector('#task-list')


const getAllTasks = async () => {
    const unparsed = await fetch('/tasks')
    const tasks = await unparsed.json()

    taskList.innerHTML = ''

    tasks.forEach((task) => {
        const node = document.createElement('li')
        node.innerText = task.item

        const button = document.createElement('button')
        button.classList.add('remove')
        button.innerText= "X"

        button.onclick = () => { removeTask(task._id) }
        

        taskList.appendChild(node)
        node.appendChild(button)
    })
}

retrieveButton.onclick = getAllTasks()

addTaskButton.onclick = async () => {
    const item = addTaskText.value
    console.log(JSON.stringify({ item }))
    await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item })
    })
    await getAllTasks()
}


removeTask = async (id) => {
    await fetch('/tasks', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ id })
    })
    await getAllTasks()
}