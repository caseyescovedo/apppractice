console.log('testtt');

const getTasks = document.getElementById('retrieve');

const taskList = document.getElementById('task-list');

const create = document.getElementById('create');

getTasks.addEventListener('click', () => {
  fetch('/tasks/getTasks')
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      taskList.innerHTML = '';

      response.forEach((resp) => {
        const taskDiv = document.createElement('li');
        taskDiv.innerHTML = `${resp.item}<button id="${resp.message_id}" class="remove">X</button>`;
        taskList.appendChild(taskDiv);
      });

      document.querySelectorAll('.remove').forEach((item) => {
        item.addEventListener('click', (e) => {
        // e.preventDefault();
          console.log('e is clicked!', e.target);
        });
      });
    })
    .catch((error) => {
      console.log('Error fetching Tasks from client. Error: ', error);
    });
})