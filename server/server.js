const express = require('express');
const app = express();
const port = 3333;
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.static('assets'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', authController.checkCookie, (req, res) => {
	res.sendFile(path.join(__dirname, '../views/secret.html'));
});

app.post('/secret', taskController.postTask, (req, res) => {
	res.status(200).json('This task has been added.');
});

app.get('/viewsecret', taskController.getTasks, (req, res) => {
	res.status(200).json({ tasks: res.locals.tasks });
});

app.delete('/secret/:id', taskController.deleteTask, (req, res) => {
	res.status(200).json('This task has been deleted.');
});

app.post('/signin', authController.checkCred, authController.setCookie, (req, res) => {
	res.redirect('/secret');
});

app.listen(port, () => console.log(`Listening to http://localhost:${port}/`));
