console.log('hello from secret.js');
$(document).ready(function () {

  // ==================== GET ALL TASKS ==================== //
  const getTasksButton = document.querySelector('#retrieve');
  const taskList = document.querySelector('#task-list');
  let arrayLength;
  getTasksButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/tasks')
      .then(res => res.json())
      .then(data => {
        let taskMap = [];
        data.forEach((itemObj) => {
          taskMap.push(itemObj)
        });
        return taskMap;
        // let li = document.createElement('li');
        // li.id = "list" + index;
        // li.innerHTML = itemObj.item

        // let buttonDelete = document.createElement('button');
        // buttonDelete.id = "buttonDelete" + index;
        // buttonDelete.className = 'remove';
        // buttonDelete.innerHTML = 'X';

        // li.append(buttonDelete);
        // taskList.append(li);
      })
      .then(arr => {
        arr.forEach((itemObject, index) => {
          let li = document.createElement('li');
          li.id = "list" + index;
          li.innerHTML = itemObject.item

          let buttonDelete = document.createElement('button');
          buttonDelete.id = "buttonDelete" + index;
          buttonDelete.className = 'remove';
          buttonDelete.innerHTML = 'X';

          const check = document.querySelector(`#list${index}`);
          // console.log('==========> check: ', check)
          if (!check) {
            li.append(buttonDelete);
            taskList.append(li);
          }
          arrayLength = arr.length;
        })
      })
      .catch(err => {
        console.log('secret.js get request error: ', err)
      })
  })
  // ==================== GET ALL TASKS ==================== //




  // ==================== ADD A TASK ==================== //
  const addItemsButton = document.querySelector('#task-button');
  const today = new Date();
  const todayTime = today.toTimeString();
  const time = todayTime.slice(0, 8);

  addItemsButton.addEventListener('click', (e) => {
    // e.preventDefault();
    let taskInput = document.querySelector('input#task').value;
    console.log('=======> taskInput: ', taskInput)
    fetch('/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item: taskInput, created_at: time })
    })
      .then((res) => {
        console.log('post request res:', res);
        return res.json()
      })
      .then((data) => {
        if (data === 'REPEAT') {
          console.log('REPEAT error message: ', data)
          alert('Cannot have duplicate task names');
          window.location.reload(true);
          return;
        }
        if (data === 'EMPTY') {
          console.log('EMPTY error message: ', data)
          alert('Cannot input empty task name');
          return;
        }

        const index = arrayLength;
        console.log('next index: ', index)
        if (typeof data[0] === 'object') {
          let li = document.createElement('li');
          li.id = "list" + index;
          li.innerHTML = data[0].item

          let buttonDelete = document.createElement('button');
          buttonDelete.id = "buttonDelete" + index;
          buttonDelete.className = 'remove';
          buttonDelete.innerHTML = 'X';

          li.append(buttonDelete);
          taskList.append(li);
        }
        return taskInput;
      })
      .then(input => {
        // console.log('=====> what is this input? ', input)
        input = '';
        let parent = document.querySelector('div#create')
        let note = document.createElement('p');
        note.className = "addedTask";
        note.id = "addedTask";
        note.innerHTML = "successfully created new task!"
        note.style.color = "blue";
        parent.append(note);
        // const inputToReset = document.querySelector('input#task')
        // console.log(inputToReset);
        // inputToReset.reset();
        return note;
      })
      .then(newPtag => {
        console.log(newPtag);
        setTimeout(window.location.reload(true), 10000);
      })
      .catch(err => {
        console.log('index.js /api/login error: ', err)
      })
  })
  // ==================== ADD A TASK ==================== //


})

// ==================== ANY BUTTON CLICKS ==================== //
document.addEventListener('click', function (event) {
  event.preventDefault();

  // ==================== DELETE ITEM ==================== //
  // ==================== DELETE ITEM ==================== //
  if (event.target.className === 'remove') {
    console.log(event.target)
    console.log(event.target.id)
    const number = event.target.id.split('').pop();
    console.log('number: ', number)
    console.log('find parentNode: ', event.target.parentNode)
    // console.log(event.target.parent.parent)
    // buttonToDelete = event.target.id;
    const itemToDelete = event.target.parentNode;
    // const childNode = event.target.parentNode;
    // itemToDelete.removeChild(childNode);
    console.log("itemToDelete.textContent: ", itemToDelete.textContent);
    let itemTextContent = itemToDelete.textContent;
    let item = itemTextContent.replace(/X.*$/g, '').trim();
    console.log("======> item: ", item)
    // console.log('itemToDelete: ', itemToDelete)
    // console.log('buttonToDelete: ', typeof buttonToDelete)

    fetch('/delete', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item: item })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('returned string: ', data)
        if (data === "DELETED") {
          itemToDelete.remove();
        }
        // window.location.reload(true);
      })
      .catch(err => {
        console.log('list.js delete request error for /api/delete: ', err)
      })
  }
  // ==================== DELETE ITEM ==================== //
  // ==================== DELETE ITEM ==================== //



})