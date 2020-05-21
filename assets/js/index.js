// get all the id's/classes 
const addTaskButton = document.querySelector('#task-button')
const retrieveTaskButton = document.querySelector('#retrieve')
const ul = document.querySelector('#task-list')
// const li = document.createElement(li)

let retrieveTaskClick = 0;

// functions
addTask = () => {
  console.log('you clicked me im the add task button')

}

retrieveTask = () => {
  console.log('are you here with me in the retrieve task??')
  // fetch request should only happen once, so record number of clicks
  ++retrieveTaskClick;
  const data = {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }
  // make a fetch request with the method GET
  fetch('/secret', data)
    // .then(res => res.json())
    .then(lists => {
      console.log('success!!!, let us see what the fetched data is', lists)
      // once the fetch request is successful, items should be displayed in #task-list el
      // find elById for task-list
        // append result to the task list ul
      //   li.innerHTML
      // ul.appendChild()
        // create a delete button
    })
    // each item should have a remove button 
}



// button events
addTaskButton.addEventListener('click', addTask)
retrieveTaskButton.addEventListener('click', retrieveTask)

{/* <div id="create">
<input id="task" placeholder="enter new task" type="text"></input>
<button id="task-button">Add Task</button>
<button id="retrieve">Get Tasks</button>
</div>
<ul id="task-list"></ul>
</body> */}