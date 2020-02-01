//<li>Go shopping <button class="remove">X</button></li>
let button = document.getElementById('retrieve');
let adder = document.getElementById('task-button');

function removeItem(){
    fetch('/task', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({task: this.value}),
    })
}

let pressed = false;
function display(res){
    for(let i = 0; i < res.length; i++){
        let listItem = document.createElement('li');
        listItem.innerHTML = res[i].item;
        let but = document.createElement('button');
        but.className = "remove";
        but.innerHTML = 'X';
        but.value = res[i].item;
        but.addEventListener('click', removeItem);
        listItem.appendChild(but);
        document.getElementById("task-list").appendChild(listItem);
    }
}

button.addEventListener('click', function(){
    if(!pressed){
    fetch('/task', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((response) => {
        display(response);
    })
    .catch((err) => {
        console.log("Error: ", err);
    })
    pressed = true;
}
});

adder.addEventListener('click', function(){
    fetch('/task', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({task: document.getElementById('task').value}),
    })
});