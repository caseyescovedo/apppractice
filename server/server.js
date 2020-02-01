const express = require('express');
const app = express();
const PORT = 3333;
const path = require('path')
const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')
const bodyParser = require('body-parser')

// parse the request 
app.use(bodyParser.json());
//static path to serve up the css file
app.use(express.static('assets'))


// serve up the index.html file if send a req to /
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../views/index.html')));

// serve up the secret.html file if it send a req to /secret
app.get('/secret', authController.checkCookie, (req, res) => res.sendFile(path.resolve(__dirname, '../views/secret.html')));

// redirect to secret page after signin 
app.post('/signin', authController.checkUser, authController.addCookies, (req, res) => {
    return res.redirect('/secret');
})


//get request to get a list of task
app.get('/getTask', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.getTasks)});

//post request to post a task in to DB
app.post('/secret', taskController.postTask,  (req, res) => {
    res.status(200).send('testing')});

// delete request to delete a task in DB
app.delete('/secret', taskController.deleteTask, (req, res) => {
    res.status(200).send('delete')});


app.listen(PORT, () => console.log('Listening on port', PORT))
