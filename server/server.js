const express = require('express');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('assets'));

app.get('/secret', authController.verifyCookie, (req, res) => {
	res.sendFile(path.join(__dirname, '../views/secret.html'));
});

app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
	res.redirect('/secret');
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret/tasks', taskController.getTasks);

app.post('/secret/tasks', taskController.postTask);

app.delete('/secret/tasks/:id', taskController.deleteTask);

app.use('*', (req, res) => {
	return res.status(404).json(`Page Doesn't Exist`);
});

app.use((err, req, res, next) => {
	console.log(err);
	const error = {
		status: 500,
		log: 'Internal Server Error'
	};
	const myError = {
		...error,
		...err
	};
	res.status(myError.status).send(myError.log);
});

app.listen(3333, () => {
	console.log('Server is running on Port 3333');
});

module.exports = app;
