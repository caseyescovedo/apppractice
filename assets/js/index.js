const button = document.getElementById('submit');
button.addEventListener('click', (e) => {
  e.preventDefault();
  
  const password = document.getElementById('pass').value;
  const username = document.getElementById('user').value;
  // console.log('username', username);
  const body = {
    username: username,
    password: password
  };
  console.log(body);
  fetch('/signin', {
    method: 'POST',
    headers:{
    'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(resp => resp.json)
  
})

