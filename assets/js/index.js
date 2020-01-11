window.onload = function() {
  const taskList = document.getElementById('task-list');  
  const getTasksBtn = document.getElementById('retrieve');
  const addTaskBtn = document.getElementById('task-button');

  getTasksBtn.addEventListener('click', e => {
    if (taskList.childNodes.length === 0) {
      fetch('/todo')
      .then(res => res.json())
      .then(tasks => {
        console.log('tasks got from /todo: ', tasks); // this prints out all the tasks in an array: [{  id: 1, item: "do laundry", created_at: "2020-01-12T06:39:40.232Z" }, {...}, {...}]
        for (let task of tasks) {
          const listElement = document.createElement('li');

          // create the textNode that would have the todo string in it
          const textNode = document.createTextNode(task.item);
          listElement.appendChild(textNode);
          taskList.appendChild(listElement);

          // create the delete button that would appear on the right of the todo item and give it an id that matches the json task id
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'X';
          deleteBtn.className = 'remove';
          deleteBtn.id = task.id;
          listElement.appendChild(deleteBtn);
        }
      });
    }
  });
  

}










// documentation used:
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://stackoverflow.com/questions/2632137/why-is-document-getelementbyid-returning-null
