/*
1. All items from database should be displayed in #task-list
2. List items should display task item followed by:
    2.1. a 'button' (inside list item)
    2.2 a class of 'remomve' and 'x' displayed 
3. Multiply clicks on the btn shouldn't display list items multiple times
4. Clicking on the 'x' should remove the item from the list right away AND should delete it from DB
     
*/

// Ensure the DOM is completely loaded 
document.addEventListener('DOMContentLoaded', (event) => {

  // select task input, task buttons, and task form
  let taskInput = document.getElementById('task');
  let addTaskBtn = document.getElementById('task-button');
  let retrieveTasksBtn = document.getElementById('retrieve');
  let taskList = document.getElementById('task-list');

  // Add the task (create li tag, put text inside)
  const addTask = task => {
    const taskItem = document.createElement('li');
    taskItem.innerText = task.item;
    taskItem.id = task._id;

    // DELETE: Add Delete task btn and function with the task
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.className = 'remove';
    deleteBtn.addEventListener('click', () => {
      fetch(`/tasks/${taskItem._id}`, {
        method: 'DELETE',
      })
        .then(() => taskList.removeChild(taskItem))
        .catch(err => console.log(`Error deleting list item /tasks/${taskItem._id} | Error message: ${err}`))
    })
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
  }

  // GET : retrieve all tasks 
  const retrieveTasks = () => {
    fetch('/tasks')
      .then(res => res.json())
      .then(tasks => {
        taskList.innerText = '';
        tasks.forEach(addTask);
      })
      .catch(err => console.log(`Error retrieving all tasks from /tasks | Error message: ${err}`))
  }

  // when get tasks is click, retrieve all tasks
  retrieveTasksBtn.addEventListener('click', () => {
    retrieveTasks();
  })

  //POST: add an event listener to add Task Btn
  addTaskBtn.addEventListener('click', () => {
    const body = {
      task: taskInput.value
    }
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(task => {
        taskInput.value = '';
        addTask(task);
      })
      .catch(err => console.log(`Error posting in /tasks route, could not add task to DB. | Error: ${err}`));

  })
})