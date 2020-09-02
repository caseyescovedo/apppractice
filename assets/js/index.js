document.addEventListener('DOMContentLoaded', () => {
  const create = (el) => {
    const newElement = document.createElement(el);
    return newElement;
  };
  const getTasks = document.querySelector('#retrieve');
  const list = document.querySelector('#task-list');

  // click to get all tasks
  getTasks.addEventListener('click', (e) => {
    grabAllTasks();
  });

  // helper function to get all tasks... heps invoke after updating or deleting
  function grabAllTasks() {
    list.innerHTML = '';
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((listitem) => {
          const {
            id, item, completed, created_at, userid,
          } = listitem;
          const task = create('li');
          const itemDiv = create('div');
          itemDiv.classList.add('item-text');
          itemDiv.textContent = item;
          // task.classList.add('todo');

          // add delete button with event listener to each item
          const deleteItem = create('button');
          deleteItem.textContent = 'delete';
          deleteItem.classList.add('remove');
          deleteItem.classList.add('btn');
          deleteItem.classList.add('btn-outline-danger');
          deleteItem.classList.add('btn-sm');
          deleteItem.id = id;
          deleteItem.addEventListener('click', () => {
            deleteTheItem(id);
          });

          // edit buttons
          const editItem = create('button');
          editItem.innerHTML = 'edit';
          editItem.id = item.id;
          editItem.classList.add('edit');
          editItem.classList.add('btn');
          editItem.classList.add('btn-outline-info');
          editItem.classList.add('btn-sm');
          editItem.addEventListener('click', () => {
            const text = prompt('enter new item');
            editTheItem(id, text);
          });
          itemDiv.append(editItem);
          itemDiv.append(deleteItem);
          list.append(itemDiv);
        });
      });
  }

  // add items
  const addItem = document.querySelector('#task-button');
  addItem.addEventListener('click', createItem);

  function createItem() {
    const item = document.querySelector('#task').value;
    const userid = 23;
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item, userid }),
    });
    grabAllTasks();
  }
  addItem.addEventListener('submit', createItem);

  // delete item
  function deleteTheItem(id) {
    fetch('/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    grabAllTasks();
  }

  // edit item
  function editTheItem(id, item) {
    fetch('/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, item }),
    })
      .then((data) => {
        grabAllTasks();
      });
  }
});
