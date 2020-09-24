const submitButton = document.getElementById('submit');
const userInput = document.getElementById('user');
const passInput = document.getElementById('pass');

const postLogin = () => {
  fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: userInput.value,
      password: passInput.value,
    }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log('error in postLogin Func', err));
};

submitButton.addEventListener('click', () => postLogin());
