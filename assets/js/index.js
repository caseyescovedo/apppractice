const ul = document.getElementById('task-list');
const allTasksButton = document.getElementById('retrieve');
const taskForm = document.getElementById('task-form');
let tasksDisplayed = false;

const createLiTask = (todo) => {
    const task = document.createElement('li');
    const deleteButton = document.createElement('button');
    task.setAttribute('id', todo.id);
    deleteButton.classList.add('remove');
    deleteButton.textContent = 'X';
    deleteButton.setAttribute('data-id', todo.id);
    task.textContent = todo.item;
    task.appendChild(deleteButton);
    ul.prepend(task);
};

allTasksButton.addEventListener('click', async () => {
    if (tasksDisplayed) return;
    tasksDisplayed = true;
    try {
        const res = await fetch('/tasks');
        const tasks = await res.json();
        tasks.forEach(task => {
            createLiTask(task);
        });
        console.log(tasks);
    } catch(err) {
        console.log('error getting all tasks', err);
    }
});

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    try {
        const res = await fetch('/task', {
            method: 'POST',
            body: JSON.stringify({
                task: e.target[0].value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const task = await res.json();
        e.target[0].value = '';
        console.log(task);
        if (tasksDisplayed) createLiTask(task);
    } catch(err) {
        console.log('error creating a task', err);
    }
});

document.body.addEventListener('click', async (e) => {
    const button = e.target;
    const task = document.getElementById(e.target.dataset.id);
    if (button.className === 'remove') {
        try {
            await fetch('/task', {
                method: 'DELETE',
                body: JSON.stringify({
                    id: button.dataset.id,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            task.remove();
        } catch(err) {
            console.log('error deleting a task', err);
        }
    }
});