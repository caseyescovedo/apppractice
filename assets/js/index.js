
//this is the fetch to '/list'
//when clicking the get tasks button do all of this to get the items
document.getElementById('retrieve').addEventListener('click', (e) => {
  fetch('/list')
  .then(res=>res.json())
  .then(data=>{
  //the data is an array of objects, so iterate through it 
  data.forEach((task, idx)=>{
  const newTask = document.createElement('li');
  //set the inner text of that task to be the value of the item key in the task object
  newTask.innerText = task.item;
  //get the unordered list id (task-list) and attach the newItem to it aka the task
  document.getElementById('task-list').appendChild(newTask);
}) 
});
})



//this is the fetch for posting items in the input 
document.getElementById('task-button').addEventListener('click', (e) =>{
  //get the value of the input element
  let inputItem = document.getElementById('task').value;
  //fetch for posting 
  fetch('/create', {
    method: 'POST',
     body: JSON.stringify({item: inputItem}),
     headers: {
       'Content-Type': 'application/json'
     }
  })
  .then(res => res.json())
  .then(data => {
    //create a newTask element
    const newTask = document.createElement('li');
    //set the id to equal the id of the item
    newTask.id = newTask._id;
    //setting innerText to have the value of the item
    newTask.innerText = newTask.item;
    //appending the input value onto the list
    document.getElementById('task-list').appendChild(newTask);
  })
  .catch(err => console.log(err));
})

//for the delete 
//didn't have time to do it, but would iterate through each item and a delete button to it
//since each item has an _id in the database, I was thinking I could link it to the button and on the click
//of the button it would delete the item from the page

