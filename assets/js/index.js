// const { listIndexes } = require('../../server/models/TaskModel');

window.onload = () => {
	const getTasksButton = document.getElementById('retrieve');
	let clicked = false;
	getTasksButton.addEventListener('click', () => {
		if (!clicked) {
			clicked = true;
			fetch('http://localhost:3333/viewsecret').then((response) => response.json()).then((data) => {
				console.log(data);
				data.tasks.forEach((task) => loadTasks(task));
			});
		}
		function loadTasks(task) {
			const li = document.createElement('li');
			li.setAttribute('id', task._id);
			li.innerHTML = `${task.item}`;
			const ul = document.querySelector('ul');
			ul.appendChild(li);

			const removeButton = document.createElement('button');
			removeButton.setAttribute('class', 'remove');
			removeButton.innerHTML = 'X';
			removeButton.addEventListener('click', () => {
				fetch(`http://localhost:3333/secret/${task._id}`, {
					headers: {
						'Content-Type': 'application.json'
					},
					method: 'DELETE'
				})
					.then((response) => response.json())
					.then((data) => {
						let removedTask = document.getElementById(task._id);
						removedTask.parentNode.removeChild(removedTask);
					});
			});
			li.appendChild(removeButton);
		}
	});

	const addButton = document.getElementById('task-button');
	addButton.addEventListener('click', () => {
		const newTask = document.getElementById('task').value;
		console.log(newTask);
		fetch('http://localhost:3333/secret', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				item: newTask
			})
		});
	});
};
