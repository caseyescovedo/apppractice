document.addEventListener('DOMContentLoaded', (event) => {

  //get tasks button 
  const getTasksBtn = document.getElementById('retrieve');

  //task list element to append tasks to
  const taskList = document.getElementById('task-list');

  //input field form for new task 
  const inputForm = document.getElementById('task');

  //add task button 
  const addTaskBtn = document.getElementById('task-button');


  //----add a delete button to each task and give it an li tag--------------------------//
  const addTaskToDoc = (task) => {
    const taskItem =  document.createElement('li');
    taskItem.innerHTML = task.item;
    taskItem.id = task._id;

    //delete button 
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'X'
    taskItem.appendChild(deleteButton);

    //delete a task 
    const deleteTask = (id) => {
      //fetch request to delete 
      fetch('/' + id, {
        method: 'DELETE',
      })
      .then(res => res.json);
    }
     //add event listener to delete button 
     deleteButton.addEventListener('click', () => {
      deleteTask(taskItem.id);
      taskItem.remove();
      deleteButton.remove();
    })

    taskList.appendChild(taskItem);
  }

  //--------------------------------------------------------------------------------------//
  //get all tasks and display them on the task-list element 
    //invoke addTaskDoc and iterate through data to give each item a button and an li
  const getAllTasks = () => {
    fetch('/getAllTasks')
      .then(res => res.json())
      .then(data => {
        //each time clear the taskList
        taskList.innerHTML = ''
        data.forEach(addTaskToDoc)
      })
    }

   //add event listener to get tasks button 
    getTasksBtn.addEventListener('click', () => {
      getAllTasks();
    })
  


 //-------------------- Add task from FORM ----------------------------//
  const addNewTask = () => {
    //fetch request to make a post 
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item: inputForm.value }),
    })
    .then(res => res.json())
    .then(data => {
      addTaskToDoc(data);
    })
  }

   //add event listener to add task button 
   addTaskBtn.addEventListener('click', () => {
      addNewTask();
      
  })

})

  

