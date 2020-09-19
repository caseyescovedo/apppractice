// required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/apiRouter.js');
const authController = require('./controllers/authController.js')
const { cookie } = require('request');



// create app and port
const app = express();
const PORT = 3333;

// parsers
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser);


// NOTES
// always send res status and have proper error handling 

// serve static files
app.use(express.static('assets'));

// serve login
app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
})

// user authentication
app.get('/login', 
    authController.verifyUser,
    authController.setCookie, 
    (req, res) => {
        if (res.locals.verified) res.status(200).send('successfully logged in')
        else res.status(401).send('incorrect login')
    }

// serve secret page
app.get('/secret', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
})

app.use('/api', apiRouter);


// catch all (404) error handler
app.get('/', (res, req) => {
    res.status(404).send('Cannot find url');
})

// global error handler
app.use(function (err, req, res, next) {
    res.status(500).send('Something broke!');
  })


// start server
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})

