//event listener: listening for button clicks

document.addEventListener('click', function (event) {
  console.log(event.target)
  // Button for Add Task 
  if (event.target.id === 'task-button') {
    console.log("in task button")
    
  }

  // Button for Get Task
  if (event.target.id === 'retrieve') {
    console.log("in retrieve");
    getItems ();
  } ;
  
  // Button for Delete Task
  if (event.target.class === 'remove') {
    console.log('in remove')
  }

	// If not listed above, don't refresh
	// event.preventDefault();
}, false);


// async function getItems(url = '/items', data = {}) {
//   const response = await fetch(url, {
//     method: 'GET', 
//     mode: 'no-cors',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.parse(data) 
//   });
//   console.log('here')
//   console.log(response.body);
// }

const getItems = () => {
  fetch('/items', {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  })
  .then(response => response.json())
  .then((items) => {
    console.log('items: ',items);
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    items.forEach((item) => {
      addItem(item);
    })
  })
}

// grab items on page load
getItems ();

const addItem = (item) => {  
  console.log("item from index.js: ", item);
  const newLI = document.createElement('li');
  newLI.innerText = item.item;
  newLI.id = item._id;
  newLI.className = "remove"
  const button = document.createElement('button');
  button.innerText = 'X';
  console.log("newLI", newLI, button);
}