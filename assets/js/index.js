
window.addEventListener('load', (event) => {
    document.getElementById('retrieve').addEventListener("click", getTask);
    document.getElementById('task-button').addEventListener("click", addTask);
})
function getTask() {
    fetch('/task')
    .then((response)=> response.json())
    .then((response)=>{
            const list = document.querySelector('#task-list')
            const toBeDeleted=document.querySelectorAll('li') 
            toBeDeleted.forEach(element => {
                element.remove()
            });
            for(let i=0;i<response.length;i++){
                let responseList = document.createElement('li')
                responseList.innerHTML = `${response[i].task} <button id=${response[i].created_on} onclick=deleteTask(this.id)> X </button>`
                responseList.id=`${response[i].created_on}`
                list.appendChild(responseList)
            }
        }).catch((err)=> console.log('err'))
}

function addTask (){
    const task=document.getElementById('task').value
    if(task){
        fetch('/task',{
            method:'POST',
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            },
            body:JSON.stringify({
                task:task,
                time:new Date().getTime()
            })
        })
        .catch((err)=>console.log(' err adding task to database'))
    }
}
function deleteTask(id){
        fetch('/task',{
            method:'DELETE',
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            },
            body:JSON.stringify({
                id:id
            })
        }) 
        .catch((err)=>console.log(' err deleting msg from database'))
}
