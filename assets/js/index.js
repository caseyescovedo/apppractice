const getTasksButton = document.getElementById('retrieve')
const taskList = document.getElementById('task-list')


getTasksButton.addEventListener(('click'), ()=>{
  console.log('working')
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
      })
    })
})
