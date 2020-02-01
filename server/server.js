const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');
const PORT = 3333;
const app = express();


app.use(express.static('assets'));
app.use(express.json());


app.get('/task', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.allTasks);
})

app.post('/task', taskController.postTask, taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.allTasks);
})

app.delete('/task', taskController.deleteTask, taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.allTasks);
})

app.get('/', (req, res) => {
    console.log('inside get root');
    res.set({
        'Content-Type': 'text/html'
    });
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
})

app.get('/secret', (req, res) => {
    console.log('inside get secret');
    res.set({
        'Content-Type': 'text/html'
    });
    res.sendFile(path.resolve(__dirname, '../views/secret.html'));
})

app.post('/signin', authController.verifyUser, (req, res) => {
    // console.log('signin body: ', req.query)
    console.log("request body inside signin: ", req.body)
    res.redirect('/secret');
    // console.log('inside get secret');
    // res.set({
    //     'Content-Type': 'text/html'
    // });
    // res.sendFile(path.resolve(__dirname, '../views/secret.html'));
})

// app.get('../assets/css/style.css', (req, res) => {
//     console.log('inside get css');
//     res.set({
//         'Content-Type': 'text/css'
//     });
//     res.sendFile(path.resolve(__dirname, '../assets/css/style.css'));
// })

app.use('*', (req, res) => {
    res.sendStatus(404);
})

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})

