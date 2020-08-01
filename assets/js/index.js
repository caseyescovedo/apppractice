console.log(" ARRIVED AT SECRET ");

let list = document.querySelector("#task-list");
let heardGet = document.querySelector("#retrieve");
let creatorButton = document.querySelector("#task-button");
let create = document.querySelector("#task");

heardGet.addEventListener("click", getTasks);

creatorButton.addEventListener("click", addTasks);

function addTasks(input){
    fetch("/db/add", {
      method: "POST",
      body: create.value
    })
    .then(res => res.json())
    .then(data => {
      console.log("ATTEMPTED TO ADD ELEMENT ");
    })
    .catch(err => console.log(" error retriving list in client side promies", err));
}



function getTasks(){
  console.log(" GETTING TASKS PLEASE WAIT ");
  
  fetch("/db/gets")
    .then(res => res.json())
    .then(data => {
      console.log("data", data);
      let arrayOfTaskListElements = data.map(createTaskList).map(i => document.querySelector("#task-list").appendChild(i))
    })
    .catch( err => console.log(" error retriving list in client side promies", err));

}

function createTaskList(results){
  let task = document.createElement("li");
  task.id = results._id;
  //task.innerHTML = "<button class = 'remove'> X </button>"; //hacky but doesn't work any way as it overwrites other data   
  task.innerText = results.item;
  task.value = results.item;
  //task[data-time] = results.created_at;
  task.appendChild(createButton())
  return task;
}

function createButton(){
  let button = document.createElement("button");
  button.value = "X";
  button.innerText = "X";
  return button; 
}
