const express = require('express');
const app = express();
const path = require('path');

const PORT = 3333;

const taskController = require('./controllers/taskController.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, '../assets/css')));
app.use('/js', express.static(path.join(__dirname, '../assets/js')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

app.get('/secret/tasks', taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.data);
});

app.post('/secret/tasks', taskController.postTask, (req, res) => {
  return res.status(200).json(res.locals.data);
});

app.delete('/secret/tasks/:id', taskController.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.data);
});

app.use('*', (req, res) => {
  return res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});