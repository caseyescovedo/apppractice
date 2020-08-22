const getButton = document.getElementById('retrieve');
const addButton = document.getElementById('task-button');
const list = document.getElementById('task-list');
const task = document.getElementById('task');

let clicked = 0;

getButton.addEventListener('click', (e) => {
	e.preventDefault();
	if (clicked < 1) {
		clicked++;
		fetch('http://localhost:3333/tasks')
			.then(res => res.json())
			.then(res => {
				for (let todo of res) {
					const li = document.createElement('li');
					li.textContent = todo.item;
					li.setAttribute('id', todo._id);
					const bttn = document.createElement('button');
					bttn.textContent = 'X';
					bttn.setAttribute('class', 'remove');
					li.append(bttn)
					bttn.addEventListener('click', (e) => {
						e.preventDefault();
						let li = bttn.parentNode;
						const reqBody = JSON.stringify({ id: bttn.parentNode.id });
						fetch('http://localhost:3333/delete', {
							method: 'DELETE',
							headers: { 'Content-Type': 'application/json' },
							body: reqBody
						}).then(res =>
							li.remove())
					})
					list.append(li)
				}
			})
			.catch(err => console.log(err))
	}
})

addButton.addEventListener('click', (e) => {
	e.preventDefault();
	const reqBody = JSON.stringify({ item: task.value });
	fetch('http://localhost:3333/add', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: reqBody
	}).then(res => {
		const li = document.createElement('li');
		li.textContent = task.value;
		const bttn = document.createElement('button');
		bttn.textContent = 'X';
		bttn.setAttribute('class', 'remove');
		li.append(bttn);
		bttn.addEventListener('click', (e) => {
			e.preventDefault();
			let li = bttn.parentNode;
			const reqBody = JSON.stringify({ id: bttn.parentNode.id });
			fetch('http://localhost:3333/delete', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: reqBody
			}).then(res =>
				li.remove())
		})
		list.append(li)
	})
		.catch(err => console.log(err))
})
