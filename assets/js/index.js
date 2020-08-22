document.addEventListener('click', (event) => {
  // event.preventDefault();
//   console.log(event.target)

// ADD CURRENT TO DO LIST FROM DB
  if (event.target.id === 'retrieve') {
    fetch('/tasks')
      .then((res) => res.json())
      .then((data) => {
        const ul = document.querySelector('#task-list');
        data.forEach((dataObj, index) => {
          const { item, id } = dataObj;
          const li = document.createElement('li');
          const buttonDelete = document.createElement('button');
          buttonDelete.innerHTML = 'X';
          buttonDelete.className = 'remove';

          li.innerHTML = item;
          li.id = id;

          li.append(buttonDelete);
          ul.append(li);
        });
      })
      .catch((err) => {
        console.log('list.js get request error: ', err);
      });
  }

  // ADD AN ITEM TO THE LIST OF THINGS TO DO
  if (event.target.id === 'task-button') {
    // console.log('==========> add item button: ', event.target.id);
    const task = document.querySelector('#task').value;
    // console.log('task item: ', task);
    
    fetch('/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item: task }),
    })
      .then((res) =>
        res.json())
      .then((data) => {
        console.log('data: ', data);
        if (data == 'Item title already exists') {
          alert('Item must be non-empty text and cannot be a duplicate item');
          window.location.reload(true);
        }
        // window.location.href = '/render.html'
      })
      .then((data) => {
        console.log('DATA was ADDED TO DB: ', data);
        window.location.reload(true);
      })
      .catch((err) => {
        console.log('index.js post request error for /create: ', err);
      });
  }

  // DELETE ITEM FROM THE LIST AND DB
  if (event.target.className === 'remove') {
    // console.log(event.target)
    // console.log(event.target.id)
    const number = event.target.parentNode.id;
    console.log('number: ', number)
    // console.log(event.target.parentNode)
    // console.log(event.target.parent.parent)
    // buttonToDelete = event.target.id;
    // const itemToDelete = number;
    // const childNode = event.target.parentNode;
    // itemToDelete.removeChild(childNode);
    // console.log("itemToDelete.textContent: ", itemToDelete.parentNode);
    // let itemTextContent = itemToDelete.parentNode;
    // let item = itemTextContent.replace(/update.*$/g, '').trim();
    // console.log("======> item: ", item)
    // console.log('itemToDelete: ', itemToDelete)
    // console.log('buttonToDelete: ', typeof buttonToDelete)

    fetch('/delete', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: number })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('returned string: ', data)
        if (data == "item deleted") {
          itemToDelete.remove(itemToDelete)
        }
        window.location.reload(true);
      })
      .catch(err => {
        console.log('list.js delete request error for /api/delete: ', err)
      })
  }
});
