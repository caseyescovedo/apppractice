function getTasks() {
  fetch('api')
    .then(res => res.json())
    .then(tasks => {
      const taskList = document.getElementById('task-list')
      let innerList = ''
      for(let elt of tasks) {
        innerList = innerList + '<li id="list' + elt.id + '">' + elt.item + '<button id="button' + elt.id + '" class="remove" onclick="removeItem(event)">X</button></li>';
      }
      taskList.innerHTML = innerList;
    })
    .catch(err => console.log(err));
}

function addTask() {
  const innerValue = document.getElementById('task').value;
  const taskToAdd = {task: innerValue};
  const addTask = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(taskToAdd)
  };

  fetch('/api', addTask)
    .then(res => res.json())
    .catch(err => console.log(err));

  document.getElementById('task').value = '';
}

function removeItem(event) {
  const idToRemove = event.target.parentElement.id.substring(4);
  const toRemove = {id: idToRemove};
  const removeTask = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(toRemove)
  };

  fetch('/api', removeTask)
    .then(res => res.json())
    .then(res => console.log('item removed'))
    .catch(err => console.log(err));

  document.getElementById(event.target.parentElement.id).remove();
}


function getInputValue() {
  // const user = document.getElementById('user').value;
  // const password = document.getElementById('pass').value;
  // console.log(user);
  // console.log(password);

  // const userInfo = {
  //   username: user,
  //   password: password
  // };

  // const authData = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(userInfo)
  // };

  // fetch('/signin', authData)
  //   .then(res => res.json())
  //   .then(auth => console.log('i dunno'));
}