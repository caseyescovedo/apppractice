const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();
const PORT = 3333;

// Parse request body
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.resolve(__dirname, '../assets')));
// Main route
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html')),
);

// Serve secret page
app.get('/secret', authController.checkCookie, (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html')),
);

// Add tasks
app.post('/add', taskController.postTask, (req, res) => res.status(200).json(res.locals.task));
// Retrieve tasks
app.get('/retrieve', taskController.getTasks, (req, res) => res.status(200).json(res.locals.tasks));
// Delete a task
app.post('/delete', taskController.deleteTask, (req, res) =>
  res.status(200).json(res.locals.deleted),
);
// Sign in
app.post('/signin', authController.authorizeUser, (req, res) => res.redirect('/secret'));
// * need to modify global error hanlder
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(400).send(err);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
