const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const app = express();
const PORT = 3333;

//const taskRouter = express.Router();
const taskController = require('./controllers/taskController');
const cookieController = require('./controllers/authController');

//app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

//app.use('/tasks', taskRouter);

//static file router
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// respond with main app
app.get('/',  (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
})

//getTask router
app.get('/tasks', taskController.getTasks, (req, res) =>{
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})

//postTask router
app.post('/tasks', taskController.postTask, (req, res) =>{
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})
//deleteTask router
app.delete('/tasks/:id', taskController.deleteTask, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
});

// app.post('/', (req, res) => {
//     // what should happen here on successful log in?
//     if (res.locals.auth === false) res.redirect('/index');
//     else res.redirect('/secret');
// });

//error handler
app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

//Global error handler
app.use((err, req, res, next) => {
    console.log(err);
    if (err === 'ERROR: Username does not exist or password is incorrect');
    res.status(500).send('Internal Server Error');
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
