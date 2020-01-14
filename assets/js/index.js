window.onload = function(){
    document.getElementById('task-button').addEventListener('click', addTask);
    document.getElementById('retrieve').addEventListener('click', getTasks);
    const taskList = document.getElementById('task-list');
}


const addTask = () => {
    fetch('/secret', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            task: document.getElementById('task').value
        }),
    })
    document.getElementById('task').value = '';
}

const getTasks = async () => {
    document.getElementById('task-list').removeChild;
    await fetch('/secret/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {

            let div = document.createElement("div");
            div.className = "task"; //giving div classname for styling
            div.id = [i]; //ability to access this div
            // div.innerHTML = '<div><button id="listbutton" className="remove">x</button></div>';

            // let button = document.createElement('BUTTON');
            // button.id = "listbutton"; //ability to give onclick
            // button.className = "remove"; //giving button classname for styling
            // button.innerText = "x"; //add the x within the button
            
            div.innerHTML = data[i].item + `<button id=${i} className="remove">x</button>`;
            // div.append(button); //add button to the text showing on the screen
            document.getElementById('task-list').appendChild(div);
            document.getElementById(i).addEventListener('click', deleteTask);
        }
        // document.getElementById('listbutton').addEventListener('click', deleteTask);
        console.log(data);
    })

    .catch(err => console.log(err))
}

const deleteTask = () => {
    fetch('/secret/tasks', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item: document.getElementById(event.target.id).innerText
     })
    }
 )}