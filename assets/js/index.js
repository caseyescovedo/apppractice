//DOM manipulation happens here
console.log('hello it me');

document.addEventListener('DOMContentLoaded', ()=>{
    fetch('/todo')
    .then(data => data.json())
    .then(tasks => appendDOM(tasks));
})
const taskForm = document.querySelector('#')