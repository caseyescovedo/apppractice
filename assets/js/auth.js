function addListeners() {
  document.querySelector('#submit').addEventListener('click', checkLogin);
}

function checkLogin() {
  const user = document.querySelector('#user').value;
  const pass = document.querySelector('#pass').value;
  console.log('user ->', user);
  fetch('/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, pass }),
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

document.addEventListener('DOMContentLoaded', addListeners);
