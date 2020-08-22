console.log('hello from index.js');
$(document).ready(function () {

  // =============== POST REQUEST FOR /LOGIN =============== //

  const signinForm = document.getElementById("#signin");

  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordInput = document.querySelector('input#pass');
    passwordInput.setAttribute('type', 'password');
    const username = document.querySelector('input#user').value;
    const password = document.querySelector('input#pass').value;

    const user = {
      username,
      password
    };

    fetch('/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((res) => {
        console.log('res:', res);
        // console.log('res received')
        return res.json()
      })
      .then((data) => {
        // window.location.href = '/render.html'
        if (data === 'unsuccessful login attempt') {
          alert('unsuccessful login attempt')
          window.location.href = './../secret.html'
        }
      })
      .catch(err => {
        console.log('index.js /api/login error: ', err)
      })
  });
});
