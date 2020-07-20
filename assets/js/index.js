// cache system that keep track of items that are render on the page and don't allowed to load two times the same item
const cache = {} 


const retrieve = document.getElementById("retrieve");
// add event listener for on click involk the function to get all list items from database
retrieve.addEventListener("click", getTask);

// send a get request to the http://localhost:3333/secret/task/ API to retrive all list item from database
function getTask() {
  fetch("/secret/task", {
    method: "GET",
    headers: {'Content-Type': 'application/json'},
  })
  .then(res => res.json())
  .then(data => {
    // parse through object contain all list item from database
    for(let toDo in data){
      // check if list items are already render on page 
      if (!cache[data[toDo]._id]){
        // if list item is new add to cache
        cache[data[toDo]._id] = data[toDo].item;
        // involk the function to render list item to page
        addToList(data[toDo])
      }
    }
    // if success close the call returning the tread
    return
  })
  .catch(err => {
    console.log('an error occured trying to get task');
    throw err;
  })
}

const button = document.getElementById("task-button");
// add event listener for on click post new list item to database
button.addEventListener("click", () => {
  const toDo = document.getElementById("task").value;
  // clean input field
  document.getElementById("task").value = "";

  // edge case, prevent errors if trying to add new task with out content
  if(toDo.length < 1){
    // if no content close the call returning the tread
    return
  }

  // send a post request to the http://localhost:3333/secret/task/ API with new list item content on the body
  fetch("/secret/task", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ item: toDo })
  })
  .then(res => res.json())
  .then(data => {
    // add new list to cache
    cache[data._id] = data.item;
    // involk the function to render new list to the page and close the call
    return addToList(data);
  })
  .catch(err => {
    console.log('an error occured trying to post task');
    throw err;
  })
});

// create render list item on page
function addToList(obj) {
  const item = document.createElement("li");
  const list = document.getElementById("task-list");
  item.innerText = obj.item;
  item._id = obj._id;
  item.className = "task";
    
  const deleteButton = document.createElement("button");
  deleteButton.className = "remove";
  deleteButton.innerText = "X";
  // add event listener for on click delete list item
  deleteButton.addEventListener("click", (e) => {
    // involk the function that remove list item to the database
    removeTask(item)
    // remove list item to the page
    list.removeChild(item)
  });
  item.appendChild(deleteButton);
  list.appendChild(item);
}

// send a delete request to the http://localhost:3333/secret/task/:id API with list item id on the params
function removeTask(item) {
  fetch(`/secret/task/${item._id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res =>  res.json())
  .then(data => {
    // remove list item to the cache
    delete cache[data._doc._id]
    // if success close the call returning the tread
    return
  })
  .catch(err => {
    console.log('an error occured trying to delete task');
    throw err;
  })
}