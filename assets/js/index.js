const updatingDOM = (tasks) => {
    const newTask = document.createElement('li');
    newTask.innerText = tasks.item;
    newTask._id = tasks._id;
    const button = document.createElement('button');
    button.innerText = 'Done'
    button.addEventListener('click', () => {
      fetch(`/secret/${newTask._id}`, {
        method: "DELETE",
      })
        .then(res => {
          document.getElementById('task-list').removeChild(newTask)
        })
        .catch(err => console.error("an error occured: ", err.message))
    })
    newTask.appendChild(button);
    document.getElementById('task-list').appendChild(newTask);
  }
