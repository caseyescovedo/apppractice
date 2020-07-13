// before we do anything, make sure the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
  // this does a get request to the /db path to get all tasks from the database
  const fetchTasks = () => {
    fetch('/db')
      .then((results) => {
        // if we don't get a 404...
        if (results.ok) {
          // return the results as json
          return results.json();
        }
        // otherwise, throw an error
        throw new Error(`request rejected with status code ${results.status}`);
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  // when the retrieve button is clicked, we need to first check whether it's already been clicked
  document.querySelector('#retrieve').addEventListener('click', fetchTasks);
  // if it hasn't been clicked yet, we should trigger the getTasks action for the database
  // to do this, we need to access the button on the DOM
  // connect it to our index.js file
  // do a get request to the path /db
  // and then use the results (take a look at their structure before attempting this!)
  // to create li elements that look like <li>TASK DESCRIPTION <button class="remove">X</button></li>
  // to make deleting easy, let's also add the id so we get:
  // <li id=${idFromDB}> TASK DESCRIPTION <button class="remove">X</button></li>
  // we're currently not sending the id back from the DB so we'll need to do this on a GET request

  //  this posts a task to the database
  const postTask = () => {
    const description = document.querySelector('#task').value;
    console.log(description);
    // and then do a post request to /db/?description=input
    fetch(`/db?description=${description}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: description,
    })
      .then((results) => {
        // if we don't get a 404...
        if (results.ok) {
          console.log(JSON.stringify(results));
          // return the results as json
          return results.json();
        }
        // otherwise, throw an error
        throw new Error(`request rejected with status code ${results.status}`);
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
      
    // when the response from the database comes back
    // we should immediately update the task list on the DOM with the latest version
    // (so do a new get request to the db) OR! We can just wait for the user to click 'get tasks'
  }
  
  // when the add button is clicked, it should save the text from the input field and do a fetch request
  document.querySelector('#task-button').addEventListener('click', postTask);

  // when the x button is clicked, it should remove the item from the list immediately
  // we'll need to do a delete request to /db/?id=***
  // the id needs to match the id of the task in the database
});
