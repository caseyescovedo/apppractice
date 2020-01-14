// Function handlers for delete buttons
function deleteTask(e) {
  id = e.target.value;
  let data = {_id: id};
  fetch('/task', {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(() => {
    console.log('Success:');
    document.getElementById(id).remove();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function that creates a task and appends it to the DOM
function createTask(data){
  let listNode = document.createElement('li');   
  listNode.id = data._id;            
  let text = document.createTextNode(data.item +' '+data.created_at);       
  listNode.appendChild(text); 
  // Creating element button and appending it to the list 
  let deleteButton = document.createElement('button');
  deleteButton.value = data._id;
  deleteButton.classList.add = 'remove';
  deleteButton.addEventListener('click',deleteTask, false);
  text = document.createTextNode('Delete');
  deleteButton.appendChild(text);
  listNode.appendChild(deleteButton); 
  // Appending list to the DOM                        
  document.getElementById('task-list').appendChild(listNode); 
}

// Adding Event Listener to Add Task button
document.getElementById('task-button').addEventListener("click", function(){
  // Getting task to send to the db to be saved via fetch post request
  task = document.getElementById('task').value;
  // Checking if there is no data don't do anything
  if (task === '') return console.log('No data was sent...');
  document.getElementById('task').value = '';
  data = {item: task};  
  fetch('/task', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    // Updating the DOM to show new updated task
    console.log('Success:', data);
    // Creating element list and appending data
    createTask(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

// Adding Event Listener to Get Task button
document.getElementById('retrieve').addEventListener("click", function(){
  // Cleaning the dom before appending --- Not working ???
  document.getElementById('task-list').remove();
  let ulElement = document.createElement('ul');
  ulElement.id = 'task-list';
  document.getElementById('create').appendChild(ulElement);
  fetch('/task')
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    // Creating element list and appending data
    data.forEach(obj=> {
      createTask(obj); 
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
