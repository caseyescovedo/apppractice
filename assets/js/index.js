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
          const parent = event.target.parentNode
          const parentText = parent.innerHTML
          let output = "";
          for (let i = 0; i < parentText.length; i += 1) {
            if (parentText[i] === '<') {
              break;
            } else {
              output += parentText[i]
            }
          }
          console.log(output)
          // remove element from list
          const grandparent = parent.parentNode;
          grandparent.removeChild(parent)
          // post to database to delete it
          const delSend = {
            name: output
          }
          fetch('/deleteTask', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(delSend),
          })
          

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

