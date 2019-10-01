const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = 3333;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.json());


const authController = require('./controllers/authController.js')
const taskController = require('./controllers/taskController.js')


app.post('/signin', authController.signin, (req, res) => {
  res.redirect('/secret');
});

app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200).send(res.locals.tasks)
})

app.post('/task', taskController.postTask, (req, res) => {
  res.status(200).send(res.locals.task)
})

app.post('/delete', taskController.deleteTask, (req, res) => {
  res.status(200).send();
})

app.get('/secret', authController.session, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
})

app.use(express.static('assets'));

app.use('*', (req, res, next) => {
  res.status(404).send("Not Found!");
});

app.use((err, req, res, next) => {
  res.status(500).send('Server Error!');
});

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT} ....`));
