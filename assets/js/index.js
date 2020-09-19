
// tasks will be an array that holds the task objects.
let tasks = [];


// ************************************************
// Creates functionality to retrieve tasks
// ************************************************
//Set getTasks equal to the retrieve button node and then add an event listener so that it sends a 'GET' request once it is clicked.
const getTasks = document.getElementById('retrieve');

getTasks.addEventListener('click', () => {
  const fetchObject = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  }
  fetch('/secret/api', fetchObject)
    .then((response) => response.json())
    .then((data) => {
      tasks = [];
      //data here should be an array of objects.
      //Iterate through the array and push the objects into the tasks array
      data.forEach((taskObj) => {
        tasks.push(taskObj);
      })

      //invoked a function to populate the tasks on the ul container
      populateTasks();
   
    })
    .catch((err) => {
      console.log('Error retrieving the tasks.');
    })
})

// getTasks.addEventListener(, () => {
//   const deleteTask = document.getElementsByClassName('remove');

//   deleteTask.addEventListener('click', () => {
//       //
//     const taskDeleted = deleteTask.parentNode;
//     askDeleted.remove();
//   });
// })

//Create a help function that iterates through the tasks array
//use the array objects create list items and then appe
const populateTasks = () => {
  // select the ul using the ul id.
  const taskList = document.getElementById('task-list');

  // remove existing elements
  taskList.innerHTML = '';
  
  //append li children containing list items
  tasks.forEach((task) => {
    const taskLI = document.createElement('li');
    taskLI.id = task._id;
    taskLI.innerHTML= `${task.item} <button class="remove">X</button>`;

    taskList.appendChild(taskLI);


  })

  // const deleteTask = document.getElementsByClassName('remove');

  // deleteTask.addEventListener('click', () => {
  //     //
  //   const taskDeleted = deleteTask.parentNode;
  //   askDeleted.remove();
  // });
}


// ************************************************
// Creates functionality to make the Add Task Work.
// ************************************************

const addTask = document.getElementById('task-button');

addTask.addEventListener('click', () => {
  const inputValue = document.getElementById('task').value;

  const fetchObject = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
        item: inputValue
      })
  }

  fetch('/secret/api', fetchObject)
    .then((res) => res.json())
    .then((data) => {
      //data will be an object
      //push this to the task array

      tasks.push(data);

      populateTasks();
    })
    .catch(err => {
      console.log(err)
    })
})




