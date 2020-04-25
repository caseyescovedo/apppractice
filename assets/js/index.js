console.log('goodbye')

const getTasks = () => {
  fetch(`/tasks/getTasks`)
    .then(res = res.json())
    .then(tasks => {
      const taskList = document.getElementsByClassName('task-list');
      taskList.innerHTML = '';
      tasks.forEach(task => {
        addTasksToDOM(task)
        console.log('Added task to DOM: ')
      }) 
    })
}