//--------SECRET-------\\

const list = document.querySelector('#task-list');
const addBtn = document.querySelector('#task-button');
const getBtn = document.querySelector('#retrieve');

addBtn.onclick = () => {
  const inputVal = document.querySelector('#task').value;
  console.log('inputval', inputVal);
  const payload = { value: inputVal };

  fetch('/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('addBtn data from server', data);
    });
  document.querySelector('#task').value = '';
};

getBtn.onclick = () => {
  list.innerHTML = '';
  fetch('/task')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((el) => {
        const listItem = document.createElement('li');
        listItem.innerText = el.item;
        console.log(el.item);
        listItem.textAlign = 'left';
        list.appendChild(listItem);

        const delBtn = document.createElement('button');
        delBtn.innerText = 'del';
        delBtn.className = 'delBtn';
        delBtn.onclick = () => {
          fetch(`/task/${el.id}`, {
            method: 'DELETE',
          })
            .then((res) => res.json())
            .then((data) => console.log('delBtn data from server', data));
        };
        listItem.appendChild(delBtn);
      });
    });
};
