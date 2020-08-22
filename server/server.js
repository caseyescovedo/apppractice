const express = require('express');
const app = express();
const path = require('path');
PORT = 3333;
// Require controllers
const taskController = require('./controllers/taskController.js')
const authController = require('./controllers/authController')
// Parsers
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.resolve(__dirname, '../assets'))); //serve css and index.js
app.get('/',
    (req, res) => res.sendFile(path.resolve(__dirname, '../views/index.html')) // serve secret.html
)
app.get('/secret',
    (req, res) => res.sendFile(path.resolve(__dirname, '../views/secret.html')) // serve secret.html
)
// Routes
app.post('/signin',
    authController.login,
    (req, res) => {
        res.redirect('/secret')
    })

app.get('/secret',
    authController.login,
    (req, res) => {
        res.send('Please Sign In')
    })

app.post('/post',
    taskController.postTask,
    (req, res) => res.status(200).send(res.locals.newTask)
)
app.get('/get',
    taskController.getTasks,
    (req, res) => res.status(200).json(res.locals.allTasks)
)
app.delete('/delete',
    taskController.deleteTasks,
    (req, res) => res.status(200).json(res.locals.deleted)
)
// error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
});



app.listen(PORT, function () {
    console.log(`server listening on port ${PORT}`)
})