window.onload = function () {
  const signInButton = document.getElementById('signin')

  console.log('signInButton', signInButton);

  signInButton.addEventListener('click', signIn);

  const signIn = () => {
    fetch('/secret')
  }

  // display/refresh all items
}