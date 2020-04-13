const buttonClick = document.getElementById('retrieve');
const allTaskDisplay = document.getElementById('task-list');
const addTask = document.getElementById('task-button');

buttonClick.addEventListener(
	'click',
	() => {
		fetch('/secret/tasks')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				data.forEach((el) => {
					const singleTask = document.createElement('li');
					const xButton = document.createElement('button');
					xButton.className = 'remove';
					xButton.textContent = 'x';
					singleTask.textContent = el;
					allTaskDisplay.appendChild(singleTask);
					singleTask.appendChild(xButton);
				});
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		//makes tasks display only once
	},
	{ once: true }
);

addTask.addEventListener('click', () => {
	fetch('/secret/tasks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			postTasks: allTaskDisplay.value,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			const oneTask = document.createElement('li');
			let deleteButt = document.createElement('button');
			deleteButt.textContent = 'x';
			deleteButt.className = 'del';
			oneTask.textContent = data[0].item;
			allTaskDisplay.appendChild(oneTask);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
});
