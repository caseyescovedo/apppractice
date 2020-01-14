const express = require('express');
const app = express();
const path = require('path');

const taskController = require('./controllers/taskController')

const PORT = 3333;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
})

app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
})

app.post('/postTask', taskController.postTask, (req, res) => {
  res.json(res.locals.task);
})

app.get('/getTasks', taskController.getTasks, (req, res) => {
  res.json(res.locals.tasks);
})

app.delete('/deleteTask', taskController.deleteTask, (req, res) => {
  res.json(res.locals.task);
})


app.use('*', (req, res) => {
  console.log("REQUEST NOT FOUND");
  res.sendStatus(404);
})

app.use((err, req, res, next) => {
  console.log(`UNCAUGHT MIDDLEWARE ERROR: ${err}`);
})

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
