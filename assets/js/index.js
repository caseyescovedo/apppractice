// wrap in IIFE to not pollute the window namespace
(function() {
  console.log('in index.js');
  document.addEventListener('DOMContentLoaded', () => {
    function appendToDOM(tasks) {
      const taskList = document.querySelector('#task-list');
      tasks.forEach((task) => {
        const listItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('data-id', task.id);
        deleteButton.innerText = 'X';
        listItem.innerText = task.item;
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
      });
    }

    // global event listener that only run functionality if one of the if clauses match
    document.body.addEventListener('click', (e) => {
      if (e.target.id === 'task-button') {
        console.log();
        const item = document.querySelector('#task').value;
        fetch('/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ item }),
        })
          .then(res => res.json())
          .then(tasks => {
            const taskList = document.querySelector('#task-list');
            if (taskList.children.length) {
              const newestTask = [tasks[tasks.length - 1]];
              appendToDOM(newestTask);
            }
          })
          .catch(err => console.log(err)); 
        document.querySelector('#task').value = '';
      }
  
      if (e.target.id === 'retrieve') {
        const taskList = document.querySelector('#task-list');
        if (!taskList.children.length) {
          fetch('/task')
          .then(res => res.json())
          .then(tasks => {
            appendToDOM(tasks);
          })
          .catch((err) => console.log(err));
        }
      }

      if (e.target.dataset.id) {
        fetch('/task', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: e.target.dataset.id }),
        });
        e.target.parentNode.remove();
      }
    });
  });
} ());