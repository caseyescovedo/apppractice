const express = require('express');
const app = express();
const path = require('path')
const authController = require('./controllers/authController')
const taskController = require('./controllers/taskController')
const PORT = 3333;
const Task = require('./models/TaskModel')

app.use(express.json());
app.use(express.urlencoded())

app.get('/', (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
})

app.use(express.static('../assets'));

app.post('/post',
	taskController.postTask,
	(req, res) => {
		res.status(200).json(res.locals.create)
	})

app.get('/getTasks', function (req, res, next) {
	Task.find({}, function (err, tasks) {
		var taskMap = {};

		tasks.forEach(function (task) {
			taskMap[task.item] = task;
			console.log(task.item)
		});

		res.json(taskMap);
	});
});


app.delete('/getTasks/:id', taskController.deleteTask);

app.post('/signup', authController.createUser,
	(req, res) => {
		res.status(200).json(res.locals.newuser)
		// (req, res) => {
		// 	res.redirect('/secret')
	}
);

app.post('/signin', authController.verifyUser, (req, res) => {
	//if successful lead them to secret
	res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
});

app.listen(PORT, function () {
	console.log("server started on 3333")
})