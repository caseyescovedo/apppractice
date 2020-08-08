// const { delete } = require("request") <-- where did this come from?

let url = 'http://localhost:3333/tasks'

const addTask = () => {
  console.log('task added')
  let newTask = document.getElementById('task').value;
  fetch(url, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({item: newTask, created_at: Date.now()})
  })
}

const getTasks = () => {
  console.log('entered getTasks')
  fetch(url, {method: 'GET'})
  .then(res => res.json())
  .then(data => {
      for (let i = 0; i < data.length; i++){

        let line = document.createElement('li')
        line.setAttribute('id', `item${data[i].id}`)

        let removeButton = document.createElement('button')
        removeButton.innerText = 'X'
        removeButton.setAttribute('class', 'remove')
        removeButton.setAttribute('onClick', 'removeTask(`${this.id}`)')

        let lineText = data[i].item

        line.innerText = `${lineText}`

        if(!document.getElementById(`item${data[i].id}`)){
            document.getElementById('task-list').appendChild(line)
            document.getElementById(`item${data[i].id}`).appendChild(removeButton)
        }
      }
  })
}

const removeTask = () => {
  fetch(`${url}/${id}`, {
      method: 'DELETE'
  })
  document.getElementById(`item${id}`).remove();
}