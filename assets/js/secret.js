window.onload = function() {
  console.log("And a happy new year");
  //Caching the items I might need later
  const form = document.getElementById("signin");
  const user = document.getElementById("user");
  const password = document.getElementById("pass");
  const btn = document.getElementById("submit");

  //Add event listener on the button to prevent form default and redirect to the home screen.
  btn.addEventListener("click", e => {
    e.preventDefault();
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: user.value, pass: password.value })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Authenticated") {
          window.location.pathname = "/secret";
        } else {
          console.log("unsuccessful login attempt");
        }
      });
  });
};
