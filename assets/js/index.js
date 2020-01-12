window.onload = function () { //doing this instead of differing the script
  console.log("javascript loaded") //just telling us we are good to go

  //this is the retrieval button, grabbing all tasks, 
  //pulling them down and feeding them to the adding tasks function
  document.getElementById("retrieve").addEventListener("click", function () {
    const list = document.getElementById("task-list");
    while (list.firstChild) {
      //this is to clean the list so we dont have duplicates stacked up
      list.removeChild(list.firstChild);
    }


    fetch('/getTasks').then(returned => returned.json())
      .then(jsoned => {
        console.log(jsoned);
        jsoned.forEach(taskObj => {
          addingTasks(taskObj);
        });
      })
      .catch(err => console.log(err)); //the server will 
    //pop this off if multiple requests are made with no change in the database
  })

  //this is the add item button
  document.getElementById("task-button").addEventListener("click", function () {
    let taskIn = document.getElementById("task"); //get the value of the input
    console.log(taskIn.value);
    let taskObj = { task: taskIn.value }; //assign it to a sender object
    taskIn.value = ''; //blank the field

    fetch('/postTask', {
      method: "POST",
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(taskObj)
    })
      .then(returned => returned.json())
      .then(jsoned => {
        console.log('after post', jsoned)
        addingTasks(jsoned);
      })
      .catch(err => console.log(err)); //the server will 
    //pop this off if multiple requests are made with no change in the database
  })


  //this is the delete item element function, to be invoked when we hit the delete button to give the impression of a dynamic list
  function deleteElement(id) {
    let task = document.getElementById(`task ${id}`);

    task.parentNode.removeChild(task);
  }


  function addingTasks(tasksData) {
    let taskList = document.getElementById('task-list');
    let task = document.createElement('li');

    let delBtn = document.createElement("button"); //create a button
    delBtn.setAttribute("class", "remove") //make it class remove
    delBtn.innerHTML = "X"; //give it an X
    delBtn.addEventListener("click", function (e) {
      let id = e.target.parentElement.id; //this is task #, so we'll slice
      let tid = Number(id.slice(4))
      console.log(tid);
      taskObj = { _tid: tid } //packaged it up
      fetch("/deleteTask", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(taskObj) //send it along, the ID being used to delete things
      }).then(response => {
        console.log(response);
        deleteElement(tid);
      }).catch(err => console.log(err));
    })

    task.innerHTML = tasksData.item; //the task has the item data written inside
    task.appendChild(delBtn); //append the delete buttn to the task
    task.setAttribute("id", `task ${tasksData._tid}`); //give the task an ID for reference
    task.setAttribute("class", 'taskRow')
    taskList.appendChild(task); //append the list item to the list

  }
}