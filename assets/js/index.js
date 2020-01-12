

{/* <div id="create">
    <input id="task" placeholder="enter new task" type="text"></input>
    <button id="task-button">Add Task</button>
    <button id="retrieve">Get Tasks</button>
  </div>
  <ul id="task-list"></ul> */}
const mainDiv = document.querySelector('#task-list');

const typeBox = document.querySelector('#task');
typeBox.addEventListener('change', (event)=> {
    console.log(event.target.value)
})


const addButton = document.querySelector('#task-button');
addButton.addEventListener('click', (event)=> {
    let task = typeBox.value;
    let text = document.createElement('li')
    let deleteBtn = document.createElement('BUTTON')
    deleteBtn.classList.add("remove");
    deleteBtn.innerText = 'X';

   
    text.appendChild(document.createTextNode(task));
    text.appendChild(deleteBtn);
    mainDiv.appendChild(text)
    console.log('clicked add task button')
    typeBox.value = '';
    let postValue = {item: task}
    // mainDiv.appendChild()
    fetch('/addTask', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(postValue) // body data type must match "Content-Type" header
      })
      .then((res) => {
          console.log(res)
      })
    
})

const getButton = document.querySelector('#retrieve');
getButton.addEventListener('click', (event)=> {
    console.log('clicked get tasks')
    console.log(document.querySelector('.checker'))
    if (document.querySelector('.checker')) {
        return ;
    }
    let hidden = document.createElement('p')
    hidden.classList.add("checker");
    document.querySelector('body').append(hidden)
    fetch('/getTasks' )
    .then(res => res.json())
      .then((data) => {
        console.log('inside index.js res', data);
        data.forEach((task, idx)=> {
            let value = task.item;
            let text = document.createElement('li')
            text.id = idx;
            text.className = task._id;
            let deleteBtn = document.createElement('BUTTON')
            deleteBtn.id = idx;
            deleteBtn.addEventListener('click' , (event) => {
                console.log(event.target.parentNode)
                let btnId = event.target.id;
                let listItem = document.getElementById(`${btnId}`);
                listItem.parentNode.removeChild(listItem)
                fetch('/deleteTask', {
                    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                      'Content-Type': 'application/json'
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *client
                    body: JSON.stringify({id: listItem.className}) // body data type must match "Content-Type" header
                  })
                  
            })
            deleteBtn.classList.add("remove");
            deleteBtn.innerText = 'X';
            text.appendChild(document.createTextNode(value));
            text.appendChild(deleteBtn);
            mainDiv.appendChild(text)
            
        })
        
      })
      
      ;
    
})

// const deleteButton = document.querySelectorAll('.remove');
// console.log(deleteButton)
// deleteButton.addEventListener('click' , (event) => {
//     event.parentNode.parentNode.removeChild(event.parentNode.parentNode)
//     return;
// })