$(document).ready(function () {
  let taskArr = [];
  let dbTask;

  $("#submit").click(function () {
    fetch('/getTasks', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((tasks => {
        tasks.forEach(taskObj => {
          taskArr.push(taskObj.item);
        })
      }))
  })

  // Get task button
  $("#retrieve").click(function () {
    console.log(`Get`)
    getTasks();
    $("#task-list").empty();
    taskArr.forEach(task => {
      $("#task-list").append(task)
    })
  })

  const getTasks = () => {
    console.log(`Fetch getTasks from server`)
    fetch('/getTasks', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((tasks => {
        tasks.forEach(taskObj => {
          taskArr.push(taskObj.item);
        })
      }))
  }

  //Add task button
  $("#task-button").click(function () {
    console.log(`Added`)
    const taskVal = $("#task").val();
    addTask(taskVal);
    let newDbTask = dbTask;
    const newTask = $(`<li>${newDbTask}</li><button class="remove">X</button>`);
    taskArr.push(newTask)
  })

  const addTask = (val) => {
    let data = { item: val }
    console.log(`Fetch postTask from server`)
    fetch('/addTask', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((task => {
        console.log(`Task added to DB - end of of post request: ${task.item}`)
        dbTask = task.item;
      }))
  }

  //Remove task
  $(".remove").click(function () {
    console.log('Deleted')
    $("li").remove();
  })





})