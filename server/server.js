const express = require('express');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = 3333;

app.use(cookieParser())
// parse json
app.use(express.json());
// parse urlencoded
app.use(express.urlencoded({ extended: true }))
// serve static assets
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// serve secret.html
app.get('/secret', authController.verifyCookie, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

app.post('/signin', authController.verifyPass, (req, res) => {
  res.redirect('/secret');
})

app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks)
});

app.post('/tasks', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.task);
});

app.delete('/tasks', taskController.deleteTask, (req, res) => {
  res.status(200).json({ id: res.locals.id })
});

// serve index.html
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

// 404 handler
app.use('*', (req, res) => {
  res.sendStatus(404);
})

// error handler
app.use((err, req, res, next) => {
  console.log(`Server ERROR: ${err}`);
  res.sendStatus(500);
})

// start server
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}...`);
})

module.exports = app;
