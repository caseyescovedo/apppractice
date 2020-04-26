const path = require('path');
const express = require('express');
const taskController = require('./controllers/taskController')

const app = express();
const PORT = 3333;


app.use(express.json());

app.use(express.static(path.join(__dirname, '../assets')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

// handle adding tasks
app.post('/', taskController.postTask, (req, res) => {
  res.sendStatus(200);
})

// handle getting tasks
app.get('/getTasks', taskController.getTasks, (req, res) => {
  console.log('res.locals', res.locals.tasks)
  res.status(200).json(res.locals.tasks);
})

// catch-all route handler for any requests to an unknown route
app.use((req, res, next) => {
  res.sendStatus(404)
})


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});


module.exports = app;