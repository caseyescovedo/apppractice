const getItem = async () => {
    const response = await fetch('getTask')
    console.log('im working')
    const items = await response.json()
    items.forEach((item) => appendItem(item))
}

//post

const submitItem = () => {
    const item = document.getElementById("task").value
    const body = {
        item
    }
    fetch('/addTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((resp) => console.log(resp))
}


const deleteItems = (id) => {
    const body = {
        id
    }
    fetch('/deleteTask', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body),
    })
    .then((res) => res.json())
    .then((resp) =>console.log(resp))
}



const appendItem = (item) => {
    const items = document.getElementById('task-list')
    //task
    const allTask = document.createElement('div')
    allTask.className = "allTask"
    //item
    const itemDiv = document.createElement('div')
    itemDiv.textContent = item.item
    itemDiv.className = 'item'
    //time
    const timeDiv = document.createElement('div')
    timeDiv.textContent = item.created_at
    timeDiv.className = 'time'
   
    //delete
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText= "X"
    deleteBtn.className = 'remove'
    deleteBtn.onclick = () => deleteItems(item.id)

    //add delete functionality


    //append

    allTask.appendChild(itemDiv)
    allTask.appendChild(timeDiv)
    allTask.appendChild(deleteBtn)
    items.appendChild(allTask)

}