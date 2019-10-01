const express = require('express');
const app = express(); // preparing express for use
const bodyParser = require('body-parser'); // may need
const cookieParser = require('cookie-parser');
const path = require('path'); // may need
const PORT = 3333 // PORT 3333 as requested
const taskController = require('./controllers/taskController');

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/views', express.static(path.resolve(__dirname, '../views/')));
app.use('/css', express.static(path.resolve(__dirname, '../assets/css')));
app.use('/js', express.static(path.resolve(__dirname, '../assets/js')));


app.get('/', function (req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/tasks', taskController.getTasks, function (req, res) {
  console.log('final callback on /tasks hit', res.locals.tasks);
  res.status(200);
  res.json(res.locals.tasks);
});

app.post('/tasks', function (req, res) {
  console.log('final callback on post /tasks hit');
  res.send('task added');
});

app.get('/secret', function (req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.use('*', function (req, res) {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.status(500).send('Global error handler hit');
});

app.listen(PORT, () => console.log(`this FANTASTIC server is listening on port ${PORT}`));