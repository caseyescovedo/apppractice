// wanted to put the script tag below, but y'all said we cannot mess with the HTML file so I used window.onload... 

window.onload = function () {
  // get the taskbutton
  const getTaskButton = document.querySelector('#retrieve');
  const addTaskButton = document.getElementById('task-button');
  const taskList = document.getElementById('task-list');
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'X';
  deleteButton.setAttribute("class", 'remove');
  console.log(deleteButton);

  deleteButton.onclick = (e) => {
    console.log(e.id);
  }

  let getTasksRun = 0;

  // want to add an onclick event on this button
  getTaskButton.onclick = (e) => {
    // send a get request to our route '/getTasks
    if (getTasksRun < 1) {

      fetch('/getTasks')
        .then(response => response.json())
        .then(tasksArr => {
          // the arr of objects is coming back
          console.log(tasksArr);

          // each task will have the __id which we need to delete
          // the item field which is our text
          // and the created_at  which defaults to the timestamp and zone 

          // for each object in the tasks array
          for (let task of tasksArr) {
            //create a list item with text
            const listItem = document.createElement('li');
            listItem.id = task.__id;

            // i apologize, hacky way of doing this, but I kept only getting one button to appear on each list item
            listItem.innerHTML = task.item;

            // a button in the list item
            // and append that to the task list
            taskList.appendChild(listItem);
            getTasksRun += 1;
          }

        })
        .then(() => {
          const listItems = document.getElementsByTagName('li');

          for (let i = 0; i < listItems.length; i += 1) {
            // WHY DO I HAVE TO CLONE THE NODE, this GAVE ME SO MUCH TROUBLE, but worth the learning opportunity!! was initially just appending to the last element
            // OBJECTS ARE PASSED BY REFERENCE AGHHHHHH
            const clonedButton = deleteButton.cloneNode(true);

            clonedButton.onclick = (e) => {
              // able to get the id 
              console.log(e.target.parentNode.id);

              const idToDelete = e.target.parentNode.id;
              // can use idToDelete to send our delete request

              const data = {
                id: idToDelete,
              };

              fetch('/deleteTask', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
              })
                .then(response => response.json())
                .then(dataBack => {
                  console.log(dataBack);
                })
                .catch(err => console.log(err));

              // want to delete the item visually on the front end
              // flow currently is to initiate a promise that resolves after the list item is deleted on the front end, the database does delete the item after testing!!
              const listItemToDelete = document.getElementById(idToDelete);
              listItemToDelete.parentNode.removeChild(listItemToDelete);
            }
            listItems[i].appendChild(clonedButton);
          }
        })
        .catch(err => console.log(err));
    }

  }

  // post request 
  addTaskButton.onclick = (e) => {
    // get the value from the input field
    const inputVal = document.getElementById('task').value;
    const data = {
      itemValue: inputVal,
    }

    // sending a post request to my backend
    fetch('/postTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(dataBack => console.log('WHAT I ADDED', dataBack))
      .catch(err => console.log('YA FUCKED UP SOMEWHERE KID'));

  }


};

