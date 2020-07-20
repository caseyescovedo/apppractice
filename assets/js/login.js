//function for login
const logIn = () => {
  const user = document.getElementById("user");
  const pass = document.getElementById("pass");
  const bodyObj = {
    user: user.value,
    pass: pass.value,
  };
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObj)
  })
  .then(
    //if login accepted redirect
  )
  .catch(err => console.log("Log-in attempt failed"))
};
