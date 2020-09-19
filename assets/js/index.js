

function getTasksFunc() {
  fetch('http://localhost:3333/secret/getTasks')
  .then( (res) => res.json())
  .then( (items) => {
    const outerDiv = document.createElement('div');
    for (let i=0; i < items.length;i++){

      const li = document.createElement('li');
      li.innerText = items[i.task];
      outerDiv.appendChild(li)

      const button = document.createElement('button');
      button.innerText = 'x';
      button.addEventListener('click', (e) => {
        const deleteObj = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({ taskId: items[i.task_id]}),
        };
        fetch('http://localhost:3333/secret/deleteTask',deleteObj)
        .then( (res) => res.json())
        .catch( (err) => {
          console.log(err)
        })
      })
      const list = document.getElementById('task-list')
      list.appendChild(outerDiv)
    }
  })
}

function postTaskFunc () {
  const postObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({task: input })
  }
  fetch('http://localhost:3333/secret/postTask',postObj)
  .then( (res) => res.json())
  .then(console.log('Post request sent'))
  .catch( (err) => {
    console.log(err);
  })
}

const test = document.createElement('h1')
test.innerText = 'Test'


const input = document.getElementById('task').value;
const postTask = document.getElementById('task-button');
postTask.addEventListener('click', (e) => {
  postTaskFunc();
})


const getTasks = document.getElementById('retrieve');
getTasks.addEventListener('click',(e) => {
  getTasksFunc();
})