const express = require('express');
const path = require('path');
const taskController = require('./controllers/taskController');

const app = express();

const PORT = 3333;

// json + url encoder
app.use(express.json());
app.use(express.urlencoded( { extended: true } ))

app.use('/secret', (req, res) => {
	res.sendFile(path.join(__dirname, '../views/secret.html'))
})

app.post('/addTask', taskController.postTask, (req, res) => {
	res.sendStatus(200)
})

app.get('/getTasks', taskController.getTasks, (req, res) => {
	res.status(200).send(res.locals.tasks)
})

// serve static files
app.use('/assets', express.static(path.join(__dirname, '../assets')))
app.use('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../views/index.html'))
})

// catch all

// global error handler

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
});