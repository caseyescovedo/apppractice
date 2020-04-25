// grab all tasks currently in DB
function getTasks() {
fetch('/get')
.then((resp) =>{
  return resp.json();
})
.then(tasks=>{
  document.getElementById('task-list').innerHTML="";

  tasks.forEach(task=>{
    const newLi = document.createElement('li');
    newLi.innerText = task.item;
    newLi.id = task._id;
   
    document.getElementById('task-list').appendChild(newLi);
   
    const button = document.createElement('button')
    button.className = "remove";
    button.innerText = 'X';
    newLi.appendChild(button);

    button.addEventListener('click', () => {
      fetch(`/delete/${task._id}`, {
        method: 'DELETE'
      })
      .then(resp =>{
        return resp.json();
      })
      .then(data=>{
        getTasks();
      })
    })
    
  })
})
.catch(err=> console.log('error in initial fetch request to grab all tasks'))
}

// initial load
getTasks();
document.getElementById('retrieve').addEventListener('click', getTasks);

// adding tasks 
document.getElementById('task-button').addEventListener('click', (e)=>{
  e.preventDefault();
  const input = document.getElementById('task').value;
  input.innerHTML="";
  const body = {
    text: input
  }

  fetch('/post', {
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(resp=>{
    console.log("successful post!")
  })
  .catch(err=> console.log('unsuccessful post!'))
})