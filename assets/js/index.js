//--------INDEX-------\\
const submit = document.querySelector('#submit');

submit.onclick = () => {
  const user = document.querySelector('#user').value;
  const pass = document.querySelector('#pass').value;
  const payload = {
    username: user,
    password: pass,
  };
  document.querySelector('#user').value = '';
  document.querySelector('#pass').value = '';

  fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data === 'PASSED') {
        window.location.href = '/secret.html';
      } else {
        alert('unsuccessful login attempt');
      }
    });
};
