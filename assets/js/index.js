/* const was throwing an error... will debug and search for why later (EDIT: Const threw error
    because my html elements weren't fully rendered on the page, which is why everything was null.
    I added the window.onload to account for this error.
*/


window.onload = function () {

    //Grab task list Div element
    const taskUL = document.getElementById('task-list');


    /*Get Task Button, Event Listener, and function to retreive info from
    the
    */
    const getTasksButton = document.getElementById('retrieve').addEventListener('click', () => {
        getTasksOnce();
    });;

    //Once tasks are retreived, this is set to false and you can no longer make another getTask request
    let gotTaskYet = true;
    function getTasksOnce() {
        if (gotTaskYet) {
            gotTaskYet = false;
            fetch('/task')
                .then(res => res.json())
                .then((tasks) => {
                    console.log(tasks);
                    tasks.forEach((task) => {
                        const listItem = document.createElement('li');
                        listItem.innerText = `${task.item}`;
                        const deleteItem = document.createElement('button');
                        deleteItem.classList.add('delete');
                        deleteItem.innerText = 'X';
                        deleteItem.addEventListener('click', () => {
                            //insert function to delete item based on id
                            deleteTask(task._id);
                        });
                        
                        listItem.appendChild(deleteItem);
                        taskUL.appendChild(listItem);
                    });

                })
        }
    }

    //Create Functionality
    const newTask = document.querySelector('input[name="task"]');

    const createTaskButton = document.getElementById('task-button').addEventListener('click', () => {
        createTask();
    });;

    function createTask(){
        console.log(newTask.value);

        let created = {
            item: newTask.value
        }

        console.log(created);

        fetch(`/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(created)
        })
            .then(res => res.json())
            .then(task => {
                console.log(task);
                newTask.value = ''
                const listItem = document.createElement('li');
                listItem.innerText = `${task.item}`;
                const deleteItem = document.createElement('button');
                deleteItem.classList.add('delete');
                deleteItem.innerText = 'X';
                deleteItem.addEventListener('click', () => {
                    //insert function to delete item based on id
                    deleteTask(task._id);
                });

                listItem.appendChild(deleteItem);
                taskUL.appendChild(listItem);
            });
    }


    //Delete functionality  - will take id for task and make delete request to backend using req.params
    /* for times sake I will skip this but I wanted my task to hide itself upon being clicked. 
        In order to do so I would of needed to set the display for that task to none in order for it to
        away upon being clicked.
    */
    function deleteTask(id) {
        const deleted = { _id: id }

        fetch(`/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleted)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }



} /* End of window onload */
