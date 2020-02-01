const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3333;
const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

app.use(bodyParser.json());

app.use(express.static('assets'));

//root page and failure state for /secret display in browser. 
//Cannot sign in successfully and cannot get any of the routes to function in postman

app.get('/secret', (req,res) => {
    if (req.cookies && req.cookies.token === 'admin') {
        res.sendFile(path.resolve(__dirname, '../views/secret.html'));
    } else res.send('You must be signed in to view this page');
});


app.get('/getTasks', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.allTasks);
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
});
app.post('/addTask', taskController.postTask, (req, res) => {
    res.status(200).json('Task added: ', res.locals.newtask);
});

app.delete('deleteTask', taskController.deleteTask, (req,res) => {
    res.sendStatus(200);
});

app.post('/signin', function(req, res) {authController.login}, (req, res) => {
    if (res.locals.login) {
        res.cookie('token', {token: 'admin'}).redirect('/secret');
    } else res.send('Unsuccessful login attempt');
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));