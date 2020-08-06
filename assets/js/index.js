/* <--------------------------------- LOGIN PAGE ---------------------------------> */


/*
	Login:
	When the sign in form is submitted, it should redirect to the secret page route. 
*/

if (window.location.pathname !== '/secret') {

	const submit = document.getElementById('submit');

	submit.addEventListener('click', (e) => {
		e.preventDefault()

		const username = document.getElementById('user').value;
		const password = document.getElementById('pass').value;

		const body = {
			username, password
		}

		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		.then(resp => resp.json())
		.then(data => {
			if (data.success === true) {
				window.location.pathname = '/secret'
			} else {
				alert('unsuccessful login attempt')
			}
		})
		.catch(err => console.log(err))
	})
}


/* <--------------------------------- SECRET PAGE ---------------------------------> */


if (window.location.pathname === '/secret') {

	const taskList = document.getElementById('task-list')

	/*
		Clicking on any list item's `X` button should remove the item from the list (immediately)
		and delete the task from the database
	*/

	const deleteItem = (e) => {
		const taskID = document.getElementById(e.target.parentNode.id)
		fetch(`/deleteTask/${e.target.parentNode.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'applicatioin/json'
			}
		})
		taskID.parentNode.removeChild(taskID)
	}

	/*
		Add item helper function
	*/
	
	const addItem = (tasks) => {
		taskList.innerHTML = ''

		tasks.forEach(el => {
			const task = document.createElement('li')
			// eslint-disable-next-line dot-notation
			task.setAttribute('id', el['_id'])
			task.innerHTML = el.item
			const button = document.createElement('button')
			button.setAttribute('class', 'remove')
			button.addEventListener('click', (e) => deleteItem(e))
			button.innerHTML = 'X'
			taskList.appendChild(task);
			task.appendChild(button);
		})
	}

	/*
		Functionality on Get Tasks button click :
		When the button is clicked to get tasks, 
		all tasks from the database should be displayed as list items in the #task-list element.
		These list items should display the task item followed by a button (inside the list item) with a class of remove and display an X.
		As an example, one list item might look like <li>Go shopping <button class="remove">X</button></li>

		Multiple clicks of the button to get tasks should not display the list items multiple times
	*/

	const getTasks = document.getElementById('retrieve');

	getTasks.addEventListener('click', () => {
		fetch('/getTasks')
		.then(resp => resp.json())
		.then(tasks => {
			addItem(tasks)
		})
		.catch(err => console.log(err))
	})

	/*
		Clicking on the button to add a task should take the text from the input field and create a new task in the database.
		This task should be seen by clicking the button to get tasks after it has been added.

		(Optionally, you can display the new task immediately after adding.)
	*/

	const addTask = document.getElementById('task-button')

	addTask.addEventListener('click', () => {
		const input = document.getElementById('task').value;

		const body = {
			task: input
		}

		fetch('/addTask', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		})
		.catch(err => console.log(err))
	})
}