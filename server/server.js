const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;
const taskController = require('./controllers/taskController');

app.use(express.json());
app.use(express.static('assets'));

app.get('/todo', taskController.getTasks, (req, res) => {
  res.json(res.locals.tasks);
});
// if go to Elephant SQL and do `INSERT into Task (item, created_at) VALUES ('do laundry', CURRENT_TIMESTAMP);`
// and go to http://localhost:3333/todo, can see [{"item":"do laundry","created_at":"2020-01-12T05:45:32.445Z"}]

app.post('/todo', taskController.postTask, (req, res) => {
  // res.json(res.locals.taskPosted);
});

app.delete('/todo', taskController.deleteTask, (req, res) => {
  // res.json(res.locals.taskDeleted);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

app.get('*', (req, res) => {
  res.status(404);
});

app.use((err, req, res, next) => {
  res.status(500).send(`Error: ${err}`);
});

app.listen(PORT);

// documentation used:
// https://expressjs.com/en/api.html#app.get.method
