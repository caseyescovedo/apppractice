window.onload = function(){

  function getTasks() {
    fetch('/tasks')
    .then(resp => resp.json())
    .then(tasks => {
      const list = document.getElementById('task-list')
      list.innerHTML = '';
      // tasks.forEach((task => {
      //   addTasktoDOM(task)
      // }));
      tasks.forEach(addTasktoDOM)
    })
    .catch(err => console.log('Error while getting tasks: ', err))
  }

  //getTasks();
  document.getElementById("retrieve").addEventListener('click', getTasks)

  document.getElementById("task-button").addEventListener('click', (e) => {
    e.preventDefault();

    const taskInput = document.getElementById('task');

    const body = {
      task: taskInput.value,
    }

    fetch('/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body),
    }) 
    .then(resp => resp.json())
    .then(task => {
      taskInput.value = '';
      addTasktoDOM(task);
    })
    .catch(err => console.log('Err during posting: ', err))
  })

  function addTasktoDOM(task) {
    const newLi = document.createElement('li');
    newLi.innerText = task.item;
    newLi.id = task._id;
    const button = document.createElement('button');
    button.innterText = 'X';
    button.addEventListener('click', () => {
      fetch(`/tasks/${reminder._id}`, {
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(task => {
        console.log(task);
      })
      .catch(err => console.log('Error during delete ', err));
    })
    newLi.appendChild(button);
    document.getElementById('list').appendChild(newLi);
  }

}