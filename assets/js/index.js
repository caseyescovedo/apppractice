/*
## Client-side JavaScript/DOM Manipulation
You are serving `index.js` to the client for use on the `secret` page, but there is not much existing functionality. Add code to achieve the following:

- [ ] When the button is clicked to get tasks, all tasks from the database should be displayed as list items in the `#task-list` element. These list items should display the task item followed by a `button` (inside the list item) with a class of `remove` and display an `X`. As an example, one list item might look like
`<li>Go shopping <button class="remove">X</button></li`
- [ ] Multiple clicks of the button to get tasks should not display the list items multiple times
- [ ] Clicking on the button to add a task should take the text from the input field and create a new task in the database. This task should be seen by clicking the button to get tasks after it has been added. (Optionally, you can display the new task immediately after adding.)
- [ ] Clicking on any list item's `X` button should remove the item from the list (immediately) and delete the task from the database
*/

const retrieve = document.getElementById('retrieve');

retrieve.addEventListener('click', function getHandler(e) {
    fetch('/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            // console.log(result.tasks)
            for (let i = 0; i < result.tasks.length; i++) {
                const li = document.createElement('li');
                li.innerHTML = result.tasks[i].item;
                li.id = `li${result.tasks[i].id}`;
                const button = document.createElement('button');
                button.innerHTML = 'X';
                button.className = 'remove';
                button.id = `${result.tasks[i].id}`;
                document.getElementById('task-list').appendChild(li);
                li.appendChild(button);
            }
            const removeButtons = document.getElementsByClassName('remove');
            
            for (let i = 0; i < removeButtons.length; i++) {
                console.log(removeButtons[i])
                console.log('button parent is', removeButtons[i].parentNode.nodeName);
                removeButtons[i].addEventListener('click', function removeHandler(e) {
                    let id = removeButtons[i].id;
                    fetch('/remove', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: id
                        })
                    })
                        .then(response => response.json())
                        .then(result => {
                            // console.log('result is', result)
                            const deletedNode = document.getElementById(`li${result.task[0].id}`);
                            document.getElementById('task-list').removeChild(deletedNode);
                        })
                        .catch(error => {
                            console.log('Error: ', error);
                        });
                })
            }
            e.target.removeEventListener(e.type, getHandler);
        })
        .catch(error => {
            console.log('Error: ', error);
        });
})

const taskButton = document.getElementById('task-button');
const input = document.getElementById('task');

taskButton.addEventListener('click', function postHandler(e) {
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item: input.value
        })
    })
        .then(response => response.json())
        .then(result => {
            // console.log(result.task.item)
            /* The following code will dispay the new task immediately after adding, but if the get tasks button is clicked afterward, a duplicate appears until the page refreshes */
            // const li = document.createElement('li');
            // li.innerHTML = result.task.item;
            // const button = document.createElement('button');
            // button.innerHTML = 'X';
            // button.className = 'remove';
            // document.getElementById('task-list').appendChild(li);
            // li.appendChild(button);
        })
        .catch(error => {
            console.log('Error: ', error);
        });
})
