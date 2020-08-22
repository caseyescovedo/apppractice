const path = require('path');
const express = require('express');
const app = express();
const taskRouter = require('./router/taskRouter');
const signinRouter = require('./router/signinRouter');
const authController = require('./controllers/authController');

// Contains key-value pairs of data submitted in the request body.
app.use(express.json());

// It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));

// Mounts the specified middleware function or functions at the specified path
app.use('/task', taskRouter);
app.use('/signin', signinRouter);

// It serves static files and is based on serve-static.
app.use(express.static(path.join(__dirname, '../views')));
app.use(express.static(path.join(__dirname, '../assets')));


// app.post('/signin', (req, res) => {
//     return res.redirect('/secret.html');
// })

// Rendering secret.html
app.get('/secret', authController.verifyUser,(req, res) => {
    if(res.locals.str === 'unsuccessful login attempt') {
        return res.json('You must be signed in to view this page');
    } else {
        return res.redirect('/secret.html');
    }
})

// Catch all 404 errors
app.use((req, res) => res.sendStatus(404));

// Global Error Handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: {err: 'An error occurred'},
    }
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
})

app.listen(3333);

module.exports = app;