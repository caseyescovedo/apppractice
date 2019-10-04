window.onload = () => {
  const taskTextBox = document.getElementById('task');
  const postTask = document.getElementById('task-button');
  const getTasks = document.getElementById('retrieve');
  const taskList = document.getElementById('task-list');
  const deleteTask = document.getElementsByClassName('remove');

  getTasks.addEventListener('click', ()=> {
    fetch('/tasks')
    .then(res => res.json())
    .then(data => {
      data.forEach(task => {
        const listItem = document.createElement('li');
        const removeButton = document.createElement('button');
        removeButton.className = 'remove';
        listItem.id = 'item';
        listItem.name = task._id;
        listItem.innerText = task.item;
        removeButton.innerText = 'X';
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
      })
    })
    .catch(e => {
      console.log(`Error back on the front end following request to get all tasks: ${e}`)
    })
  })
  
  postTask.addEventListener('click', () => {
    const task = taskTextBox.value;
    let time = new Date();
    const timeStamp = time.toTimeString()
    fetch('/task', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        item: task,
        timeAdded: timeStamp
      })
    })
    .then(res => res.json())
    .then(data => {
      const listItem = document.createElement('li');
      const removeButton = document.createElement('button');
      removeButton.className = 'remove';
      listItem.id = 'item';
      listItem.name = data._id;
      listItem.innerText = data.item;
      removeButton.innerText = 'X';
      listItem.appendChild(removeButton);
      taskList.appendChild(listItem);
      taskTextBox.value = '';
    })
    .catch(e => {
      console.log(`Error back on the front end following request to post new task: ${e}`)
    });
  })

  deleteTask.addEventListener('click', () => {
    const itemId = deleteTask.name;
    fetch('/task', {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        item: itemId
      })
    })
    .then(rex => res.json())
    .catch(e => {
      console.log(`Error back on the front end following request to delete task: ${e}`)
    })
  })
}