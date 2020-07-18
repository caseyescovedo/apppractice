// click get tasks to get all tasks

//get element by id
//get getasks
const getTasks = document.getElementById('retrieve');
//get tasklist
const taskList = document.getElementById('task-list');
// aget addTask
const addTask = document.getElementById('task-button');
// get submit ele, on main page 
const submit = document.getElementById('submit');

// fetch delete  tasks

const deleteTask = (e) => {
  // grab id from button click in click even
  const id = e.target.id;
  fetch(`/api/delete/${id}`, {
    method: 'Delete',
  })
    .then((res) => res.json())
    .then((delItem) => {
      console.log(' item was deleted:', delItem);
      fetchTasks();
    });
  //call fetchTasks to refresh list
  
};

// fetch get all tasks
const fetchTasks = () => {
  taskList.innerHTML = '';
  fetch('/api/getTasks')
    .then((res) => res.json())
    .then((data) =>
      data.forEach((obj) => {
        //creation
        //list ele
        const list = document.createElement('li');
        //item ele
        const item = document.createTextNode(`${obj.item}`);
        //button ele
        const removeButton = document.createElement('button');
        // add details to removebutton
        removeButton.className = 'remove';
        removeButton.setAttribute('id', `${obj.id}`);
        removeButton.innerHTML = 'x';
        //appending
        // append list to task-list
        taskList.appendChild(list);
        //append item to list
        list.appendChild(item);
        //append button to list
        list.append(removeButton);

        // delete  functionality
        removeButton.addEventListener('click', deleteTask);
      })
    );
  // display messages as list items in task-list <li>Go shopping <button class="remove">X</button></li
};

const postTask = () => {
  // grab input data to place in post  body item
  const task = document.getElementById('task').value;
  const  newItem = { 
      item: task
  }
  console.log(newItem);
  //fetch post
    fetch('/api/postTasks', {
        method: "Post",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(newItem)
    })
    // invoke fetchtask after adding
    .then( reset =>  fetchTasks())

   
  
};

// listener click events
addTask.addEventListener('click', postTask);
getTasks.addEventListener('click', fetchTasks);



// set up redirect on submit 

const postToBody = () => {
console.log('click test submit!')
const  formData = document.getElementById('signin')
// const pass = document.getElementById('pass').value;

const  login = { 
    user: user,
    pass: pass
    }
    console.log(formData)
    fetch: 'post'
    fetch('/signin', {
        method: "Post",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(login)
    })
}

submit.addEventListener('click', postToBody)