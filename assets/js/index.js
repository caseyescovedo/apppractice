document.querySelector('#retrieve').addEventListener('click', async () => {
  const res = await fetch('/api/db');
  const data = await res.json();
  const taskList = document.querySelector('#task-list');
  taskList.innerHTML = '';

  data.forEach((task) => {
    const todo = task.item;
    taskList.innerHTML += `<li id="${task._id}">${todo} <button class="remove">X</button></li>`;
  });

  addRemoveEventListener();
});

document.querySelector('#task-button').addEventListener('click', async () => {
  const textInput = document.querySelector('#task');
  const newTodo = textInput.value;
  try {
    const res = await fetch('/api/db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item: newTodo }),
    });
    const added = await res.json();
    const todo = added.item;

    const taskList = document.querySelector('#task-list');
    taskList.innerHTML += `<li id="${added._id}">${todo} <button class="remove">X</button></li>`;

    addRemoveEventListener();
  } catch (err) {
    console.log(err);
  }
  textInput.value = '';
});

function addRemoveEventListener() {
  document.querySelectorAll('.remove').forEach((btn) =>
    btn.addEventListener('click', async (e) => {
      console.log(e.target.parentNode.id);
      const id = e.target.parentNode.id;

      try {
        fetch('/api/db', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        e.target.parentNode.remove();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
