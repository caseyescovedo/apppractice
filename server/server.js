const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
PORT = 3333;
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');



// global middleware

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../views')));
app.use(express.static(path.resolve(__dirname, '../assets')));

app.get('/secret', authController.isLoggedIn, (req, res) => {
	res.sendFile(path.resolve(__dirname, '../views/secret.html'))
})
app.use('/signin', authController.verify)

app.post('/add', taskController.postTask)

app.get('/tasks', taskController.getTasks)

app.delete('/delete', taskController.deleteTask)



// catch-all handler for unknown routes

app.use((req, res) => {
	res.sendStatus(404);
});


// global error handler

app.use((req, res, err, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log('Listening on port 3333...'));