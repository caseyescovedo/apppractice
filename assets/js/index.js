const getTasks = async () => {
  try {
    const response = await fetch('http://localhost:3333/get');

    if (response.status === 200) {
      const tasks = await response.json();

      tasks.forEach((task) => {
        //check the DOM to see if there is a specific element with that ID number(unique)
        if (!document.getElementById(`listItem${task.itemid}`)) {
          const listItem = document.createElement('li');
          listItem.innerHTML = task.item;
          listItem.id = `listItem${task.itemid}`;

          const deleteButton = document.createElement('button');
          deleteButton.setAttribute('class', 'remove');
          deleteButton.addEventListener('click', () => {
            handleDelete(task.itemid);
          });
          deleteButton.innerHTML = 'X';
          //was just playing around with an update feature :) you can uncomment out to see how it works!
          //   const updateButton = document.createElement('button');

          //   updateButton.addEventListener('click', () => {
          //     const text = prompt('Please input update');
          //     updateTask(task.itemid, text);
          //   });
          //   updateButton.innerHTML = 'Update Task';
          listItem.append(deleteButton);
          //   listItem.append(updateButton);
          document.querySelector('#task-list').append(listItem);
        }
      });
    }
  } catch (error) {
    console.log('Error in get Tasks:', error);
  }
};

const handleDelete = async (id) => {
  try {
    const response = await fetch('http://localhost:3333/delete', {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const item = document.getElementById(`listItem${id}`);
      item.remove();
    }
  } catch (error) {
    console.log('Error in handle delete:', error);
  }
};

const addTask = async () => {
  const task = document.getElementById('task').value;
  if (task === '') alert('Please input a task name');
  if (task !== '') {
    try {
      const response = await fetch('http://localhost:3333/add', {
        method: 'POST',
        body: JSON.stringify({
          task,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log('Error in add task:', error);
    }
  }
};

// const updateTask = async (id, text) => {
//   try {
//     const response = await fetch('http://localhost:3333/update', {
//       method: 'PATCH',
//       body: JSON.stringify({
//         id,
//         text,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     console.log(response);
//   } catch (error) {
//     console.log('Error in update task:', error);
//   }
// };

// const handleLogin = async () => {
//   const user = document.getElementById('user').value;
//   const pass = document.getElementById('pass').value;
// };
