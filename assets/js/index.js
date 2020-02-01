console.log('Index.js')

document.addEventListener('DOMContentLoaded',() => {
  fetch('/toDo')
  .then(data => data.json())
  .then(item => appendDom(item))
})