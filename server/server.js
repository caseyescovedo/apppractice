const express = require('express');
const app = express();
const path = require('path');
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const PORT = 3333;

// Set up body parser
app.use(bodyParser());

// Parse incoming cookies
app.use(cookieParser());

// Serve static files
app.use(express.static('./'));
app.use(express.static('views'));

// Sign-in route handler
app.use('/signin', authController.verifyUser, (req, res) => {
  express.static('./');
  res.status(200).cookie('token', 'admin', { expires: new Date(Date.now() + 900000), httpOnly: true }).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// Direct /secret route handler
app.use('/secrets', authController.verifyUser, (req, res) => {
  res.status(200).sendFile('../views/secret.html');
});

// GET method route handler
app.get('/api', taskController.getTasks, (req, res) => {
  res.status(200).send(res.locals.items);
})

// POST method route handler
app.post('/api', taskController.postTask, (req, res) => {
  res.status(200).send(res.locals.newItem);
});

// DELETE method route handler
app.delete('/api', taskController.deleteTask, (req, res) => {
  res.status(200).send(res.locals.deletedItem)
});

app.listen(PORT, () => console.log(`Listening on port no. ${PORT}`));