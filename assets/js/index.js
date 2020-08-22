const getTasksButton = document.getElementById('retrieve')
const taskList = document.getElementById('task-list')
const addTask = document.getElementById('task-button')
const taskInput = document.getElementById('task')

getTasksButton.addEventListener(('click'), ()=>{
  console.log('working')
  if (taskList.childNodes.length === 0) {
    fetch('/getItems')
    .then((data)=>{
      return data.json()
    })
    .then((data)=>{
      console.log(data)
      data.forEach((el)=>{
        const listItem = document.createElement('li');
        listItem.innerHTML = el.item;
        const listButton = document.createElement('button');
        listButton.innerHTML = 'X'
        listButton.className = 'remove'
        listItem.appendChild(listButton);
        taskList.appendChild(listItem)

        // const remove = document.querySelector(".remove")
        listButton.addEventListener(('click'), (event)=>{
          console.log(event.target)
          
        })
      })
    })
  }
})

addTask.addEventListener(('click'), ()=>{
  const value = taskInput.value;
  const send = {
    addItem: value
  }
  fetch('/addTask', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(send),
  })
})

