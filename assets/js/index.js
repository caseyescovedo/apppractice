// import { listenerCount } from "cluster";
document.querySelector('#retrieve').addEventListener('click', e => {
    fetch('/getTasks')
        .then(task => task.json())
        .then(task => {

            task.forEach((data, i) => {
                const li = document.createElement('li')
                li.innerText = data.item
                li.id = data._id
                const button = document.createElement('button')
                button.className = 'remove'
                button.innerText = 'X'
                button.addEventListener('click', e => {
                    fetch(`/deleteTask/${li.id}`, {
                        method: "DELETE",
                        headers: { 'content-type': 'application/json' },
                    })
                        .then(data => data.json())
                        .then(data => {
                            console.log(data)
                            document.querySelector('#task-list').removeChild(li)
                        })
                })
                document.getElementById('task-list').appendChild(li)
                li.appendChild(button)
                // if (li.id) {
                //     document.querySelector('#task-list').removeChild
                // } else {
                //     document.getElementById('task-list').appendChild(li)
                //     li.appendChild(button)
                // }
            })
        })
})

document.querySelector('#task-button').addEventListener('click', () => {
    const item = document.querySelector('#task').value
    fetch('/postTask', {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ item })
    })
        .then(data => data.json())
        .then(data => {
            console.log('data success', data)
            // reload()
        })
})