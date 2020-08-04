/* eslint-disable no-console */
/* eslint-disable no-undef */

const signInEl = document.getElementById('submit');
const userInputEl = document.getElementById('user');
const passInputEl = document.getElementById('pass');
signInEl.addEventListener('click', () => {
  const body = {
    user: userInputEl.value,
    pass: passInputEl.value,
  };
  fetch('/signin', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .catch((err) => console.log(err));
});
