const logincred = document.getElementById('submit');
logincred.addEventListener('click', validateForm);

//validating form
function validateForm() {
  let userName = document.getElementById('user').value;
  let passWord = document.getElementById('pass').value;
  let objectBody = {
    user: userName,
    pass: passWord
  };

  if (objectBody.user == 'codesmith' && objectBody.pass == 'ilovetesting') {
    fetch('/signin', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
      .then(response => response.json())
      .then(newData => {
        console.log('Success: LOG IN', newData);
      })
      .catch(err => {
        console.log('ERROR: WRONG USER', err);
      });
    // should clear both text area & password
    //   inputValue.value = '';
  }
}
