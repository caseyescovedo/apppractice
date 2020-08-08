

document.addEventListener('DOMContentLoaded' , function () {

    const addButton = document.getElementById('task-button');
    addButton.onclick = () => {
        addTask();
    }
    const getTasks = document.getElementById('retrieve');
    getTasks.onclick = () => {
        loadTasks();
    }
    
});

// get all tasks from db - GET request
function loadTasks() {
    console.log('loading...');

    fetch('http://localhost:3333/secret/items' , {
        method: 'GET'
    })
      .then(response => response.json())
        .then(data => {
            console.log('data' , data);
            data.forEach(item => {
                if(!document.getElementById(item._id)){
                    displayItem(item);
                }})});

};

// display each task (item)

function displayItem(item) {
    // create a new line item 
    console.log('item.item' , item.item)
    let newTask = document.createElement('li');
        newTask.innerText = `${item.item}`;
        newTask.setAttribute('id' , `${item._id}`);
    let deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click' , () => deleteTask(item._id));
        newTask.appendChild(deleteButton);
    let taskList = document.getElementById('task-list');
        taskList.appendChild(newTask);
};


// add a task - POST request

 function addTask() {

    fetch('http://localhost3333/secret/item' , {
        method: 'POST' , 
        headers: {
            item : document.getElementById('task').value 
        }
    })
      .then(response => response.json())
        .then((data) => {
            document.getElementById('task').value = '';
        })
          .catch(error => {
              console.log('Error' , error);
          })
 };

 // delete a task - DELETE request 

 function deleteTask(_id) {
     fetch(`/item/${_id}` , {
         method: 'DELETE' , 
         headers: {
             'Content-Type' : 'application/json'
         }
     })
       .then(response => response.json())
         .then(data => {
             if(data.deleted){
                 let toBeRemoved = document.getElementById(_id);
                 console.log('toBeRemoved' , toBeRemoved);
                 toBeRemoved.parentNode.removeChild(toBeRemoved);
             }
         })
           .catch(error => console.log('Error' , error));
 };

  /* 
    I'm almost there. There is an error that I can't quite seem to fix in my taskModel, 
    and so I can't get the browser to load properly, so it's making the last part of this test 
    a little difficult to figure out. 
    For the most part, I believe most of my logic is sound.  I'm sure there are a few things
    I'm just so close to, but missing. 
    The one I would like the most help on, actually, seems so obvious but I'm missing some key element here : 
    Where do I add the submit onclick functionality  for the index.html page? I know it's gotta be 
    here - like, literally  above the code for the secret page above - but if the submit logic -- which I believe would be a post request 
    and then either  redirect to the secret page OR return the string mentioned in the README -- is indeed in here, then doesn't that mean 
    I need to pass this index.js file to the head of the index.html file too, as a src tag?
    I commented it out in the index.html file where it would go.  grrr so close. I just need some help with this one question. 
    But, on the whole, for me, this was a massive improvement and Denis is my hero forever and ever amen.  
    
    */
