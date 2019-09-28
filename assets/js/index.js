$(document).ready(() => {
  let items = []; // current listed items on the website

  const list = $('#task-list'); // grab task-list node (ul)
  const inputBox = $('#task'); // grab input box (input[type='text'])

  const populateList = item => { // item = { created_at: timestamp, item: String, _id: int }
    inputBox.val(''); // set empty input value
    const btn = $('<button class="remove">X</button>'); // create button
    btn.on('click', { id: item._id }, e => { // add event listen on the button
      $.ajax({ // call xhr with id data
        url: '/api/task',
        type: 'DELETE',
        data: JSON.stringify({
          id: e.data.id
        }),
        contentType: 'application/json',
        success: result => $(`#${item._id}`).remove(), // if success deleting, remove item list
        error: error => alert('Error on delete. Please try again later!')
      });
    });
    const li = $(`<li id="${item._id}">${item.item} </li>`); // create list item
    li.append(btn); // append button to list item
    list.append(li); // append the list item to task-list
    items.push(item); // push item object to items
  };

  const populateManyList = arr => { // arr = [item: Object, item2: Object, ... ]
    const filtered = arr.filter(item => items.every(thisItem => thisItem._id !== item._id)); // filter items that are already rendered on the page
    filtered.forEach(item => populateList(item)); // populate the list with the filtered items
  };

  $('#task-button').on('click', () => { // click event listener
    const value = inputBox.val(); // get current value
    if (!value.length) return; // if empty don't do anything
    $.ajax({ // xhr post request for value
      url: '/api/task',
      type: 'POST',
      data: JSON.stringify({
        item: value
      }),
      contentType: 'application/json',
      success: result => populateList(result), // if success, immediately populate item-list with item node
      error: error => alert('Error on adding data. Please try again later!')
    });
  });

  $('#retrieve').on('click', () => { // click event listener
    $.ajax({
      url: '/api/tasks',
      type: 'GET',
      success: result => populateManyList(result), // populate item-list with all the items from db
      error: error => alert('Error on getting data. Please try again later!')
    });
  });
});