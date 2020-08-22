
const getTasks = function () {
  fetch("/tasks")
    .then(res => res.json())
    .then(data => console.log(data))
}