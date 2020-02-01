// console.log('index.js')
document.addEventListener('DOMContentLoaded', () => {
    fetch('/secret')
    .then(data => data.json())
    .then(task => appendToDom(task))

});

const appendToDom = (tasks) => {
    tasks.forEach((task) => {
        const ul = document.querySelector('#task-list')
        const li = document.createElement('li')
        const deleteButton = document.createElement('button');
        deleteButton.innerText('DELETE');
        li.innerText = task.item;
        deleteButton.setAttribute('class', 'delete');
        deleteButton.setAttribute('butn-id', task.id);

        ul.appendChild(li);
        ul.appendChild(deleteButton);

    })
    document.body.appendChild(ul);
}

document.body.addEventListener('click', (event) => {
    const target = event.target;
    if(target.className === 'delete') {
        fetch('/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: target.dataset.id
            })
            .then()
            .then()
            .catch(err => console.log(err))
        });
    };
});


const taskForm = document.querySelector('#task');
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = event.target[0].value;
    fetch('/secret', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    })
    .then(data => data.json())
    .then(task => console.log(task))
})



