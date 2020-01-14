

class TaskList {
  constructor() {
    this.tasks = [];
    this.length = 0;
    this.getterbutton = $('#retrieve');
  }
  deleteTask() {
    console.log('delete task worked');
  }
  async addTask(item) {
    console.log('add task worked');
    fetch('/secret', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        item: item
      }
    })
    .then(data => {
      if(data) {
        const task = new Task(id, item);
        this.tasks.push(task);
        this.length += 1;
        $(`#task-list`).append(task.element);
      }
    })
    .catch(e => console.log(e));
    
  }
  async getTasks() {
    
    try{
    console.log('get tasks worked');
    const raw = await fetch('/secret/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await raw.json();
    return [...data];
    }
    catch ( e ) {
      console.log(e);
    }
  }
}


class Task  {
  constructor(id, text){
    this.id = id;
    this.element = `<li> ${text} <button id="${id}"  class="remove">X</button></li>`;
  }
}


$(document).ready(function(){
  const taskList = new TaskList();
  let item = '';
  $('#task').on('keydown', e => {
    console.log(e.key)
    item = item.concat(e.key);
    console.log(item);
  });
  $('#retrieve').on('click',  (e) => {
    console.log(e);
    taskList.getTasks()
        .then(data => {
      for (const el of data) {
        if ( taskList.tasks.map(e => e.id).includes(el._id) ) continue;
          taskList.addTask(el._id, el.item);
      }
      console.log(taskList.tasks);
        });
  });
  $('#task-list').on('click', e => {
    fetch('/secret', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        item: e.target.innerText,
        id: e.target.id
      },
    })
    .then(res => {console.log(res)});
    console.log(e.target.id);
  })
  $('#task-button').on('click', e => {
    console.log(e);
    // taskList.addTask()
  })
  
});



