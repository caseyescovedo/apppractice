const express = require('express');
const { urlencoded } = require('express')
const cookieParser = require('cookie-parser');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Express.static for my assets
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../views/index.html"))
})

app.get('/secret', authController.checkForCookie, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})

//Creating a task
app.post('/tasks', taskController.postTask, (req, res) => {
    res.status(200).json(res.locals.results)
})

//Getting a task
app.get('/tasks', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.tasks);
})

//Deleting a task
app.post('/tasks/delete', taskController.deleteTask, (req, res) => {
    res.status(200).json({res: res.locals.results});
})

app.use('/signin', authController.checkCredentials, (req, res) => {
    res.status(400).send("unsuccessful login attempt");
})


// Catch all route
app.use('*', (req, res) => {
    res.status(404).send("Error: Not found");
})

//Global error handler
app.use((err, req, res, next) => {
    let status = err.status || 500;
    if(err) return res.status(status).json(err);
    return res.status(status).json('Server error');
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));