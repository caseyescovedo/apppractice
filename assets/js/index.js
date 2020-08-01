// ! Get all the elements after getTasks is hit
const getTasks = () => {
  fetch('/tasks') // make fetch request to get all tasks in the database
  .then((res) => res.json())
  .then((data) => {
    const listOfTasks = document.getElementById('task-list')
    for (let i = 0; i < data.length; i++){ // create a new element for each item in data
      // Adding the text
      const newTask = document.createElement('li')
      newTask.innerText = data[i].item;
      // Creating the button
      const button = document.createElement('button')
      button.innerText = 'X'


      newTask.appendChild(button)
      listOfTasks.appendChild(newTask)
    }
  })
}

getTasks()


// ! Configuring the get Tasks button
document.getElementById("retrieve").addEventListener('click', getTasks)






// ! Add element to the list





// ! delete element from the lists