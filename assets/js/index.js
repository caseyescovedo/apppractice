console.log("HI");

const taskList = document.getElementById("task-list");
const retrieve = document.getElementById("retrieve");

retrieve.addEventListener("click", () => {
    fetch("/tasks")
        .then(res => console.log("resp", res))
        .then(data => console.log('data',data))
})