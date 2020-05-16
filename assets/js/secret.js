document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#retrieve').addEventListener('click', () => {
        fetch('/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': '/application/json'
            }
        })
        .then(res => console.log(res));
    });

    document.querySelector('#task-button').addEventListener('click', () => {
        fetch('/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': '/application/json'
            }
        })
        .then(res => console.log(res));
    });
});