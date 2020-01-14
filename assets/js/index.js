// make fetch requests here
// .then - send response in json format
// .then - with the data, do something with each of the goals that have been received

// THIS IS WHERE YOU NEED TO FIGURE OUT DOM MANIPULATION
//

// send a fetch request to /secret/tasks
fetch('/secret/tasks')
  // then send the response as a json object
  .then(res => res.json())
  // with that data, do something with it
  .then(list => {
    // this will only log on your console. need to use DOM manipulation to display on webpage
    console.log(list);
    // for each item in your list,
    list.forEach(item => {
      console.log(item);
      // create a delete button to include with each new list item that will be associated with the delete functionality

      // create a new list element and store it in the variable newItem
      const newItem = document.createElement('li');
      // assign a specific id to each new item, and add the specific item names item to each new item 'li' element
      newItem.id = item._id;
      newItem.innerHTML = item.item;
      document.getElementById('task-list').appendChild(newItem);
    });
  });

// create the onclick event listener that is attached to the task button in secret.html
document.getElementById('task-button').addEventListener('click', e => {
  const userInput = document.getElementById('task').value;
  fetch('/secret/tasks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ item: userInput })
  }).then(res => res.json());
  // .then(data => {
  //   console.log(data);
  // });
});
