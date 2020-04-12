//install dependencies
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

//connect to databse information
const taskMessageRoute = require('./controllers/taskController');

//port number server will listen on
const PORT = 3333;

//define static files(css, js)
//in case path changes, makes sure it always is correct
app.use('/', express.static(path.resolve(__dirname, '../assets')));

//define route handlers
app.get('/', (req, res) => {
	//set headers
	//are not necessary according to Augustine
	// res.set({ 'content-type': 'text/html; charset=utf-8' }),
	//send HTML file as part of response
	res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
	//set headers
	//send HTML file as part of response
	res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

//get all messages
app.get('/secret/tasks', taskMessageRoute.getTasks, (req, res) => {
	//send back to client list of messages in JSON
	res.status(200).json(res.locals.tasks);
});

//post new message into database
app.post('/secret/tasks', taskMessageRoute.postTasks, (req, res) => {
	//send back to client list of messages in JSON
	res.status(200).json(res.locals.postTask);
});

app.delete('/secret/tasks:id', taskMessageRoute.deleteTask, (req, res) => {
	//send back to client list of messages in JSON
    //res.status(200).json(res.locals.postTask);
    res.status(200);
});


//unknown route handler
app.use('*', (req, res) => {
	res.sendStatus(404);
});

//middleware function error
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr);
	res.status(errorObj.status).json(errorObj.message);
});

//app listening on port 3333
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

module.exports = app;
