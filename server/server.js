const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');


const app = express();
// const Task = require('./models/TaskModel');

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', (req, res, next) => {
    return res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', authController.checkCookie, (req, res, next) => {
    return res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.post('/signin', authController.logIn);

app.post('/task', taskController.postTask, (req, res, next) => {
    return res.json(res.locals.task);
});

app.get('/task', taskController.getTasks, (req, res, next) => {
    return res.json(res.locals.found);
});

app.delete('/task', taskController.deleteTask, (req, res, next) => {
    return res.sendStatus(200);
});

app.use((req, res, next, err) => {
    console.log(err);
})

app.listen(3333, () => console.log('server is listening on 3333'));
