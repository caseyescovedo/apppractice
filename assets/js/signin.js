// declare constants for frequently manipulated elements
const usernameInput = grab('user');
const passwordInput = grab('pass');
const submitButton = grab('submit');

submitButton.addEventListener('click', () => sendCredentials());

//Functionality
//Grab element by id
function grab(string) {
  return document.getElementById(string);
}

// send credentials to server for auth
function sendCredentials() {
  const username = usernameInput.value;
  const password = passwordInput.value;
  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: username, pass: password }),
  };
  fetch('/signin', reqObj).catch(
    (err) => (document.innerHTML = `<p>${err}</p>`)
  );
}
