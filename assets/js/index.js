const list = document.querySelector('#task-list');
const input = document.querySelector('#task');
const AddButton = document.querySelector('#task-button');
const getTask = document.querySelector('#retrieve')


fetch('/signin', {
	method: 'POST',
	body: JSON.stringify({ username: "nikki", password: "12345" }),
	headers: {
		"Content-Type": "application/json"
	}
})
	.then(response => response.json())
	.then(data => {
		// console.log('fetch data: ', data)

		toDoItemArr = data.todo; // store the data to global variable for future use when sending patch request


	});
