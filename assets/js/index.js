// window.onload = start;
// function start() { 
//     setInterval(getTasks, 2000)
// }
let task = document.getElementById("task");
let taskBtn = document.getElementById("task-button");
let getBtn = document.getElementById("retrieve");
let taskList = document.getElementById("task-list");

taskBtn.addEventListener("click" , () => {
    if (task.value === '') { 
        console.log('please enter a task')
    } else { 
        addTasks(task.value);
    }
})

function addTasks(item) { 
    console.log(item)
    fetch('/addTask', {
        headers: {"content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ 
            item: item
        })
    })
}

getBtn.addEventListener("click", () => {
    getTasks();
})

function getTasks () {
    fetch('/getTasks', {
        method: "GET",
        header: {"content-type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
        taskList.innerHTML = " ";
    for (let i = 0; i < data.length; i++) {
        let liTask = document.createElement('li');
        let deleteBtn = document.createElement('button'); 
        liTask.innerText = data[i].item;
        deleteBtn.innerText = "X";
        liTask.appendChild(deleteBtn);
        taskList.appendChild(liTask);

        deleteBtn.addEventListener("click", () => {
            fetch(`/delete/${data[i]._id}`, {
                method: "DELETE",
                header: {"content-type": "application/json" },
            })
        })
    }
    })
}