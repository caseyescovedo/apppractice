$(document).ready(function () {

    // Prevent the user to click again when the list is already retrieved from the database
    // Please check the line 65
    let valid = false;

    // Returing the #task-list selector of the element
    let taskList = document.querySelector('#task-list');

    // Creating a task
    document.querySelector('#task-button').addEventListener('click', function(e) {
        // Prevent it to go to the next page
        e.preventDefault();
        
        // Get a value of the first element of the children (value of input)
        let task = e.target.parentNode.children[0].value;
        
        // Only execute when task is not empty
        if(task){

            /***
             * 1. Fetch request to send task 
             * 2. Save the task in the database
             * 3. Response from Promise will append it to the list
             */
            fetch('/task',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({item: task})
            })
            .then(res => res.json()) // Promise that resolves with the result of parsing the body text as JSON.
            .then(() => {
                // Resetting the form value as empty to prevent multiple clicks
                e.target.parentNode.children[0].value = ''  
                // Reload the browser after creating
                window.location.reload();

            })
            .catch(err => {
                if(err) console.log('error happened while creating on front end: ', err);
            })
  
        }
    })

    // Reading tasks
    document.querySelector('#retrieve').addEventListener('click', function(e) {
        /***
         * 1. Fetch request to send task 
         * 2. Return all the task in the database
         * 3. Response from Promise will render it to the list
         */
        fetch('/task')
        .then(res => res.json()) // Promise that resolves with the result of parsing the body text as JSON.
        .then(data => {
            data.forEach((element) => {
                /**
                 * Creating a list and a button to delete
                 * Assign each 'X' button to its id from the database
                 * Append it to the task-list id attribute to render it on the brower when user clicks the button
                 */
                if(!valid){
                    let list = document.createElement('li');
                    list.setAttribute('id', 'list-' + element.id);
                    list.setAttribute('class', 'lists')
                    let button = document.createElement('button');
                    button.setAttribute('id', 'button-' + element.id);
                    button.innerHTML = 'X';
                    list.innerHTML = element.item;
                    list.append(button);
                    taskList.append(list);
                }
            })
        })
        .catch(err => {
            console.log('error happened while reading on front end: ', err);
        })
    })

    // Deleting tasks
    document.addEventListener('click', function(e) {
        
        if(e.target.id.includes('button-')){
            console.log('hi')
            // Splitting the id to get the proper id
            let parent = e.target.parentNode.id.split('-')            
            let id = parent[1];
            /***
             * 1. Fetch request to delete task 
            */
            fetch('/task', {
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
                
            })
            .then(() => {
                // Removing the list on the front end after database query is executed
                e.target.parentNode.remove();
                
            })
            .catch(err => {
                console.log('error happened while deleting on front end: ', err);
            })
        }
    })

    /***
     * 1. Fetch request to retrieve it on the browser when user logs in directly instead of clicking the button
     * 3. Response from Promise will render it to the list
     */
    fetch('/task')
    .then(res => res.json())
    .then(data => {
        data.forEach((element) => {
            /**
             * Creating a list and a button to delete
             * Assign each 'X' button to its id from the database
             * Append it to the task-list id attribute to render it on the brower when user clicks the button
            */
            let list = document.createElement('li');
            list.setAttribute('id', 'list-' + element.id);
            list.setAttribute('class', 'lists')
            let button = document.createElement('button');
            button.setAttribute('id', 'button-' + element.id);
            button.innerHTML = 'X';
            list.innerHTML = element.item;
            list.append(button);
            taskList.append(list);
            valid = true;
        })
    })
    .catch(err => {
        console.log('error happened while reading on front end: ', err);
    })


});
