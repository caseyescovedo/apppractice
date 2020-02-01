
// Adds a task to database
const addTask = (event) => {
  // prevents function from being run on default
  event.preventDefault();

  // grabs value of task when clicked
  const taskField = document.getElementById('task').value;

  // creates an object for the body of the fetch
  const adding = JSON.stringify({
    item: taskField,
  });

  // Post the data from the input field
  fetch('http://localhost:3333/task/addTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: adding,
  })
    .then((res) => console.log(res));
};

// deletes task from page and database
const deleteTask = (event) => {
  event.preventDefault();
  // get the id of the button clicked
  const idNum = event.target.id;
  // get the div of list items
  const listItemremove = document.getElementById('listItems');
  // get the specific item with an id as the button clicked
  const remove = document.getElementById(idNum);
  // remove the child of the list item div with id 
  listItemremove.removeChild(remove);


  // remove the item from db
  fetch('http://localhost:3333/task/deleteTask', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: idNum,
    }),
  })
    .then((res) => console.log(res));

};


// gets all the task from database
const getTask = () => {
  // get all the task from the database
  fetch('http://localhost:3333/task/getTask')
    .then((res) => res.json())
    .then((res) => {
      // for each item in the database
      for (let i = 0; i < res.length; i+= 1) {
        // grab the listitem div
        const listItemDOM = document.getElementById('listItems');
        // create a list item
        const listItem = document.createElement("LI");
        // create the text relatinging to the task
        const text = document.createTextNode(res[i].task);
        // set the id of the list to the id of the element from the db
        listItem.setAttribute("id", res[i].id);
        // add the text to the list item
        listItem.appendChild(text);
        // create a button
        const button = document.createElement("BUTTON");
        // add the x to the button
        const buttonX = document.createTextNode("X");
        // create an onclick for the button
        button.onclick = (event) => deleteTask(event);
        // set an attribute that sets the id of button to the id from db
        button.setAttribute('id', res[i].id);
        // set to the class to remove
        button.setAttribute('class', 'remove');
        // combine the button with button text
        button.appendChild(buttonX);
        // append the button to the list item
        listItem.appendChild(button);
        // check if list item in dom has id of item from db
        const checkDOM = document.getElementById(res[i].id);
        if (!checkDOM) {
          listItemDOM.appendChild(listItem);
        }
      }
    }
  );
  // display task in the task list element 
  // make sure to put an id on each of the elements

};


// Logins in User; Directions arent specific
const login = (event) => {

  event.preventDefault();

  const userField = document.getElementById('user').value;
  const passField = document.getElementById('pass')

  const loginBody = JSON.stringify({
    username: userField,
    password: passField,
  });

  fetch('http://localhost:3333/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: loginBody,
  })
    .then((res) => console.log(res));



};
