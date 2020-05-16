window.onload = () => {
  // select the HTML element that is the button which will add a task to the DB
  const addTaskBtn = document.querySelector('#task-button');
  addTaskBtn.addEventListener('click', () => {
    const currTask = document.querySelector('#task').value;
    document.querySelector('#task').value = '';
    console.log('ADDING A TASK: ', currTask);
    fetch('/task/', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ task: currTask }),
    }).then((res) => console.log(res));
  });

  const getTasksBtn = document.querySelector('#retrieve');
  getTasksBtn.addEventListener('click', () => {
    fetch('/task/')
      .then((response) => response.json())
      .then((data) => {
        // empty the curr task list before fetch to avoid appending to current list
        // not optimal - come back to this if time allows
        document.querySelector('#task-list').innerHTML = '';
        // create the new task list
        data.forEach((task) => {
          // create the initial list element and set the task as its child
          const node = document.createElement('LI');
          const textNode = document.createTextNode(task.item);
          node.appendChild(textNode);
          // create the button and append it to the LI element
          const button = document.createElement('BUTTON');
          const buttonText = document.createTextNode('X');
          node.appendChild(button);
          button.appendChild(buttonText);
          button.setAttribute('class', 'remove');
          button.id = task.item_id;
          // removes button from the DOM
          button.onclick = function () {
            button.parentElement.remove();
            return;
          };
          document.querySelector('#task-list').appendChild(node);
        });
      });
  });

  const taskList = document.querySelector('#task-list');
  function removeTask(e) {
    const target = e.target.id;
    console.log(target.id);
    fetch('/task/', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({ deleteTask: target }),
    }).then((res) => console.log(res));
  }

  taskList.addEventListener('click', removeTask);
};
