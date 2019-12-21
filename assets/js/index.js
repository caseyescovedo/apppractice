function getAllTasks(){
  fetch("getAllTasks")
  .then((res) => res.json())
  .then((res) => {
    console.log("res",res)
    const list = document.getElementById("task-list");
    //pulled from d s
    for(let i=0; i<res.length;i++){
    let taskItem= document.createElement('li')
    taskItem.id=res[i]._id
    taskItem.intterHTML = res[i].item

    //add delete feature with onclick even hlistener
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML= 'x';
    deleteButton.addEventListener('click',() => {
      deleteMessage(res[i]._id)
    })
    list.appendChild(taskItem);
    taskItem.appendChild(deleteButton)

  }
  }
  )}



  function start(){
    const submitButton = document.getElementById('submit')
    submitButton.addEventListener('click',() => {

    })

  }


  window.onload= start