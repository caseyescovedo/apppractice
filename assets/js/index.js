console.log('hi')

const ul = document.getElementById('task-list')
const retrieve = document.getElementById('retrieve')

retrieve.addEventListener('click', event => {
  let listOfTasksArr = [];
  const newArr = [];
  fetch('/getTasks', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      // console.log(response)
      return response.json();
    })
    .then((myJson) => {
      // listOfTasksArr = Object.values(myJson)
      myJson.forEach(ele => {
        listOfTasksArr.push(Object.values(ele)[0])
      })
      let li = document.createElement('li')
      for (let i = 0; i < listOfTasksArr.length; i++) {
        const button = document.createElement('button')
        button.setAttribute('class', "remove")
        button.innerText = 'X'
        li = document.createElement('li')
        li.innerText = `${listOfTasksArr[i]}`
        ul.appendChild(li)
      }
    });
  // need to async await
});