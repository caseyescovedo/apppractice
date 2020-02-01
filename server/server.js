const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const taskRouter = require('./routes/task');
const authController = require('./controllers/authController');
const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/task', taskRouter);

app.post('/signin', authController.authenticate, (req, res) => {
    res.status(200).redirect('/secret');
});

app.get('/secret', (req, res) => {
    if (req.cookies.token === 'admin') {
        res.set('Content-Type', 'text/html');
        res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
    }
    else res.status(200).json('You must be signed in');
});


app.use(express.static('assets'));
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});


// catch all error handler - for routes
app.use((req, res) => {
    console.log('Error: request to the non existent route');
    res.sendStatus(404);
});

// global error handler - for middleware
app.use((err, req, res, next) => {
    const defaultErr = {
        message: { err: 'An error occurred' },
        log: 'Express error handler caught unknown middleware error',
        status: 400,
    };
    const errorObj = { ...defaultErr, ...err };
    console.log('Global error handler: ', errorObj);
    res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));