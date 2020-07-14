function getTasks() {
  fetch('/display-task')
    .then(response => response.json())
    .then(data => {
      const ulTaskList = document.querySelector('#task-list)');
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
