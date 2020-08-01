const paragraph = document.createElement('p');
paragraph.innerText = "well this didn't go as expected";
document.body.append(paragraph);
const getTasks = () => {
  fetch('/tasks')
    .then((resp) => resp.json())
    .then((tasks) => {
      // console.log('!!!!!: ', tasks);
      const list = document.getElementById('task-list');
      // console.log('list', list);
      list.innerHTML = '';
      tasks.forEach((task) => {
        const newItem = document.createElement('li');
        newItem.innerText = task.item;
        //console.log(newItem);
        newItem.id = task._id;
        const button = document.createElement('button');
        button.innerText = 'X';
        newItem.appendChild(button);
        list.appendChild(newItem);
        // button.addEventListener('click', () => {
        //   fetch(`/delete/${reminder_.id}`, {
        //     method: 'Delete',
        //   })
        //   .then(resp) =>
        // })
      });
    });
};

// console.log(e.target.value);

const addTask = (e) => {
  fetch('/add', {
    method: 'POST',
    body: JSON.stringify(e.target.value)
  });
};

document.getElementById('retrieve').addEventListener('click', getTasks());

document.getElementById('task').addEventListener('submit', (e) => {
  console.log(e.value);
  e.preventDefault();
});
