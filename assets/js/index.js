$(document).ready(() => {
  console.log("Bonesaw is ready");
});

// async function postData(event) {
///encountered sunc bug trying ti rewrite here 4:10pm not serving secret file now.
async function syncData() {
  $("#task-list").empty();
  try {
    const items = await $.get("http://localhost:3333/api");
    const taskList = $("<ul>");
    items.forEach((item) => {
      taskList
        .append(
          $("<li>").html(
            `${item.item} <button class ="remove" onclick ="deleteData(${item.id})">x</button>`
          )
        )
        .appendTo($("#task-list"));
    });
  } catch (err) {
    console.log("error on sync", err);
  }
}

async function deleteData(id) {
  try {
    await $.ajax({
      url: "http://localhost:3333/api",
      type: "DELETE",
      data: { id },
    });
    syncData();
  } catch (err) {
    console.log("idk boss we couldnt delete", err);
  }
}

async function postData() {
  const task = $("#task").val();
  try {
    await $.post("http://localhost:3333/api", { task }, (data, status) => {
      console.log(data);
    });
    syncData();
  } catch (err) {
    console.log("idk boss cant post", err);
  }
}
