const taskList = document.getElementById('task-list')
//function that executes when get Tasks button is clicked: 
function getTasks() {
    //having trouble referring to the data received from backend...
    const data = {item: ??, id: ??}
    fetch('/getTasks', {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(data=>data.json())
    .then(data=>{console.log(data)})

    //not getting data because of timestamp syntax error in SQL...
    //EDIT: removing the created_at column . Sorry.

    // .then(function(data) {
        // I was going to do a map and then append <li> items to task-list...
    // })
}