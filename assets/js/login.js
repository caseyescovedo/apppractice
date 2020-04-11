const saveButton = document.getElementById('submit');
saveButton.addEventListener('click', validateForm());

//validating form
function validateForm() {
  let userName = document.getElementById('user').value;
  let passWord = document.getElementById('pass').value;
  let objectBody = {
    user: userName,
    pass: passWord
  };

  fetch('/signin', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(objectBody)
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
