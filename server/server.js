const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = 3333; 

// require controllers here 
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');



// flow test 
app.use((req, res, next) => {
    console.log(`
    ******* FLOW TEST *******
    METHOD: ${req.method}\n
    URL:${req.url}\n
    BODY: ${JSON.stringify(req.body)}\n
    `);
    return next();
});

// handle bodyParser

app.use(bodyParser.urlencoded({ extended: true}));

// handle parsing json 

app.use(express.json());

// handle cookie parser

app.use(cookieParser());

// handle static files 
app.use(express.static('assets'));

// get the index.html from the views folder , loginpage
app.get('/' , (req,res) => res.sendFile(path.join(__dirname , '../views/index.html')));

// on sign in form submitted, redirect to the secret page 
app.post('/' , authController.verifyUser , authController.setCookie ,  (req, res) => {
    res.redirect('/secret');
});


// get the secret.html from the views folder, the to-do app 
app.get('/secret' , authController.verifyCookie , (req, res) => res.sendFile(path.join(__dirname , '../views/secret.html')));

// post a task to the db 
app.post('/secret/item' , taskController.postTask , (req, res) => {
    return res.status(200).json(res.locals.item);
});

// get all tasks from the db 
app.get('/secret/items' , taskController.getTasks , (req, res) => {
    return res.status(200).json(res.locals.items);
});

// delete a task from the db
app.delete('/secret/item/:_id' , taskController.deleteTask , (req, res) => {
    return res.status(200).json(res.locals.deleted);
});


// catch-all route handler for requests to an unkown route 
app.use('*' , (req, res) => {
    return res.status(404).json(`Wake up, Neo.... the page doesn't exist`);
})


// global error handler 
app.use(function (err, req, res, next) {
    if(err.stack) {
        console.error(err.stack);
    } else {
        console.error(err);
    }
    res.status(500).send('Something broke!');
});

// app is listening on PORT
app.listen(PORT, () => console.log(`app is listening at http://localhost:${PORT}`));

// export the server (app)
module.exports = app;