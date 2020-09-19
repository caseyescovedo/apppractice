let getallItemsCheck = false;
const date = new Date();
const getButton = document.querySelector('#retrieve');
const addButton = document.querySelector('#task-button');
const input = document.querySelector('#task');

// const ul = document.querySelector('#task-list');
// window.addEventListener('load', () => getItems());

addButton.addEventListener('click', () => {
  if (input.value === '') return alert('please enter text');
  getallItemsCheck = false;
  const message = input.value;
  // const ul = document.getElementById('#task-list');

  const postOBJ = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: message,
      created_at: `${date}`,
    }),
  };
  fetch('/api', postOBJ)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log('I am here:', data[_id]);
      const ul = document.getElementById('task-list');
      const li = document.createElement('li');

      li.innerHTML = `${message} ${date}`;
      const deleteButton = document.createElement('button');
      deleteButton.className = 'remove';
      deleteButton.textContent = 'X';
      deleteButton.addEventListener('click', () => {
        deleteItem(data._id);
        deleteButton.parentElement.remove();
      });
      li.appendChild(deleteButton);
      ul.appendChild(li);
    })
    .catch((err) => console.log(err));
});

getButton.addEventListener('click', () => {
  getItems();
});

function getItems() {
  const liNodes = document.querySelectorAll('li');
  // if (getallItemsCheck === true) {
  //   return alert('list is up to date');
  // }
  // getallItemsCheck = true;
  const ul = document.querySelector('#task-list');
  fetch('/api')
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data Length: ', data.rows.length);
      console.log('liNodes', liNodes.length);
      if (data.rows.length === liNodes.length) {
        return alert('list is up to date');
      }
      for (let i = 0; i < data.rows.length; i += 1) {
        const li = document.createElement('li');
        li.innerHTML = `${data.rows[i].item} ${data.rows[i].created_at}`;
        ul.appendChild(li);
        const deleteButton = document.createElement('button');
        deleteButton.className = 'remove';
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', (event) => {
          deleteItem(data.rows[i]._id);
          deleteButton.parentElement.remove();
        });
        li.appendChild(deleteButton);
      }
    })
    .catch((err) => console.log(err));
}

function deleteItem(item) {
  getallItemsCheck = false;
  const deleteObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: item }),
  };
  fetch('/api', deleteObj)
    .then((data) => data.json())
    .catch((err) => {
      console.log(err);
    });
}
