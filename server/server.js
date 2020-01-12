const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//require the controller file to utilize middleware in specific routes/actions
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

//app will listen on port 3333
const PORT = 3333;

//cookieParser to extract cookie info from browser, bodyParser to parse through json objects sent from req
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

//after signing in, if successful, they will go to the secret page
app.post('/signin', authController.verify, (req, res) => {
    res.status(200).redirect('/secret');
})

//serve css styling for login page once login requests the style sheet
app.get('/css/style.css', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../assets/css/style.css'));
});

//serve index.js when requested by secret page
app.get('/js/index.js', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../assets/js/index.js'));
}) 

//when client hits 'get tasks', middleware will send list of tasks to the front end to populate
app.get('/secret/tasks', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.allTasks);
})

app.delete('/secret/tasks', taskController.deleteTask, (req, res) => {
    // console.log(req.body.item);
    res.status(200);
})

app.post('/secret', taskController.postTask, (req, res) => {
    res.status(200).send('I got you');
});

app.get('/secret', authController.connected, (req, res) => {
    // console.log(req.cookies.admin);
    // if (req.cookies) console.log('yup i exist');
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
});

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
});