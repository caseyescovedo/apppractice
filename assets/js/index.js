$(document).ready(() => {
  $("#retrieve").click(() => {
    $.get("secretapi/getTasks", (data, status) => {
      data.rows.forEach((item, i) => {
        const removeId = `${i + 1}`;
        if (
          !document.getElementById("task-list").innerHTML.includes(item.item)
        ) {
          $("#task-list").append(
            `<li>${item.item}<button id='${removeId}'>X</button></li>`
          );
        }

        $(`#${removeId}`).click(() => {
          const id = document.getElementById(`${removeId}`).getAttribute("id");
          fetch("secretapi/deleteTask", {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
          }).then(() => console.log(id));
        });
      });
    });
  });

  $("#task-button").click(() => {
    const item = document.getElementById("task").value;
    fetch("secretapi/postTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: item }),
    })
      .then(() => console.log(item))
      .then(() => console.log("postTask fired a request"));
  });
});
