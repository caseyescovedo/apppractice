

document.getElementById('retrieve').addEventListener('click', (e) => {
  fetch('/secret/api')
    .then(res => res.json())
    .then(data => {
        data.forEach((taskObj) => {
						appendToDom(taskObj)
        });
    });
});


// incompleted

// document.getElementById('task-button').addEventListener('click', (e) => {
// 	const task = document.getElementById('task');
// 	console.log(task)
// 	const taskValue = task.value;
// 	fetch('/secret/api', {
// 		method: "POST",
// 		header: {
// 			"content-type": "application/json"
// 		},
// 		body: JSON.stringify({ item: taskValue })
// 	})
// 	.then(res => res.json())
// 	.then(data => {
// 		const taskObj = data;
// 		const newTag = document.createElement('li');
// 		newTag.id = taskObj.todo[0].id;
// 		newTag.innerText = goalObj.todo[0].item;
// 		document.getElementById('task-list').appendChild(newTag);
// 	})
// })


function appendToDom(taskObj) {
	const newTask = document.createElement('li');
	newTask.id = taskObj.id;
	newTask.innerText = taskObj.item;
	const buton = document.createElement('button');
	buton.innerHTML = 'remove';
	buton.id = taskObj.id;
	buton.addEventListener('click', e => {
		fetch(`/api/${e.target.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => resp.json)
		.then(data => {
			document.getElementById('task-list').removeChild(newTask)
		});
	});
	document.getElementById('task-list').appendChild(newTask).appendChild(buton);
};
