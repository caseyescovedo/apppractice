const doSignin = () => {
  const submit = document.getElementById('submit');
  submit.addEventListener('click', () => {
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    console.log('signin info', user, pass);

    fetch('/signin', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'text/html; charset=UTF-8',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: username, pass: password }),
    })
      .then((response) => {
        response.json();
        console.log('in signin response');
      })
      .then((data) => {
        console.log('signin data', data);
      })
      .catch((err) => console.log(err));
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', doSignin);
} else {
  doSignin();
}
