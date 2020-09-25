const getTaskButton = document.querySelector('#retrieve');
const newTaskField = document.querySelector('#task');
const addTask = document.querySelector('#task-button');
const taskList = document.querySelector('#task-list');

let newTask = '';
newTaskField.addEventListener('change', () => {
  newTask = newTaskField.value;
})

const deleteTask = () => {
  let task = event.target.id;
  fetch('/api/delete', {
    method: "DELETE",
    headers: {
      "Content-Type" : "Application/JSON"
    },
    body: JSON.stringify({task})
    //getting error: Unexpected token " in JSON at position 0
    //isn't JSON supposed to start with a quote? cannot find this error online
  })
  .then(res => {
    let item = document.querySelector(`#list${task}`);
    taskList.removeChild(item);
  })
  .catch(err => console.log('Error: ', err));
}

const fetchTasks = () => {
  fetch('/api')
    .then(response => response.json())
    //response is an array of objects-iterate over it to create items
    .then(data => {
      let length = document.querySelectorAll('li').length;
      //only iterate over data starting at ones that haven't been appended
      for (let i = length; i < data.length; i++) {
        let listItem = document.createElement('li');
        let listButton = document.createElement('button');
        listItem.id = "list" + JSON.stringify(data[i].id);
        listButton.className = 'remove';
        listButton.id = JSON.stringify(data[i].id);
        listButton.innerText = 'X'
        listItem.innerText = data[i].item;
        listItem.appendChild(listButton);
        taskList.appendChild(listItem);
        listButton.addEventListener('click', deleteTask);
      }
    })
    //after this, remove the event listener so it can't be clicked again
    // .then(res => getTaskButton.removeEventListener('click', fetchTasks))
    .catch(err => console.log('Error: ', err));
}

const postTask = () => {
  let task = newTask;
  fetch('/api/post', {
    method: 'POST',
    headers: {
      "Content-Type" : "Application/JSON"
    },
    body: JSON.stringify({task})
  })
  .then(res => {
    const taskList = document.querySelector('#task-list');
    let listItem = document.createElement('li');
    let listButton = document.createElement('button');
    listButton.className = 'remove';
    listButton.innerText = 'X'
    listItem.innerText = newTask;
    listItem.appendChild(listButton);
    taskList.appendChild(listItem);
  })
  .catch(err => {
    console.log('Error: ', err)
  })
}

getTaskButton.addEventListener('click', fetchTasks);
addTask.addEventListener('click', postTask);