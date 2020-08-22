console.log('hello');
$(document).ready(function () {

  // ==================== GET ALL TASKS ==================== //
  const getTasksButton = document.querySelector('#retrieve');
  const taskList = document.querySelector('#task-list');

  getTasksButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/tasks')
      .then(res => res.json())
      .then(data => {
        let taskMap = [];
        data.forEach((itemObj) => {
          taskMap.push(itemObj)
        });
        return taskMap;
        // let li = document.createElement('li');
        // li.id = "list" + index;
        // li.innerHTML = itemObj.item

        // let buttonDelete = document.createElement('button');
        // buttonDelete.id = "buttonDelete" + index;
        // buttonDelete.className = 'remove';
        // buttonDelete.innerHTML = 'X';

        // li.append(buttonDelete);
        // taskList.append(li);
      })
      .then(arr => {
        arr.forEach((itemObject, index) => {
          let li = document.createElement('li');
          li.id = "list" + index;
          li.innerHTML = itemObject.item

          let buttonDelete = document.createElement('button');
          buttonDelete.id = "buttonDelete" + index;
          buttonDelete.className = 'remove';
          buttonDelete.innerHTML = 'X';

          const check = document.querySelector(`#list${index}`);
          console.log('==========> check: ', check)
          if (!check) {
            li.append(buttonDelete);
            taskList.append(li);
          }
        })
      })
      .catch(err => {
        console.log('secret.js get request error: ', err)
      })
  })
  // ==================== GET ALL TASKS ==================== //




  // ==================== GET ALL TASKS ==================== //


})