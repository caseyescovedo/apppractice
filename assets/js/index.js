

const listHead = document.querySelector('#task-list');
const input = document.querySelector('#task');
const AddButton = document.querySelector('#task-button');
const getTask = document.querySelector('#retrieve')


let itemList;


AddButton.onclick = () => {
    const newItemName = input.value;
    addItem(newItemName);
    displayOnPage(newItemName);

    input.value = '';
    input.focus();
};

getTask.onclick = () => {
    retrieve();
}

function addItem(itemName) {
    // modify global array

    fetch('/post', {
        method: 'POST',
        body: JSON.stringify({ item: itemName }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        console.log('response for adding item is: ', response);
        // if there's an error don't append new item to the document
    });

    // printItemOut(itemName);
}



function retrieve() {
    fetch('/get')
        .then((response) => response.json())
        .then((data) => {
            // console.log('fetch data: ', data);
            itemList = data; // store the data to global variable for future use when sending patch request
            console.log(itemList);
            data.forEach((obj) => {
                displayOnPage(obj.item);
            });
        });
}

const allItems = document.querySelectorAll('li');


function resetList(array) {
    array.forEach(li => console.log(li.id))
}

console.log(resetList(allItems))

function displayOnPage(itemName) {
    // create new todo item on page with delete button
    const newTask = document.createElement('li');
    newTask.setAttribute('id', `${itemName}`);
    const newTaskText = document.createElement('span');
    const newListButton = document.createElement('button');
    newListButton.setAttribute('id', `${itemName}`);
    newListButton.setAttribute('class', "remove");

    newTask.appendChild(newTaskText);
    newTaskText.textContent = itemName;
    newTask.appendChild(newListButton);
    newListButton.innerHTML = 'X';
    // asign the handleDelete function to the button
    newListButton.onclick = handleDelete;

    // append the entire set to listHead
    listHead.appendChild(newTask);
}

function handleDelete(event) {
    console.log(event.target.id);
    const taskTitle = event.target.id.split('-')[0];
    const itemToRemove = document.querySelector(`#${taskTitle}`);
    listHead.removeChild(itemToRemove);
    resetList(allItems);

    fetch('/delete', {
        method: 'DELETE',
        body: JSON.stringify({ taskTitle }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        console.log('response from patch request (for delete app) is: ', response);
        // if there's an error don't append new item to the document
    });
}