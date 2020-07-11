$(function () {
  console.log('got loaded');
  $('#retrieve').on('click', function () {
    $('#task-list').empty();
    $.get('/tasks', function (data) {
      for (let task of data) {
        $('#task-list').append(
          $(`<li id="${task._id}">${task.item}</li>`).append(
            $('<button>X</button>').click('click', () => {
              $(`#${task._id}`).remove();
              $.ajax(`/tasks/${task._id}`, {
                type: 'DELETE',
              });
            })
          )
        );
      }
    });
  });

  $('#task-button').on('click', function () {
    const value = $('#task').val();
    $.ajax('/tasks', {
      data: JSON.stringify({
        itemName: value,
      }),
      contentType: 'application/json',
      type: 'POST',
    }).done(function () {
      console.log('task created');
    });
  });
});
