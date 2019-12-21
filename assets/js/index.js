

function getAllTasks(){
  fetch("/getAllTasks")
  .then((res) => res.json())
  .then((res) => {
    console.log("res in line 5 of index",res)
    const list = document.getElementById("task-list");
    //pulled from d s
    for(let i=0; i<res.length;i++){
    let taskItem= document.createElement('li')
    taskItem.id=res[i]._id
    taskItem.innerHTML = res[i].item

    //add delete feature with onclick even hlistener
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML= 'x';
    deleteButton.addEventListener('click',() => {
      deleteMessage(res[i]._id)
    })
    list.appendChild(taskItem);
    console.log("taskItem in get all in index, line 20",taskItem)
    taskItem.appendChild(deleteButton)
  }
  }
  )}


  function start(){
    console.log("start")
    const getAllButton = document.getElementById('retrieve')
  
    getAllButton.addEventListener('click',() => {
          getAllTasks()
    })

    const taskButton=document.getElementById('task-button')
    taskButton.addEventListener('click',() => {
      createTask()
    })
  }


  function createTask(){
    let inputField=document.getElementById('task')

    fetch("/createTask",{
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        item: inputField.value,
      })
    }).then((res) => res.json())
    .then((res) => console.log("res on line 50 of index",res))
    .catch((err)=> console.log(err))
  }

  function deleteTask(id){
    let itemToDelete = document.getElementById(id)
    const list =document.getElementById('task-list')
    list.removeChild(itemToDelete)

    fetch("/delete/"+id,{
      method:'DELETE',
    }).then((res)=>res.json()).then((res)=>console.log("res on line 63 of index js",res))
  }


window.onload= start;



