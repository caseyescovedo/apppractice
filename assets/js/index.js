

class TaskList {
  constructor() {
    this.tasks = [];
    this.length = 0;
    this.getterbutton = $('#retrieve');
  }
  deleteTask() {
  
  }
  async addTask({id, item}) {
    const task = new Task(task.id, task.item);
    this.tasks.push(task);
    this.length += 1;
    return task.element;
  }
  async getTasks() {
    const raw = await fetch('/secret/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await raw.json();
    return [...data];
  }
}


class Task  {
  constructor(id, text){
    this.id = id;
    this.element = `<li> ${text} <button id="${id}"  class="remove">X</button></li>`;
  }
}

const taskList = new TaskList();
$(document).ready(function(){
  console.log('welcometo secret');
  
  $('#retrieve').on('click',  (e) => {
    let tasks = [];
    taskList.getTasks()
        .then(data => {
        
      for (const el of data) {
        const task = new Task(el._id, el.item);
        console.log(typeof task.element);
        $(`#task-list`).append(task.element);
      }
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
  
});



