///////// LOG-IN PAGE functionalities //////////
const signInBtn = document.querySelector('#submit');
signInBtn.addEventListener('click', () => {
  // Grab the input fields' values.
  const user = document.querySelector('#user').value;
  const pass = document.querySelector('#pass').value;

  const signInBody = {
    user,
    pass,
  };

  fetch('/secret', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signInBody)
  })
  .then(res => res.json())
  .catch(err => console.log(err))
});
