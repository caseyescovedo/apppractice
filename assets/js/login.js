document.addEventListener('DOMContentLoaded', (e) => {
  console.log('hi from login js');

  // correct login info to check user input against
  const correctLoginInfo = {
    username : 'codesmith',
    password : 'ilovetesting'
  }

  const usernameField = document.getElementById('user');
  const passwordField = document.getElementById('pass');
  const signinBtn = document.getElementById('submit');
  
  // event listener for sign in button click to start the checking logic
  signinBtn.addEventListener('click', () => {
    let username = usernameField.value;
    let password = passwordField.value;
    console.log('sign in btn clicked');
    signIn();
  })

  function signIn() {
    if(username === correctLoginInfo.username && password === correctLoginInfo.password) {
      document.location.href='secret.html';
    }
  } 

})