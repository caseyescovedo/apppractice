$(document).ready(function() {
  const getTasks = $('#retrieve');
  const url = '/test';
  const listItems = [];
  
  getTasks.click(() => {
    console.log('clicked Get Tasks')
    fetch(url)
      .then(res => res.json())
      .then(data => {
        $('#task-list').empty();
        data.forEach(obj => {
          listItems.push(obj);
          const item = obj["item"];
          $("#task-list").append(`<li>${item} <button class="remove">X</button></li>`);
        });
      })
      .catch(err => console.log(`Error: `, err));
  })

  //incorrectly adding to database at the moment
  const addTask = $('#task-button');
  addTask.click(() => {
    console.log('clicked Add Task')
    const inputValue = $('#task').val()
    const obj = {
      item: `${inputValue}`
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        listItems.push(data);
        $("#task-list").append(`<li>${inputValue} <button class="remove">X</button></li>`);
        $('#task').val('')
      })
      .catch(err => console.log('Error: ', err))
    })

  //will work on delete after authentication...

 
}) 