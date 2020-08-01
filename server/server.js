const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve('./assets')));

app.get('/', (req, res) => {
	return res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.post('/signin', authController.checkCredentials, (req, res) => {
	res.status(200).redirect('/secret');
});

app.get('/notsuccess', (req, res) => {
	res.status(200).send('unsuccessful login attempt');
});

app.get('/secret', authController.checkCookies, (req, res) => {
	return res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});
app.get('/task', taskController.gettask, (req, res) => {
	// console.log('getrequest');
	return res.status(200).json(res.locals.datas);
});
app.post('/task', taskController.addtask, (req, res) => {
	// console.log('hello add');
	return res.status(200).json(res.locals.data);
});

app.delete('/task/:id', taskController.deletetask, (req, res) => {
	// console.log('hello delete');
	return res.status(200).json(res.locals.data);
});

app.use('*', (req, res) => {
	return res.sendStatus(404);
});

app.use((err, req, res, next) => {
	return res.sendStatus(500);
});
app.listen(PORT, () => {
	console.log('hello server is working');
});

module.exports = app;
