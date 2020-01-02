document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOM fully loaded and parsed');
  
  // get task button
  const retrieveBtn = document.getElementById('retrieve');
  // the area that is holding all task li(s)
  const taskList = document.getElementById('task-list');
  // add task button
  const taskBtn = document.getElementById('task-button');
  // text area to enter new task --> where we grab new task.value from
  const taskInput = document.getElementById('task');
  // delete X button --> by Class name not ID
  const deleteBtn = document.getElementsByClassName('del');

  // get task button logic
  retrieveBtn.addEventListener('click', () => {
    fetch('/getTasks', {
      method: 'GET', 
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      // prevent duplicates of messages by clearing out innerHTML of tasklist
      taskList.innerHTML = '';
      for(let i = data.length - 1; i >= 0; i -=1) {
        let newLi = document.createElement('li');
        newLi.innerText = data[i].item;
        taskList.appendChild(newLi);
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'del';
        deleteBtn.innerText = 'X';
        newLi.appendChild(deleteBtn);
        let id = data[i]._id;
        deleteBtn.addEventListener('click', () => {
          deleteTask(id);
          taskList.removeChild(newLi);
        })
      }
    });
  })

  // add task button logic 
  taskBtn.addEventListener('click', () => {
    let newTask = taskInput.value;
    console.log(newTask);
    addTask(newTask);
  });
  
  // add task function 
  function addTask(newTask) {
    fetch('/add', {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      }, 
      body: JSON.stringify({ item: newTask })
    })
    .then(resp => resp.json())
    .then(data => {
      // most recently added task on top --> iterating backwards
      for(let i = data.length - 1; i >= 0; i -=1) {
        let newLi = document.createElement('li');
        newLi.innerText = data[i].item;
        taskList.appendChild(newLi);
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'del';
        deleteBtn.innerText = 'Delete';
        newLi.appendChild(deleteBtn);
      }
    })
  }

  // delete task / button function 
  function deleteTask(id) {
    fetch(`/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
  }
});