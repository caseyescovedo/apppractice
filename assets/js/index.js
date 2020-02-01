const getTask = document.querySelector('#retrieve')
const listTask = document.querySelector('#task-list')


// event listener for send a get request to retrieve the list from DB
getTask.addEventListener('click', () => {
    event.preventDefault();
    fetch('/getTask')
    .then(data => data.json())
    .then(item=> addToList(item))
})

// helper function to create the list and append it to the list tag on the DOM 
function addToList (task) {
    task.forEach(e => {
     const listTag = document.createElement('li')
     const listDiv = document.createElement('div')
     const pTag = document.createElement('p')
     const deleteButton = document.createElement('button')
     deleteButton.setAttribute('class', 'delete')
     deleteButton.setAttribute('data-id', e.id)
     pTag.innerText = e.item;
     deleteButton.innerText = 'X'
     listDiv.appendChild(pTag)
     listDiv.appendChild(deleteButton)
     listTag.appendChild(listDiv)
     listTask.appendChild(listTag)
    })
}

// event listener that send a post request to server to add a item to the DB 
const addTask = document.querySelector('#bTask')

addTask.addEventListener('submit', () => { 
        event.preventDefault();
        const item = event.target[0].value;
        fetch('/secret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item })
        })
});


// event listen on the entire body, if a delete button is click a delete request will be sent to server
document.body.addEventListener('click', () => {
    const target = event.target;
    console.log(event.target)
    if (target.className === 'delete'){
    fetch('/secret', {
        method: "DELETE", 
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            id: target.dataset.id,
        })
    })
}
});


