const body = document.querySelector('body'); //why is document undefined????
const mainDiv = document.querySelector('div');

console.log(mainDiv);
console.log(body); //why is body null?? >:o

body.appendChild(mainDiv);
// console.log(mainDiv);
// console.log(body); //why is body null?? >:o

// input form

// assign input to input element
const input = document.querySelector('input');
// assign button to button element
const button = document.querySelector('button');

// mainDiv.appendChild(input);
// input.appendChild(button);

// when you click 'add item' button
button.addEventListener('click', () => {
  const addItem = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: input.value,
    }),
  };
  fetch('/secret', addItem)
    .then((res) => res.json())
    .then((data) => console.log(data)) //invoke getAllItems - func to show all db items
    .catch((err) => console.log(err));
});
