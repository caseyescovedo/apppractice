const TaskModel = require("../../server/models/TaskModel");
//select a button and create evenlistener
const button = document.querySelector('button');
button.addEventListener('click', ()=> {
    const inputField = task.value;
    const postObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        //from DB
        body:JSON.stringify({
            item: inputField,
            created_at: '4:09'
        })
    }
})
//create a unordered list
const list = document.createElement('ul')
//loop through the input given by user
for(let elem of inputField) {
    //create a list
    const items = document.createElement('li');
    items.innerText = elem;
    //append to list
    list.appendChild(items)
}
body.appendChild(list)