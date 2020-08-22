// You are serving index.js to the client for use on the secret page, but there is not much existing functionality. Add code to achieve the following:

//  When the button is clicked to get tasks, all tasks from the database should be displayed as list items in the #task-list element. These list items should display the task item followed by a button (inside the list item) with a class of remove and display an X. As an example, one list item might look like <li>Go shopping <button class="remove">X</button></li
//  Multiple clicks of the button to get tasks should not display the list items multiple times
//  Clicking on the button to add a task should take the text from the input field and create a new task in the database. This task should be seen by clicking the button to get tasks after it has been added. (Optionally, you can display the new task immediately after adding.)
//  Clicking on any list item's X button should remove the item from the list (immediately) and delete the task from the database


const retrieveButton = document.getElementById('retreive')
retrieveButton.addEventListener('click', () => {
    getTasks();
})

const getTasks = () => {
    fetch('./tasks')
      .then((res) => res.json())
      .then((data) => { });
    

    }


const addTask = () => {

}