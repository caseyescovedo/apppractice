



const authUser = () => {
  const user = document.getElementById('user')
  const password = document.getElementById('pass')

  const userInfo = {
    user: user.value,
    password: password.value
  }

  console.log("this is username and password " + userInfo)

  // create the fetch request that will send to db'
  fetch('/auth', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })

}







document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault(); // must prevent the default form submission
  authUser()
})



