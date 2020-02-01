const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const taskController = require('./controllers/taskController');

const PORT = 3333;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/assets', express.static(path.join(__dirname, '../assets')));

// app.use('/tasks', tasks);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

app.get('/tasks/getTasks', taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.post('/tasks/postTasks', taskController.postTask, taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.delete('/user', taskController.deleteTask, taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

app.listen(PORT, () => console.log(`To-Do list app listening to port ${PORT}`));
