const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const PORT = 3333;

app.use(bodyParser.json());
app.use(cookieParser());

// initial localhost route
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
})

// route to grab the css for index.html
app.get('/css/style.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css; charset=UTF-8');
    res.status(200).sendFile(path.resolve(__dirname, '../assets/css/style.css'));
})

//* CRUD - routes for accessing the database
app.post('/task', taskController.postTask);
app.get('/task', taskController.getTask);
app.delete('/task', taskController.deleteTask);

//* AUTHENTICATION - redirect to secret page upon correct sign-in
// unfortunately, I did not know a way to get the username and password into
// the request without altering any existing html
app.post('/signin', 
        authController.checkUserAndPass, 
        authController.setCookie, 
        (req, res) => {
    res.redirect('/secret');
})

// tried a new way to get the req.body information (new script in html)
// but couldn't get it to coexist with /signin action
app.post('/newSignIn', 
        authController.checkUserAndPass,         
        authController.setCookie, 
        (req, res) => {
    res.redirect('/secret');
})

// route to access secret page  (cookie is checked to prevent direct access)
app.get('/secret', authController.checkCookie, (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
})

// route to grab the javascript fro secret.html
app.get('/js/index.js', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
    res.status(200).sendFile(path.resolve(__dirname, '../assets/js/index.js'));
})

// Catch-all error handler
app.use('/*', (req, res) => {
    res.status(404).json({ error: 'Page not found' });
})

// Global error handler for middleware
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: 'Middleware error' })
})

// Start the server
app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
})