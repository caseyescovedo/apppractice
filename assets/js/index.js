//getting tasks on button click
const getTasks = document.getElementById("retrieve");
const taskList = document.getElementById('task-list');
const addTask = document.getElementById("task-button");
const textField = document.getElementById("task");

document.getElementById("retrieve").addEventListener('click', () => {
  fetch('/getTasks')
  .then(res => res.json())
  .then(tasks => {
    console.log('tasks', tasks);
    const listItems = [];
    tasks.forEach(task => {
      listItems.push(`<li id=${task.item_id}>${task.item}<button class='remove'>X</button></li>`);
      taskList.innerHTML = listItems.join('');
    });
    addDeleteFunction();
  })
})

//adding tasks on button click

addTask.addEventListener('click', () => {
  const text = textField.value;
  textField.value = '';
  console.log(text);
  fetch('/postTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      item: text,
    })
  })
  .then(res => res.json())
  .then(task => {
    console.log(task[0]);
    const listItem = document.createElement('li');
    listItem.id = task[0].item_id;
    listItem.innerHTML = `${task[0].item}<button class='remove'>X</button>`;
    taskList.append(listItem);
    addDeleteFunction();
  })
})

//deleting tasks on button click
function addDeleteFunction() {
  const deleteButtons = document.getElementsByClassName('remove');
  console.log('deleteButtons', deleteButtons);
  for (let i = 0; i < deleteButtons.length; i++) {
    const button = deleteButtons[i];
    button.onclick = () => {
      const listItem = button.parentNode;
      fetch('/deleteTask', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: listItem.id
        })
      })
      listItem.remove();
    }
  }
}
//
