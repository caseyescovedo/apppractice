const logIn = document.getElementById('submit');

const getTasksButton = document.getElementById('retrieve');
getTasksButton.addEventListener('click', () => getTasks());

const saveButton = document.getElementById('task-button');
saveButton.addEventListener('click', addItem);

//validating form
function validateForm(e) {
  e.preventDefault();
  let objectBody = {
    user: user,
    pass: pass
  };

  let user = document.getElementById('user').value;
  let pass = document.getElementById('pass').value;
  console.log('successful log in');
  if (user === 'codesmith' && pass === 'ilovetesting') {
    console.log('successful log in');
    fetch('/signin', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(objectBody)
    })
      .then(response => response.json())
      .then(newData => {
        console.log('Success: LOG IN', newData);
      })
      .catch(err => {
        console.log('ERROR: WRONG USER', err);
      });
    // should clear both text area & password
    inputValue.value = '';
  }
}

// displaying tasks
function getTasks() {
  console.log('getting tasks');
  fetch('/tasks')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        // creating li item to be appended & give it its own ID too
        let li = document.createElement('li');
        li.textContent = data[i].item;
        // id should be data[i].id
        li.setAttribute('id', `li:${i}`);
        li.style.display = 'flex';
        li.style.width = '500px';
        li.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        li.style.justifyContent = 'space-between';

        // creating delete button at same time of li creation & supply it an ID
        let del = document.createElement('input');
        del.setAttribute('type', 'button');
        del.setAttribute('id', `${i}`);
        del.setAttribute('class', 'remove');
        del.style.width = '50px';
        del.value = 'X';
        console.log('RUNS BEFORE DELETE');
        del.onclick = deleteItem;
        console.log('RUNS AFTER DELETE');
        li.append(del);
        document.getElementById('task-list').appendChild(li);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// // adding values into a BODY and then posting that body
function addItem() {
  console.log('adding works');
  //   //   let textAreaValue = document.getElementById('desc').value;
  //   //   let passwordValue = document.getElementById('pass').value;
  //   let objectBody = {
  //     message: textAreaValue,
  //     password: passwordValue
  //   };

  const inputValue = document.getElementById('task');
  let objectBody = {
    item: inputValue.value
  };
  //   console.log('This is Object Body: ', objectBody);
  //   // wrap this entire fetch request in a condition with the passwordvalue & textareavalue existing
  console.log(inputValue.value);
  if (inputValue) {
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(objectBody)
    })
      .then(response => response.json())
      .then(newData => {
        console.log('Success: item POSTS', newData);
      })
      .catch(err => {
        console.log('ERROR: item NOT POSTED', err);
      });
    // should clear both text area & password
    inputValue.value = '';
  }
}

function deleteItem(e) {
  fetch(`/tasks/${e.target.id}`, {
    // fetch(`/messages`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' }
  })
    .then(() => {
      // MAY NEED TO ADD THIS BACK IN
      document.getElementById('task-list').removeChild(e.target.parentElement);
      console.log('Success: message Deleted');
    })
    .catch(err => {
      console.log('ERROR: message NOT Deleted', err);
    });
}

// once window loads, run this function
// set messages to 2000
// clear the DOM every time the messages
// window.addEventListener('load', event => {
//   console.log('page is fully loaded');
//   setTimeOut(displayMessage, 2000);
// });
