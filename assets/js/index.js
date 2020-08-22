const doStuffToDOM = () => {
  // Display all tasks
  const displayTasks = () => {
    // clears any existing tasks
    const el = document.getElementById('task-list');
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    // fetches all tasks from db
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        console.log('getTasks fetched data', data);
        const items = data;

        items.forEach((el, index) => {
          // create delete button
          const button = document.createElement('button');
          button.setAttribute('class', `remove`);
          button.setAttribute('id', `${el._id}`);
          button.setAttribute('value', `${button.id}`);
          const buttonText = document.createTextNode('X');
          button.append(buttonText);

          // create item
          const itemEl = document.createElement('li');
          const itemText = document.createTextNode(el.item);
          itemEl.append(itemText);
          itemEl.append(button);

          // add li to ul
          const list = document.getElementById('task-list');
          list.append(itemEl);
        });
      })
      .catch((err) => console.log(err));
  };

  const retrieveBtn = document.getElementById('retrieve');
  retrieveBtn.addEventListener('click', () => {
    displayTasks();
  });

  // Add a task
  const addButton = document.getElementById('task-button');
  addButton.addEventListener('click', () => {
    const newItem = document.getElementById('task').value;
    console.log('newItem', newItem);

    if (newItem !== '') {
      fetch('/api', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'text/html; charset=UTF-8',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: newItem }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('add to list resp data', data);
          displayTasks();
        })
        .catch((err) => console.log(err));
    }
  });

  // Delete a task - I couldn't figure out how to grab the class/id of the delete button. I've coded out what I think would work for delete?
  const deleteButton = document.getElementById(button.id);
  deleteButton.addEventListener('click', (e) => {
    console.log('in delete!');
    console.log('e', e.target.id);

    const btnId = document.getElementById(button.id).value;

    fetch(`/api/${btnId}`, {
      method: 'DELETE',
    }).catch((err) => console.log(err));

    displayTasks();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', doStuffToDOM);
} else {
  doStuffToDOM();
}
