const getButton = document.getElementById('retrieve');

getButton.addEventListener('click', () => {
  const list = document.getElementById('task-list');
  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }
})
getButton.addEventListener('click', () => {
  $.get('/api', (data) => {
    for(let i = 0; i < data.length; i++) {
      const list = document.getElementById('task-list');
      const newList = document.createElement('li');
      newList.innerHTML = data[i].item;
      const newButton = document.createElement('button');
      newButton.innerHTML = 'X';
      newButton.setAttribute('class', 'remove');
      newButton.setAttribute('taskID', data[i]._id);
      newList.appendChild(newButton);
      list.appendChild(newList);
      newButton.addEventListener('click', () => {
        $.ajax({
          url: '/api',
          type: 'DELETE',
          contentType: "application/json;charset=utf-8",
          data: JSON.stringify({_id : newButton.getAttribute('taskID')}),
          success: newButton.parentElement.remove()
        })
        
      })
    }
  })
})

const addButton = document.getElementById('task-button');
addButton.addEventListener('click', () => {
  const input = document.getElementById('task');
  $.ajax({
      url: '/api', 
      type: 'POST',
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify({item :input.value}),
      success: () => {input.value = ''}
  })
})