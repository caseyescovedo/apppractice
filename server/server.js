const express = require('express');
const app = express();
const PORT = 3333;
const path = require('path');

//Keep all controllers together and import them if I had multiple
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

app.use(express.json());

//Express static automatically renders the index.html page.
// app.use(express.static('views'));

//To serve my CSS and JS
app.use(express.static('assets'));


//==============================================================================================
/*Routes for displaying the main page and secret page based on which route is triggered */
//==============================================================================================

app.get('/', (req, res) => {
    res.status(200).type('html').sendFile(path.join(__dirname, '../views/index.html'));
    
    //Cannot use this because we are not rendering an engine template (ie. ejs)
    // res.status(200).render('../view/index.html');
});

app.get('/secret', authController.isLoggedIn,(req, res) => {
    res.status(200).type('html').sendFile(path.join(__dirname, '../views/secret.html'));
});

//==============================================================================================
/*Login Route Handler*/
//==============================================================================================
app.post('/signin', authController.verifyUser, (req,res) => {
    //If user successfully verifies themself, they will be redirected to the index page
    res.status(200).type('html').sendFile(path.join(__dirname, '../views/secret.html'));
});

//==============================================================================================
/*Routes for retrieving, adding, and deleting tasks that will be triggered from the frontend */
//==============================================================================================
app.get('/task', taskController.getTasks,(req, res) => {
    res.status(200)
    .set('Content-Type', 'application/json')
    .json(res.locals.tasks);
});

app.post('/task', taskController.postTask,(req, res) => {
    res.status(200)
    .set('Content-Type', 'application/json')
    .json(res.locals.tasks);
});

app.delete('/task/:id', taskController.deleteTask, (req, res) => {
    res.status(200)
    .set('Content-Type', 'application/json')
    .json('Successfully deleted');
});


//Server is listening on 3333
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
})