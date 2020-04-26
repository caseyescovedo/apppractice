window.onload = function() {
  const usernameInput = document.getElementById('user');
  const passwordInput = document.getElementById('pass');
  const submitButton = document.getElementById('submit');

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
 
    if(username && password){
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })
      .then(res => {
        window.location.href = res.url
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('Error in the post request: ' + err)
      })
    }
  });
};