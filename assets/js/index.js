const getTasksButton = document.getElementById('retrieve');
let hasTasksButtonBeenClicked = false;
function fetchedTasksAndAppendToDom (result){
    if(!hasTasksButtonBeenClicked){
        result.getTasks.forEach(el =>{
            const appendTo = document.getElementById('task-list');
            const listItem = document.createElement('li');
            listItem.innerHTML = el.item;
            listItem.setAttribute('id', `${el._id}`)
            const buttonX = document.createElement('button');
            buttonX.setAttribute('class', 'remove');
            buttonX.innerHTML = 'X';
            listItem.appendChild(buttonX);
            appendTo.appendChild(listItem);
            hasTasksButtonBeenClicked = true;
        })
    } else {
        const appendTo = document.getElementById('task-list');
        const listItem = document.createElement('li');
        listItem.innerHTML = result.item;
        const buttonX = document.createElement('button');
        buttonX.setAttribute('class', 'remove');
        buttonX.innerHTML = 'X';
        listItem.appendChild(buttonX);
        appendTo.appendChild(listItem);
    }
   
}

getTasksButton.addEventListener('click', (e)=>{
    fetch('/getItems')
    .then(res => res.json())
    .then(result =>{
        const getNumOfLiItems = document.querySelectorAll('li');
        if (!hasTasksButtonBeenClicked){
            fetchedTasksAndAppendToDom(result);
        } else if(getNumOfLiItems !== result.getTasks.length) {
            fetchedTasksAndAppendToDom(result.getTasks[result.getTasks.length - 1]);
        } else {
            alert('nah')
        }
    })
    .catch(err =>{
        return new Error('failed in /getItems in index.js')
    })
})
const addTaskButton = document.getElementById('task-button');
addTaskButton.addEventListener('click', (e)=>{
    const userInputForTodo = document.getElementById('task').value;
    console.log(userInputForTodo);
    fetch('/postTask', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({input: userInputForTodo})
    })
    .catch(err =>{
        return new Error('failed in /postTask in index.js')
    })
})
//found a way to do the deletion of a li with jquery, had a hard time with vanilla :/

$(document).on('click','.remove', function() {
    var id = $(this).closest('li').attr('id');
    fetch('/deleteTask', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    })
    .catch(err =>{
        return new Error('failed in /deleteTask in index.js')
    })
    $(this).parent().remove();    
});