const getTask = () => {
	fetch('/task')
		.then((res) => res.json())
		.then((tasks) => {
			const list = document.getElementById('task-list');
			list.innerHTML = '';
			tasks.forEach((task) => {
				addItem(task);
			});
		})
		.catch((err) => console.log(err));
};
// if you don't want display your list when you signin successfully  than uncomment below line
getTask();

const addItem = (task) => {
	const newLi = document.createElement('li');
	newLi.innerText = task.item;
	newLi.id = task._id;
	const button = document.createElement('button');
	const list = document.getElementById('task-list');
	button.innerText = 'X';
	button.className = 'remove';
	newLi.appendChild(button);
	list.appendChild(newLi);
	// console.log(newLi.id);
	button.addEventListener('click', () => {
		fetch(`/task/${newLi.id}`, {
			method: 'delete',
		})
			.then((res) => res.json())
			.then(() => {
				document.getElementById('task-list').removeChild(newLi);
			})
			.catch((err) => console.log(err));
	});
};

const refresh = document.getElementById('retrieve');
refresh.addEventListener('click', getTask);
const addButton = document.getElementById('task-button');
addButton.addEventListener('click', (e) => {
	e.preventDefault();

	let taskInput = document.getElementById('task');

	const body = {
		item: taskInput.value,
	};
	// console.log(body);
	fetch('/task', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		// .then(console.log('im here'))
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			taskInput.value = '';
			// if you want display new tas immediately after adding than uncomment below line
			// getTask();
		})
		.catch((err) => console.log(err));
});
