
  function getTasks(e){
    fetch("/tasks")
    .then(res=>res.json())
    .then(data=>{
      let items='';
      data.forEach(el => {
        items+=`<li id=${el._id}>${el.item} <button class="remove">X</button></li>`;
      });
      document.getElementById('task-list').innerHTML=items;
      document.getElementById('retrieve').setAttribute('disabled', true);
    });
  }

  function removeTask(e){
    if(e.target.className=="remove"){
      fetch("/tasks", {
        method: 'DELETE',
        body:JSON.stringify(e.target.parentNode.id)
      }).then(()=>{
        e.target.parentNode.remove();
      });
    } 
  }

  function addTask(e){
   let task=document.getElementById('task');
   if(!task.value)alert('add a task');

    fetch("/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({item:task.value})
    })
    .then(res=>res.json())
    .then((d)=>{
      console.log('d', d);
      task.value='';
      getTasks();
    });
 
}

window.onload=(e)=>{
  const button=document.getElementById('retrieve');
  button.addEventListener('click', getTasks);

  const allTasks= document.getElementById('task-list');
  allTasks.addEventListener('click', removeTask);

  const addTasks= document.getElementById('task-button');
  addTasks.addEventListener('click', addTask);
  

}
   



