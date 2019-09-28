
const taskList = document.getElementById("task-list");
const retrieve = document.getElementById("retrieve");
const addTask = document.getElementById("task-button");
const newTask = document.getElementById("task")
retrieve.addEventListener("click", () => {
    fetch("/tasks")
        .then(res => console.log("resp", res))
        .then(data => console.log('data',data))
});

addTask.addEventListener("click", () => {
    console.log(newTask.value)
   fetch("/tasks", {
       method: 'POST',
       body: JSON.stringify(newTask.value)
   })  
   .then(res => res.json())
   .then(data => console.log("data",data))

   
   const newli = document.createElement("li");
   newli.innerText = newTask.value;
   taskList.appendChild(newli)
   
   newTask.value = '';
});


