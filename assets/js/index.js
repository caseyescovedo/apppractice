$(document).ready(function() {
  console.log("document has loaded");

// assign event handlers
  document.getElementById('task-button').onclick = onClickAddTask;

  document.getElementById('retrieve').onclick = initOnClickGetTasks(); 
  function initOnClickGetTasks () {
    let runOnce = true;
    
    return (e) => {
      if (runOnce) {
        runOnce = false;
        getTasks()
        .then(data => showTasks(data.tasks));
      }
    }
 }

  function onClickRemove (e) {
    console.log(`onClickRemove with e: ${e.target.id}`);
    const listElement = document.getElementById(e.target.id + 'li');
    listElement.parentNode.removeChild(listElement);

    deleteTask(e.target.id);
  }
 

  

 
  async function deleteTask(taskId) {
    let response = await fetch(`http://localhost:3333/secret/deleteTask`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: taskId})
    });
    return await response.json();
  }


// Fetch data from server
  async function getTasks() {
    let response = await fetch(`http://localhost:3333/secret/getTasks`);
    let data = await response.json();
    return data;
  }

  async function addTask(taskDescription) {
    let response = await fetch(`http://localhost:3333/secret/addTask`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({description: taskDescription})
    });

    await response.json();
  //  getTasks()
      //  .then(data => showTasks(data.tasks));

  }



// Display tasks
  function showTasks (tasks) {
    const taskList = document.getElementById("task-list");


    while (taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    }
    

    let listElement;
    let removeButton;
    
    
    
    tasks.forEach((taskObj) => {
        removeButton = document.createElement('button');
        removeButton.className = 'remove';
        removeButton.id = taskObj.id;
        removeButton.innerHTML = 'X';

        listElement = document.createElement("LI");
        listElement.id = taskObj.id + 'li';
        listElement.innerHTML = taskObj.item + removeButton.outerHTML;
        listElement.className = "task";
        taskList.appendChild(listElement);

        document.getElementById(taskObj.id).onclick = onClickRemove;
    });
  }

  function onClickAddTask(e) {
      addTask(document.getElementById('task').value);
      console.log(newTask);
      
  }

  }); // closing bracket/parentheses for: $(document).ready(function() {