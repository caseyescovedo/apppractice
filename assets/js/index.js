$(document).ready((e) => {
  // multiple clicks shouldn't display tasks multiple times
  $("#retrieve").on("click", () => {
    getTasks();
  });
  $("#task-button").on("click", () => {
    addTask();
  });
});

const getTasks = () => {
  // before doing ajax request filter to be pulling only new tasks?
  // const btns = $(".remove");
  // console.log("BUTTONS ", btns.attr("id"));
  $.ajax({
    method: "GET",
    url: "/secret/all",
    success: (tasks) => {
      $("#task-list").empty();
      for (let task of tasks) {
        const lItem = `<li>${task.item}<button class='remove' id="${task.id}">X</button></li>`;
        // get all the id's of the buttons currently on the page
        // add only the items with new id's
        // const btns = $('.remove');
        // console.log('BUTTONS ', btns.attr('id'));
        // const kids = $('#task-list').children();
        // const kids = $('#task-list').contents().find('li')[0];
        // textCpntent/ innerText
        // console.log('ITEMS ', kids);
        // console.log('ITEMS ', kids[0].attr('textContent'));
        $("#task-list").append(lItem);
        $(".remove").on("click", () => {
          handleRemove(event);
        });
      }
    },
  });
  // check if the data we got from the ajax GET request is new! (don't display same tasks again)
  // }).done((data) => {
  //   console.log(data);
  //   // const data = data.json();
  //   displayTasks(data);
  // });
};

// const displayTasks = (data) => {
//   //...
// }

const addTask = () => {
  const task = $("#task").val();
  const taskObj = { item: task };
  $.ajax({
    url: "/",
    method: "POST",
    data: taskObj,
    // dataType: "json",
    success: (newTask) => {
      console.log("SAVED ", newTask);
      // const lItem = `<li>${newTask.item}<button class='remove' id="${newTask.id}">X</button></li>`;
      // $("#task-list").append(lItem);
      $(".remove").on("click", () => {
        handleRemove(event);
      });
    },
  });
};

function handleRemove(e) {
  const id = e.target.id;
  console.log('ID ', id);
  const lI = $(this).parents();
  console.log('ITEM TO DELETE ', lI);
  $.ajax({
    url: `/${id}`,
    method: "DELETE",
    success: () => {
      $(lI).remove();
      // $(lI).unwrap();
      // $(lI).empty();
    },
  });
}
