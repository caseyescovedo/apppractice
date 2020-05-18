document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('#retrieve').addEventListener('click', async function(){
    await fetch('/api/retrieve')
      .then(data => data.json())
      .then(res => {
        if (document.querySelectorAll('li').length === 0){
          let parentUl = document.querySelector('#task-list');
          for (let row of res) {
            let newListItem = document.createElement('li');
            newListItem.innerHTML = `${row.item}`;

            let newButton = document.createElement('button');
            newButton.classList.add('remove');
            newButton.setAttribute('id', `${row._id}`)
            newButton.innerHTML = 'X';

            newListItem.appendChild(newButton);
            parentUl.appendChild(newListItem);
          }
        }
      })
    const removeBtns = document.querySelectorAll('.remove');
    for (let i = 0; i < removeBtns.length; i++) {
      removeBtns[i].addEventListener('click', function() {
        fetch(`/api/delete/${removeBtns[i].id}`);
        let listItem = removeBtns[i].parentNode;
        let list = listItem.parentNode;
        list.removeChild(listItem);
      })
    }
  })

  // Ive tried to debug this for 2 hours and have tried A LOT of solutions but i keep getting this error:
  // SyntaxError: Unexpected token " in JSON at position 0 at JSON.parse(<anonymous>)
  // or something very similar --> somehow i need the request header, but the request header also breaks the request
  // another method i tried doesnt get this error but doesnt pass along the request body
  document.querySelector('#task-button').addEventListener('click', function(){
    const newTask = JSON.stringify(document.querySelector('#task').value);

    fetch('/api/add', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: newTask,
    })
      .then(data => data.json())
      .then(res => {
        console.log('response of fetch ', res);
        // let parentUl = document.querySelector('#task-list')
      })
      .catch(err => console.log('Error with fetch post request: ', err));
  })
})