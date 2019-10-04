const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();
const PORT = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

app.use('/secret', express.static(path.join(__dirname, '../assets')));
app.use('/', express.static(path.join(__dirname, '../assets')));

app.post('/signin', authController.verifyUser, (req, res) => {
    return res.redirect('/secret');
});

app.get('/task', taskController.getTasks, (req, res) => {
    return res.status(200).json(res.locals.items);
})

app.post('/task', taskController.postTask, (req, res) => {
    return res.status(200).json(res.locals.id);
})

app.delete('/task', taskController.deleteTask, (req, res) => {
    return res.status(200).json("Success: task is deleted.");
})

app.get('/secret', authController.isLoggedIn, (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
})

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
})

// show 404 page if nothing found
app.all('*', (req, res) => {
    return res.status(404).send('Page Not Found');
})

// global error handler
app.use((err, req, res) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred'}
    }

    const errObj = Object.assign(defaultErr, err);
    console.log(errObj.log);
    return res.status(errObj.status).json(errObj.message);
});

// start server
app.listen(PORT, () => {
    console.log(`Listenning to ${PORT}`);
})