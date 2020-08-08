const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const Task = require('./models/TaskModel');
const { postTask, getTask, deleteTask } = require('./controllers/taskController');

app.use(bodyParser.json());

app.use('/', express.static('assets'));
app.use('/', express.static('views'));

// app.use('/secret', express.static('views'));
// app.get('/secret', (req, res, next) => {
//     console.log('SECRET');
    
//     next();
// });

app.use(serveStatic('/secret', { 'index': ['default.html']}))


// save Test
// const mongoTest = new Task({item: 'test'});
// mongoTest.save((err, mongoTest) => {
//     if (err) {console.log(err)};
//     console.log('task SAVED');
// });

console.log(deleteTask); //imported model
app.listen(3333, () => {console.log('LISTENING on port 3333')});

