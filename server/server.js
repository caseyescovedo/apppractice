const express = require('express');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const app = express();

const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/css/style.css', (req, res) => {
  res
    .set({ 'Content-Type': 'text/css; charset=UTF-8' })
    .status(200)
    .sendFile(path.resolve(__dirname, '../assets/css/style.css'));
});

app.get('/js/index.js', (req, res) => {
  res
    .set({ 'Content-Type': 'text/css; charset=UTF-8' })
    .status(200)
    .sendFile(path.resolve(__dirname, '../assets/js/index.js'));
});

app.post('/post', taskController.postTasks, (req, res) => {
  res.status(200).json(res.locals.postTasks);
});

app.get('/get', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.allTasks);
});

app.delete('/delete/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals);
});

app.post('/user', authController.signIn, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.use('*', (req, res) => res.sendStatus(404));

app.listen(PORT, () => {
  console.log(`currently listening on ${PORT}...`);
});

module.exports = app;
