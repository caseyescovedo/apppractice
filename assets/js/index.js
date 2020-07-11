jQuery(function ($) {
    $('#task-button').click(function () { 
        sendTask();
    });
    $('#retrieve').click(function () { 
        getTasks();
    });
});

function getTasks() {
    $('#task-list').empty();
    $.ajax({
      type: 'GET',
      url: './task',
    })
    .done((data) => {
        renderTasks(data);      
    });
}

function renderTasks(tasks) {
    const $messages = $('#task-list');
    for (let i = 0; i < tasks.length; i += 1) {
      $messages.append('<li>' + tasks[i].item + '<button class="remove" onclick="removeTask(' + '\'' + tasks[i]._id + '\'' + ')">X</button</li>');
    }         
}

function sendTask() {
    const task = $('#task').val();
    const obj = {};
    if (task) {
      obj.item = task;
    }
    $.ajax({
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json; charset=UTF-8',
      url: './task',
    }).then((data) => {
        getTasks();
    });  
}

function removeTask(id){
  $.ajax({
    type: 'DELETE',    
    contentType: 'application/json; charset=UTF-8',
    url: './task/' + id,
  }).then((data) => {
      getTasks();
  });  
}