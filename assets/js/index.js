console.log('hello');
const title = document.querySelector('#input-form');
const h1 = document.createElement('h1');
h1.innerHTML = '<h1 id="header">testing</h1>';
title.appendChild(h1);


window.addEventListener('load', () => getAllItems());

const input = document.querySelector('input');
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
      item: 'Another item',
      description: message,
      date: 'tomorrow',
      status: 'incomplete',
    }),
  };
  fetch('/api', postObj)
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .then(() => getAllItems())
    .catch((err) => console.log(err));
});
