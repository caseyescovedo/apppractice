document.addEventListener("DOMContentLoaded", () => {


  const submit = document.getElementById('task-button');
  submit.addEventListener('click', () => {

     const content = document.querySelector('#task').value;
     document.querySelector('#task').value = '';
     const data = { item: content };

     fetch('/task', {
       method: "POST",
       headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify(data),
     })
     .then(res => res.json())
     .then(data => {

       const taskList = document.getElementById('task-list');

       const task = document.createElement('li');
       task.innerText = data.item;
       task.id = data._id;

       const button = document.createElement('button');
       button.innerText = 'X'
       button.classList.add('remove');
       button.id = data._id;

       task.appendChild(button);
       taskList.appendChild(task);

       content.value = '';
     })
     .catch(err => console.error(err));
  })


  const getTasks = document.getElementById('retrieve');
  getTasks.addEventListener('click', () => {

     fetch('/tasks')
     .then(res => res.json())
     .then(data => {

       const taskList = document.getElementById('task-list');

        data.forEach(row => {

          const task = document.createElement('li');
          task.innerText = row.item;
          task.id = row._id;

          const button = document.createElement('button');
          button.innerText = 'X'
          button.classList.add('remove');
          button.id = row._id;

          task.appendChild(button);
          taskList.appendChild(task);
        });
     })
     .catch(err => console.error(err));
  })


  document.addEventListener('click', function (event) {

  	if (!event.target.matches('.remove')) return;
  	event.preventDefault();

      fetch('/delete', {
        method: "POST",
        headers: {
         "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: event.target.id }),
      })
     .then(res => {
       event.target.parentNode.remove();
     })
     .catch(err => console.error(err));

  }, false);

});
