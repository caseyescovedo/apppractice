let loginButton = dobument.getElementById('submit');

loginButton.addEventListener('click', function(){
  let userText = document.getElementById("user").value;
  let passText = document.getElementById('pass').value;
  fetch('/signin', {
    headers: {
      'Content-Type': 'application/json'
    },
    body:{
      user: userText,
      pass: passText
    }
  })
  .then((response) => {
    response.json();
  })
  .then((data) =>
  console.log('something'));
})












let button = document.getElementById('retrieve')
let textbox = document.getElementById('task')


button.addEventListener('click', function(){
  let item = document.getElementById("task").value;
  fetch('/postTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:{
      item: item,
    }
  })
  .then( (response) => {
    response.json();
  })
  .then((data) =>
  console.log('something'));
})





//fetch tasks from database
function getTask(){
fetch('/getTask', {
  method: 'get',
  headers: {"content-type": ["application/json"]}}  
  )
  .then((res) => res.json())
  .then(data => {
    data.item.forEach(value => {
      const item = document.createElement('li')
      item.innerText = value.message;
      document.getElementById("task-list").append(item)
    })
  });
}


function postTask(){
  let task = document.getElementById("task").value;
  fetch('/postTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:{
      task: task,
    }
  })
  .then( (response) => {
    response.json();
  })
  .then((data) =>
  console.log('something'));
}