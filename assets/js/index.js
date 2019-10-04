$(document).ready(function() {
    $('#task-button').click(function() {
        const taskList = $('#task-list');
        const inputTask = $('#task').val();
        let itemIdFromDB;
        $.ajax({
            type: "POST",
            url: "/task",
            data: JSON.stringify({task: inputTask}),
            success: function(res) {
                console.log("Success: task is added");
                itemIdFromDB = res;
                const taskDOM = $(`<li id=${itemIdFromDB}>${inputTask}<button class='remove'>X</button></li>`)
                taskList.append(taskDOM);
            },
            dataType: "json",
            contentType: "application/json"
        })

    })

    $('#retrieve').click(function() {
        $('#task-list').empty();
        const taskList = $('#task-list');
        $.ajax({
            type: "GET",
            url: "/task",
            success: function(data) {
                data.forEach(obj => {
                    const taskDOM = $(`<li id=${obj._id}>${obj.item}<button class='remove'>X</button></li>`)
                    taskList.append(taskDOM);
                });
            }
        })
    })

    $('.remove').click(function(event) {
        console.log('in click remove');
        console.log(event.target.id);
        $.ajax({
            type: "DELETE",
            url: "/task",
            data: JSON.stringify({id: event.target.id}),
            success: function(res) {
                console.log(res);
            },
            dataType: "json",
            contentType: "application/json"
        })
    })
})

