window.onload = () => {
    console.log('HELLO ANYONE THERE?')
    document.getElementById('task-button').addEventListener('click', () => {
      let taskID = document.getElementById('task').value
      console.log(taskID)
      fetch('/postTasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            item: taskID,
            created_at: new Date()
        })
      })
    })
    
    document.getElementById('retrieve').addEventListener('click', () => {
        fetch('/getTasks')
        .then(response => response.json())
        .then(data => {
            document.getElementById('task-list').innerHTML = '';
            data.messages.forEach(val => {
              console.log(data);
                let newList = document.createElement('li');
                let newMessage = document.createTextNode(val.item)
                let newButton = document.createElement('button')
                newButton.addEventListener('click', deleteTask)
                newButton.classList.add('remove')
                newButton.id = val.id;
                newButton.innerHTML='X'
                newList.appendChild(newMessage)
                newList.appendChild(newButton)
                document.getElementById('task-list').appendChild(newList)
            })
        })
    })

    function deleteTask (e) {
      let id = e.target.id
      fetch(`/deleteTask/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}, 
      })
      .then(response => response.json())
      .then(data => {
          console.log('remove:', data)
          if(data.success){
            let toBeRemoved = document.getElementById(id);
            console.log('toBeRemoved' , toBeRemoved);
            toBeRemoved.parentNode.remove(toBeRemoved);
            }
           })
        .catch(error => console.log('Error' , error));
      };
}
