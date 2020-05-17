document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    let retrieve = document.querySelector('#retrieve')
    retrieve.addEventListener('click', () => {
        fetch('http://localhost:3333/getTasks').then(tasks => {
            let current = document.querySelectorAll('li');
            current.parentNode.removeChild(current);
            let newList = document.querySelector('#task-list')
            for(const task of tasks) {
                let item = document.createElement('li');
                item.id = task._id;
                item.innerHTML = `${task.item}`;
                let removeB = document.createElement('button');
                button.innerHTML = 'X';
                button.className = 'remove';
                item.append(removeB);
                newList.append(item);
            }
        })
    });

    let taskButton = document.querySelector('#task-button');
    taskButton.addEventListener('click', () => {
        let newTask = document.querySelector('#task').value;
        if(newTask) {
            fetch('http://localhost:3333/postTask', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item: newTask }),
              }).then(data => {
                  console.log(data);
              });
        }
    });
});