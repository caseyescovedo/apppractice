document.addEventListener('DOMContentLoaded', () => {
  // get elements from database
  document.getElementById('retrieve').addEventListener('click', (e) => {
    console.log('in retrieve')
    fetch('/getTasks')
      .then((response) => {
        return response.json()
      })
      .then((data) => // start manipulating the data into list items)
  })



  // add new task to the database
  document.getElementById('task-button').addEventListener('click', (e) => {
    const textInput = document.getElementById('task').value
    const body = {
      item: textInput
    }
    fetch('/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  })


});