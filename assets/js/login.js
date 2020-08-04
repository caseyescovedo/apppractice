// check headers first for cookies and potentially just redirect

// when the sign in form is submitted redirect

const signIn = (userInfo) => {
  fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .then((data) => console.log('on front end', data))
    .catch((err) => console.log(err));
};

const signInBtn = document.getElementById('submit');
signInBtn.addEventListener('click', () => {
  const user = document.getElementById('user').value;
  const password = document.getElementById('pass').value;

  const loginInfo = { username: user, password };
  console.log('loginInfo', loginInfo);
  signIn(loginInfo);
});
