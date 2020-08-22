//grab elements from the secret DOM
window.onload = function () {



    const getTasks = document.getElementById('retrieve');
    const addTasks = document.querySelector('#task-button');
    const addInput = document.querySelector('input[id="task"]') //definitely not sure this will work this way
    const taskDiv = document.querySelector('#task-list');

    //delete item function
    const deleteItem = (input) => {
        //creating an obj to send to the backend
        let deleted = {
            id: input
        }

        fetch('/task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleted)
        })
            .then(res => res.json())
            .then(data => console.log(data));

        //reload the page
        location.reload();
    }

    //Uncaught in promise type error, failed to fetch.
    const getTask = () => {
        fetch('/task')
            .then(res => res.json())
            .then(data => data.forEach(item => {
                const taskItem = document.createElement('li'); //create task line
                const deleteItem = document.createElement('button'); //create delete button
                deleteItem.innerHTML = 'X';
                deleteItem.classList.add('remove')
                deleteItem.id = item.id; //add the id number from the fetch object to the delete button
                deleteItem.addEventListener('click', () => {
                    deleteItem(item.id);
                });

                taskItem.innerHTML = item.item;
                taskItem.append(deleteItem);
                taskDiv.append(taskItem);

            }));
    }

    //add task function
    const addTask = (input) => {
        let created = {
            item: addInput
        }
        fetch('/task', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(created)
        })
        .then(res => res.json())
        .then(data => console.log(data));
        
        location.reload()
    }

    //Event Listener on Form Button 
    getTasks.addEventListener('click', () => {
        getTask();
    })

    addTasks.addEventListener('click', () => {
        addTask(addInput);
    })

}
