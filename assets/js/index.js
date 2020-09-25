

//POST request
const input = document.querySelector('task');
const button = document.querySelector('button');
button.addEventListener('click', () => {
  const message = input.value;
  // console.log(message);
  const postObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: message
    }),
  };
  fetch('/secret', postObj)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});