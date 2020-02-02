/* Setting event listener for the entire body rather than many for each button.
 * Items will be differentiated in if clauses using ids and classes
 */

document.body.addEventListener('click', (e) => {
  const { target } = e;

  /* For /secret page, listens for click on 'Get Tasks' button */
  if (target.id === 'retrieve') {
    fetch('/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const taskListArea = document.querySelector('#task-list');

        for (let i = 0; i < data.length; i += 1) {
          const itemId = data[i]._id;
          const item = `${data[i].item  } `;
          const node = document.createElement('li');
          const textNode = document.createTextNode(item);
          const deleteBtn = document.createElement('button');
          deleteBtn.innerHTML = 'X';
          deleteBtn.setAttribute('id', itemId);
          node.appendChild(textNode);
          node.appendChild(deleteBtn);
          taskListArea.appendChild(node);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  /* For /secret page, listens for click on 'X' button to delete a task */
  if (target.innerHTML === 'X') {
    fetch(`/tasks/${target.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json());
  }
  /* For /secret page, listens for click on 'Add Task' button and sends input value
   * via POST request to server, then clears the field after response
   */
  if (target.id === 'task-button') {
    let parentInput = document.querySelector('#task').value;
    const dataObj = {
      item: parentInput,
      created_at: new Date(),
    };
    fetch('/tasks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObj),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
    // reset add task input field to blank after adding task
    document.querySelector('#task').value=null;
  }
});
