let getTasks = document.getElementById('retrieve')
function getshit(){
    fetch('/getTasks')
    .then(res => res.json())
    .then(data =>{
        console.log('running');
        document.getElementById("task-list").remove();
        let container = document.getElementById('task-container');
        let new_list = document.createElement('ul');
        new_list.id = "task-list";
        container.append(new_list);
        let keys = Object.keys(data);
        for(let i =0; i <keys.length;i+=1){
            let item = document.createElement('li');
            console.log(data[i]);
            item.textContent = data[i].item;
            item.id = data[i].item;
            let delete_button = document.createElement('button');
            delete_button.className='remove';
            delete_button.textContent = "X";
            delete_button.addEventListener('click',()=>{
                fetch('/deleteTask',{
                    headers:{
                        'Content-Type':'application/json'
                      },
                      method:'DELETE',
                      body:JSON.stringify({task:data[i].item})
                })
                item.remove();
            })
            item.append(delete_button);
            new_list.append(item);
        }
        
    })
}
getTasks.addEventListener('click',()=>{
   getshit();
})




let addTask = document.getElementById('task-button');
addTask.addEventListener('click',()=>{
    let task = document.getElementById('task');
    console.log(task.value);
    fetch('/postTask',{
        headers:{
            'Content-Type':'application/json'
          },
          method:'POST',
          body:JSON.stringify({task:task.value})
    })
    .then(res =>{
        getshit();
    })
    task.value = "";
    
})