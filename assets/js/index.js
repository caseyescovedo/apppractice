
/*
 When the button is clicked to get tasks, all tasks from the database should be displayed as list items in the #task-list element. These list items should display the task item followed by a button (inside the list item) with a class of remove and display an X. As an example, one list item might look like <li>Go shopping <button class="remove">X</button></li
*/

let add = document.getElementById("task-button");
let retrieve = document.getElementById("retrieve");
retrieve.addEventListener('click', (e)=>{
    
    fetch('/')
    .then(response=>response.json())
    .then(data=>{
        let list = document.getElementById("task-list");

        // Clear list before populating(Refresh)
        while( list.firstChild ){
            list.removeChild( list.firstChild );
        }

        // For each of the task populate it las list tag with remove button
        data.forEach((obj)=>{
            const task = document.createElement('li');
            const remove = document.createElement('button');
            remove.classList.add("remove");
            remove.innerText = "X";
            task.innerText = obj.item;

            
            // Append
            list.appendChild(task);
            task.appendChild(remove);
        }) 
    });
});

    /*
    Clicking on the button to add a task should take the text from the input field and create a new task in the database. This task should be seen by clicking the button to get tasks after it has been added. (Optionally, you can display the new task immediately after adding.)
    */
    add.addEventListener('click', (e)=>{
        let task = document.getElementById("task").value;
        console.log(task);
        
      
        }) 
