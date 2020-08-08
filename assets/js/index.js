document.addEventListener('DOMContentLoaded', () => {
	const getTasksButton = document.getElementById('retrieve');
	getTasksButton.addEventListener('click', getTasks);
	const addTasksButton = document.getElementById('task-button');
	addTasksButton.addEventListener('click', addTasks);
});

function addTasks() {
	const newTaskInput = document.getElementById('task').value;
	if (newTaskInput) {
		fetch('http://localhost:3333/secret/tasks', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ item: newTaskInput })
		})
			.then((response) => response.json())
            .catch((err) => console.log(err));
        clearFields();
		getTasks();
	
	}
}

function clearFields() {
	document.getElementById('task').value = '';
}

function getTasks() {
	// get tasks
	fetch('http://localhost:3333/secret/tasks')
		.then((result) => result.json())
		.then((data) => {
			// for each task envoke renderTasks
			data.forEach((task) => {
				renderTasks(task);
			});
		})
		.catch((err) => console.log(err));
}

function renderTasks(task) {
	const parent = document.getElementById('task-list');
	if (!document.getElementById(task._id)) {
		// display tasks as list items
		const listItem = document.createElement('li');
		listItem.innerText = task.item;
		parent.appendChild(listItem);

		// create delButton
		const delButton = document.createElement('button');
		delButton.innerText = 'X';
		delButton.id = task._id;
		delButton.className = 'remove';
		listItem.appendChild(delButton);

		// add click (event listener) on X button
		delButton.addEventListener('click', deleteTask);
	}
}

function deleteTask(event) {
	const { id } = event.target;
	// delete the task from the database
	fetch(`http://localhost:3333/secret/tasks/${id}`, {
		method: 'DELETE'
	})
		.then((res) => res.json())
		.then((data) => {
			// remove the item from the list (immediately)
			if (data) {
				event.target.parentElement.remove();
			}
		})
		.catch((err) => console.log(err));
}
