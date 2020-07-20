const getTasks = async () => {
    const taskList = document.querySelector('#task-list');
    // clears list if list exists
    // multiple clicks of button should not display mutliple times
    if (taskList.hasChildNodes){
        taskList.innerHTML = '';
    }
    await fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        console.log(tasks);
        tasks.forEach(task => {
            // create liste item with task
            const li = document.createElement('li');
            li.innerText = task.item;
            li.id = task._id;
            console.log('li', li);

            // create button
            const btn = document.createElement('button');
            btn.setAttribute('class', 'remove');
            btn.innerText = 'X';

            // add delete functionlaity to button 
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // get list items id number
                const li = e.target.parentElement;
                const id = li.id;
        
                // delete from database 
                fetch('/tasks', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({id})
                })
                .then(response => response.json())
                .then(result => console.log('SUCCESS', result))
                .catch(err => console.log(`ERROR deleting task: ${err}`))
        
                // delet task item from dashboard
                taskList.removeChild(li);
            })

            // add button to list item
            li.appendChild(btn);
            
            // add list item to task list
            taskList.appendChild(li);

        })
    })
    .catch(err => console.log(`ERROR gettings task list: ${err}`))
}

getTasksbtn = document.querySelector('#retrieve');
console.log(getTasksbtn);
getTasksbtn.addEventListener('click', function(e){
    e.preventDefault();
    console.log('GET TASKS')
    getTasks();
})

addTaskbtn = document.querySelector('#task-button');
addTaskbtn.addEventListener('click', function(e) {
    e.preventDefault();
    // take text from input field
    const textInput = document.querySelector('#task').value;
    const data = {
        item: textInput
    }
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log('SUCCESS', result))
    .catch(err => console.log(`ERROR adding task: ${err}`))

})