// You are serving `index.js` to the client for use on the `secret` page, but there is not much existing functionality.
//  Add code to achieve the following:

// - [ ] When the button is clicked to get tasks, all tasks from the database should be displayed 
// as list items in the `#task-list` element. These list items should display the task item followed by a `button` 
// (inside the list item) with a class of `remove` and display an `X`. As an example, one list item might look like
// `<li>Go shopping <button class="remove">X</button></li`
// - [ ] Multiple clicks of the button to get tasks should not display the list items multiple times
// - [ ] Clicking on the button to add a task should take the text from the input field and create a new task 
// in the database. This task should be seen by clicking the button to get tasks after it has been added. 
// (Optionally, you can display the new task immediately after adding.)
// - [ ] Clicking on any list item's `X` button should remove the item from the list (immediately) and delete 
// the task from the database
//reference from hackathon chrome extension 
window.onload = start;

function getTasks() {
    fetch("/getTasks")
        .then((res) => res.json())
        .then((res) => {
            // console.log("RES HERE FROM INDEX: ", res)
            const listofTasks = document.getElementById("task-list");

            for (let i = 0; i < res.length; i++) {
                let taskItem = document.createElement('li')
                taskItem.id = res[i]._id
                taskItem.innerHTML = res[i].item

                const deleteButton = document.createElement('button')
                deleteButton.innerHTML = 'x';
                deleteButton.addEventListener('click', () => {
                    deleteTask(res[i]._id)
                })
                listofTasks.appendChild(taskItem);
                // console.log("TASK ITEM:", taskItem)
                taskItem.appendChild(deleteButton)
            }
        })
}

function postTask() {
    let inputField = document.getElementById('task')

    fetch("/postTask", {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            item: inputField.value,
        })
    }).then((res) => res.json())
        .then((res) => console.log("POSTTASK IN INDEX RES: ", res))
        .catch((err) => console.log(err))
}

function start() {
    const getAllButton = document.getElementById('retrieve')

    getAllButton.addEventListener('click', () => {
        getTasks()
    })

    const taskButton = document.getElementById('task-button')
    taskButton.addEventListener('click', () => {
        postTask()
    })
}
function deleteTask(id) {
    let itemToDelete = document.getElementById(id)
    const item = document.getElementById('task-list')
    item.removeChild(itemToDelete)

    fetch(`/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
    })
}

//merp