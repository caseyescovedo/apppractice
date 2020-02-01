console.log('made it to index.js!');

document.body.addEventListener('click', (e) => {
  const { target } = e;

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
        const {item} = data;
        const {created} = data;

        for (let i = 0; i < data.length; i += 1) {
          const itemId = data[i]._id;
          const node = document.createElement('li');
          const textNode = document.createTextNode(item);
          const deleteBtn = document.createElement('button');
          deleteBtn.innerHTML = 'X';
          deleteBtn.classList.add(itemId);
          node.appendChild(textNode);
          node.appendChild(deleteBtn);
          taskListArea.appendChild(node);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  if (target.innerHTML === 'X') {
    const itemId = target.className;
    fetch(`/tasks/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('date from delete req in index.js ', data);
      // functionality to remove list item here
      // find parentNode (the <li> element) and then to .remove() to get rid of it
      });
  }

  if (target.id === 'task-button') {
    const parentInput = document.querySelector('#task').value;
    const dataObj = {
      item: parentInput,
      created_at: new Date(),
    };
    console.log('parentInput ', parentInput.value);
    fetch('/tasks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(dataObj),
    })
      .then((response) => response.json())
      .then((data) => {
      // use the data to add task to page
        console.log('data from post req in index.js ', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
});
