const onSignIn = document.querySelector('#signin')

// event listen that submit a post request to the server with the username and password
onSignIn.addEventListener('submit', () => {
    const username = event.target[0].value;
    const password = event.target[1].value;
    console.log(username)
    console.log(password)
    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
    body: JSON.stringify({ username, password })
    })
});

