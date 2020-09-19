document.getElementById("retrieve").addEventListener("click", () => {
    console.log('clicking in the button works');
        getAllItems();
});

const taskList = document.getElementById("task-list")

function getAllItems() {
    console.log('hello from getAllItems');
    fetch('http://localhost:3333/api/getTasks')
        .then((response) => response.json())
        .then((data) => {
            taskList.innerHTML = '';
            for (let el of data) {
                console.log('its the id:', el['_id'])
                const listNode = document.createElement('li')
                const listItem = document.createTextNode(el['item'])
                const removeBtn = document.createElement('button')
                removeBtn.innerHTML = "X"
                removeBtn.classList.add("remove");
                const idtodelete = el['id']
                removeBtn.addEventListener("click", () => {
                    deleteTask(el['_id']);
                })
                listNode.appendChild(listItem);
                listNode.append(removeBtn);
                listNode.classList.add(el['_id'])
                console.log(el['item']);
                taskList.appendChild(listNode);
            }
        })
        .catch((err) => console.log(err));
};

document.getElementById("task-button").addEventListener("click", () => {
    console.log('you in the task-button boy!')
    postTask();
});

function postTask() {
    const inputVal = document.getElementById("task").value;

    const postObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item: `${inputVal}`
        })
    };
    fetch('http://localhost:3333/api/postTask', postObj)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(() => getAllItems())
        .catch((err) => console.log(err))
}

function deleteTask(todelete) {
    console.log('in delete task!', todelete)
    const deleteObj = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ _id: `${todelete}` }),
    }
    fetch('http://localhost:3333/api/deleteTask', deleteObj)
        .then((data) => data.json())
        .then((stuff) => {
            console.log(stuff);
        })
        .then(() => getAllItems())
        .catch((err) => {
            console.log(err);
        })
};