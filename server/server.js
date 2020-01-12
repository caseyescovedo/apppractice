const express = require('express');
const app = express();
const path = require('path');

const PORT = 3333;

//require controllers
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

//built in body-parser
app.use(express.json());

//serving static files
app.use('/assets', express.static(path.join(__dirname, '../assets')));

//get route to /
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
})

//need to put in cookie during initial / and signin


//get all the tasks
app.get('/getTask', taskController.getTasks, (req,res) => {
    res.status(200).json({ tasks: res.locals.tasks});
})

//post route to postTask
app.post('/postTask', taskController.postTask, (req, res) => {
    res.status(200).send('Successfully created');
})

//delete a certain item
app.post('/deleteTask', taskController.deleteTask, (req, res) => {
    res.status(200).send('Successfully deleted task');
})

//post request to verify users
app.post('/signin', authController.verify, (req, res) => {
    res.status(200).json({ verified: res.locals.verified });
})

//get route to /secret
app.get('/secret', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
})

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}...`))