const getTasks = document.querySelector('#retrieve');
let hasClicked = false;

const addTask = document.querySelector('#task-button');
const inputfield = document.querySelector('#task');

const deleteItem = document.querySelector('.remove')



getTasks.addEventListener('click', (e) => {
    
    e.preventDefault();
    fetch('/getTasks')
    .then(res => res.json())
    .then(data => {
      //  console.log(data);
      if(!hasClicked){
       const {allTasks} = data;
       //console.log(allTasks);
       allTasks.forEach(ele => {
        let tasks = document.createElement("li"); 
        let taskList = document.querySelector('#task-list');
        tasks.innerHTML = `${ele.items}<button class="remove">X</button>`;
        taskList.appendChild(tasks);  
       })
       hasClicked = true;
    }
    
    
    })
    .catch(err => console.log('fetching all tasks errr: ' , err))
})


/*
cannot add task because something is wrong when I try to retreive req.body item
*/

addTask.addEventListener('click', (e) => {
   // console.log(inputfield.value);
    e.preventDefault();
   let currentDate = new Date();
   let stringedTime = currentDate.toString();
    fetch('/newtask', {
     method: 'POST', 
     headers: {
          'Content-Type': 'application/json',
             },
     body: JSON.stringify({
         'items' : inputfield.value,
         "created_at" : stringedTime
     }),
      })
    .then(res => {
        console.log(res.json())
      return res.json();
    })
    .then(data => {
        console.log(data);
        // let tasks = document.createElement("li"); 
        // let taskList = document.querySelector('#task-list');
        // tasks.innerHTML = `${data.items}<button class="remove">X</button>`;
        // taskList.appendChild(tasks); 
    })
    .catch(err => console.log(err))
    
})

deleteItem.addEventListener('click', (e) => {
    console.log(e);
    //delete item is currently null 
    /*
      Final thing i got up to during this project

    */
    e.preventDefault();
    fetch('/deleteTask', {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
               },
       body: {  }
    })
})