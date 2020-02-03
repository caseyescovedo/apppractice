const express = require('express');
const app = express();
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const PORT = 3333;

app.use(express.json());
app.use(express.static('./assets'));

app.get('/', (req, res) => {
  res.send(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', authController.addCookie, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.post(
  //allow user to add a new task and then display all current tasks to them
  '/todos',
  taskController.postTask,
  taskController.getTasks,
  (req, res, err) => {
    res.status(200).json(res.locals.tasks);
  }
);

app.get('/todos', taskController.getTasks, (req, res, err) => {
  res.status(200).json(res.locals.tasks);
});

app.delete(
  '/todos',
  taskController.deleteTask,
  taskController.getTasks,
  (req, res, next) => {
    res.status(200).json(res.locals.tasks);
  }
);

app.use((req, res, next, err) => {
  if (err) {
    console.log(
      'global error handler - should add an error obj here at some point'
    );
  }
});

app.listen(PORT, console.log(`connected on port ${PORT}`));

module.exports = app;
