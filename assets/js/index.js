const taskList = document.getElementById('task-list');
const retrieve = async () => {
  try {
    const allTasks = await axios.get('/api/secret');
    // console.log(allTasks.data);
    taskList.innerHTML = '';
    allTasks.data.forEach((item) => {
      appendTask(item);
    });
  } catch (err) {
    console.log(err);
  }
};

const getTasks = document.getElementById('retrieve');
getTasks.addEventListener('click', retrieve);

const appendTask = (task) => {
  const taskItem = document.createElement('li');
  taskItem.innerText = task.item;
  taskItem.id = task._id;
  const removeButton = document.createElement('button');
  removeButton.className = 'remove';
  removeButton.innerText = 'X';
  removeButton.addEventListener('click', () => {
    const deleteItem = async () => {
      try {
        await axios.delete(`/api/secret/${task._id}`);
        taskList.removeChild(taskItem);
      } catch (err) {
        console.log(err);
      }
    };

    deleteItem();
  });
  taskItem.appendChild(removeButton);
  taskList.appendChild(taskItem);
};

const taskSubmit = document.getElementById('task-button');
taskSubmit.addEventListener('click', (e) => {
  const taskInput = document.getElementById('task');
  const body = {
    item: taskInput.value,
  };

  const postTask = async () => {
    try {
      const newTask = await axios.post('/api/secret', body);
      // console.log('newTask', newTask);
      taskInput.value = '';
      appendTask(newTask.data);
    } catch (err) {
      console.log(err);
    }
  };
  postTask();
});
