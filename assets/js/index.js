// vanilla dom here

// display info from todo list
const getTasksBtn = document.querySelector('#retrieve');
getTasksBtn.addEventListener('click', () => {
  displayList;
})
const list = document.getElementById('task-list');
const displayList = () => {
  // fetch request
  fetch('/api')
    .then((res) => res.json())
    .then((data) => {
      for (let elem of data.rows) {
        const li = document.createElement('li');
        for (let prop in elem) {
          const para = document.createElement('p');
          para.innerText = elem[prop];
          li.append(para);
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', (event) => {
          deleteItem(elem._id);
        });
        li.append(deleteBtn);
      }
    })
    .catch((err) => console.log(err));
}