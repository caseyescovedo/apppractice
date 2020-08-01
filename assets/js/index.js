/* Functionality on Get Tasks button click :
	When the button is clicked to get tasks, 
	all tasks from the database should be displayed as list items in the #task-list element.
	These list items should display the task item followed by a button (inside the list item) with a class of remove and display an X.
	As an example, one list item might look like <li>Go shopping <button class="remove">X</button></li>

	Multiple clicks of the button to get tasks should not display the list items multiple times
*/

const getTasks = document.getElementById('retrieve');
let taskList = document.getElementById('task-list')
getTasks.addEventListener('click', () => {
	fetch('/getTasks')
	.then(resp => resp.json())
	.then(tasks => {
		tasks.forEach(el => {
			const task = document.createElement('li')
			task.innerHTML = el.item
			const button = document.createElement('button')
			button.setAttribute('class', 'remove')
			button.innerHTML = 'X'
			taskList.appendChild(task);
			task.appendChild(button)
		})
		taskList = ''
	})
	.catch(err => console.log(err))
})


/*
Clicking on the button to add a task should take the text from the input field and create a new task in the database.
This task should be seen by clicking the button to get tasks after it has been added.

(Optionally, you can display the new task immediately after adding.)
*/

const addItem = () => {
	// take text from input field
	const input = document.getElementById('task').value;

	const body = {
		task: input
	}

	// send to server with body as user's input
	fetch('/addTask', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body)
	})
	.catch(err => {
		console.log(err)
	})
	// add li to ul
	// append li to ul
}

const addTask = document.getElementById('task-button')
addTask.addEventListener('click', () => addItem())

