//await the dom to load before envoking javascript
document.addEventListener('DOMContentLoaded', () => {
  //get elements
  const addBtn = document.getElementById('task-button');
  const getBtn = document.getElementById('retrieve');
  //create an array of task ids to remember what has been rendered
  const tasksRendered = {};

  //declare event handlers
  //get tasks from db and render those that are not currently rendered
  const getItems = () => {
    //define path
    const path = '/tasks';

    //ajax request to server, expect array of tasks
    fetch(path)
      .then(res => res.json())
      .then(data => {
        //data is array of objs with props id, item, created_at

        //create a button element to be reused
        const btn = document.createElement('button')
        btn.className = 'remove';
        btn.innerText = 'X';
        //get taskList ui element to append to
        const taskList = document.getElementById('task-list');

        //for each element returned render the tasks
        data.forEach(el => {
          //render tasks that are not already rendered
          if(!tasksRendered[el.id]){
            //add to rendered obj
            tasksRendered[el.id] = el.id;
            //create li element
            const li = document.createElement('li');
            li.innerText = el.item;
            li.id = el.id;
            //create button element
            const btn = document.createElement('button')
            btn.className = 'remove';
            btn.innerText = 'X';
            btn.addEventListener('click', () => {deleteTask(el.id)})
            //add button as child of li
            li.appendChild(btn);
            //add li as child of ul
            taskList.appendChild(li);
          }
        })
      })
      .catch(err =>  console.log(err));
  };
  //create a new task in the db from user input
  const addTask = () => {
    //get the user input
    const el = document.getElementById('task');
    const item = el.value;
    //set the path
    const path = '/tasks';

    //fetch to desired path with new tasks item in body
    fetch(path, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({item: item})
    })
    .catch(err => console.log(err));
  };
  //remove a task from the db and from the dom
  const deleteTask = (id) => {
    //set the path
    const path = '/tasks';

    //get the ul and the li
    const taskList = document.getElementById('task-list');
    const remove = document.getElementById(id);
    //delete the li
    taskList.removeChild(remove);

    //ajax delete request to the server with id of task to delete
    fetch(path, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: id})
    })
    //delete the task from the rendered items object
    .then(() => delete tasksRendered[id])
    .catch(err => console.log(err));
  };


  //add event listeners
  getBtn.addEventListener('click', getItems);
  addBtn.addEventListener('click', addTask);
})
