// - [ ] When the button is clicked to get tasks, all tasks from the database
// should be displayed as list items in the `#task-list` element. These list items
// should display the task item followed by a `button` (inside the list item) with
//  a class of `remove` and display an `X`. As an example, one list item might look like
// `<li>Go shopping <button class="remove">X</button></li`
// - [ ] Multiple clicks of the button to get tasks should not display the list
// items multiple times
// - [ ] Clicking on the button to add a task should take the text from the
// input field and create a new task in the database. This task should be seen by
// clicking the button to get tasks after it has been added. (Optionally, you can
// display the new task immediately after adding.)
// - [ ] Clicking on any list item's `X` button should remove the item from the
// list (immediately) and delete the task from the database

$(document).ready(() => {
  $('#retrieve').click(() => {
    console.log('clicked');
    fetch('/api/secret')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        createListItems(data);
      });
    // .catch(err => console.log(err))
  });
  console.log(data);
});

function createListItems(data) {
  $('#task-list').html('');
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.item;
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.classList.add('remove');
    btn.addEventListener('click', () => {
      fetch(`/secret/${item._id}`, {
        method: 'delete',
      }).then(res => {
        fetch('/api/secret')
          .then(res => res.json())
          .then(data => {
            console.log(data);
            createListItems(data);
          });
      });
    });
    li.appendChild(btn);
    $('#task-list').append(li);
  });
}

$('#task-button').click(() => {
  console.log('add task-btn clicked');
  const obj = {
    item: $('#task').val(),
  };
  $('#task').val('');
  if (obj.item === '') return;
  fetch('/secret', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(obj),
  }).catch(err => console.log(err));
});
