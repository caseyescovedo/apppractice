function fetchTasks() {
    fetch('http://localhost:3333/secret/gettasks')
      .then(res => {
       res.json()
    console.log(res)
    })
      .then(res => {
        console.log('next res',res)
        if (task.tasks) {
          const taskList = document.getElementById('task-list');
          taskList.innerHTML = ''
          data.task.forEach(item => addItemToTaskList(item))
        }
      })
      .catch(err => console.log(err));
  

  }

  function addItemToTaskList(task) {
    // add li for task item
    const item = document.createElement('li');
    item.setAttribute('id', task._id)
    item.innerHTML = `${task.task}<button class='del' id='delete-${task._id}'>Delete</button>`
  
    const taskList = document.getElementById('task-list');
    taskList.appendChild(item)
    addDeleteButtonListener(task._id);

  }

  function sendTaskToDB(task) {
    fetch('http://localhost:3333/secret/post', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task
        })
      })
      .then(res => res.json())
      .then(data => addItemToTaskList(data.task))
  }
  

  function addTaskListener() {
    const submitButton = document.getElementById('task-button');
    const retrieveButton = document.getElementById('retrieve');
    const description = document.getElementById('task')

  
    submitButton.addEventListener('click', () => {
        console.log("hitting the submit button")
        sendTaskToDB(description.value);
  
        /* reset values to empty strings */
        description.value = '';
      }
    )
      retrieveButton.addEventListener('click',()=>{console.log('hitting retrieveButton')},
      fetchTasks())

  
  }


  window.onload = () => {
    fetchTasks()
  
    addTaskListener();
  }


