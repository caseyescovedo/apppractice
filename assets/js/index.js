const todoItems = [];

//add event listeners to our buttons
const getButton = document.getElementById('retrieve');
getButton.addEventListener('click', getTasks);

const addButton = document.getElementById('task-button');
addButton.addEventListener('click', addTask);

//makes fetch request to database for all tasks
function getTasks() {
  fetch('/tasks/')
    .then((data) => data.json())
    .then((tasks) => {
      //add all database data to todoitems array
      tasks.forEach((el) => todoItems.push(el));
      createList();
    });
}

function createList() {
  //grab the <ul> list element
  const ul = document.getElementById('task-list');
  //delete all current list items
  Array.from(ul.children).forEach((li) => li.remove());

  //iterate across database items
  todoItems.forEach((el) => {
    //make li items
    const li = document.createElement('li');
    li.innerText = el.item;

    //make buttons for each <li> element
    const button = document.createElement('button');
    button.addEventListener('click', removeTask);
    button.innerHTML = 'x';
    button.setAttribute('class', 'remove');

    //give each button an id to identify which database document to remove
    button.setAttribute('id', el._id);

    //append elements
    li.append(button);
    ul.append(li);
  });
  //empties todoItems array to get ready for next event
  todoItems.length = 0;
}

function addTask() {
  //grabs the text bar
  const textBar = document.getElementById('task');
  //store the current string in the text bar
  const text = {
    item: textBar.value,
  };
  //reset the textbar to its default value
  textBar.value = '';

  //send data to server
  fetch('/tasks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(text),
  })
    .then((res) => res.json())
    .then((msg) => {
      console.log(msg);
      getTasks();
    })
    .catch((err) => console.log(err));
}

function removeTask(e) {
  //grabs the id of the button that was clicked
  const id = e.target.id;
  //sends id to the back end
  fetch(`/tasks/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      //if request was successful, refresh the list
      if (res.status === 200) getTasks();
      else console.log(`error: ${res.status}, item not deleted`);
    })
    .catch((err) => console.log(err));
}
