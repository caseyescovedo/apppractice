/* DONT NEED - HAD TO USE EXPRESS URLENCODED */

// document.addEventListener('DOMContentLoaded', () => {
//   // document.getElementById('submit').addEventListener('click', () => {
//   //   submitLogin();
//   // });
// });

// function submitLogin() {
//   let userValue = document.getElementById('user').value;
//   let passValue = document.getElementById('pass').value;

//   fetch(`/signin`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ user: userValue, pass: passValue }),
//     redirect: 'follow'
//   })
//     .then(data => {
//       console.log(data);
//     })
//     .catch(err => console.log('Data Error', err));
// }
