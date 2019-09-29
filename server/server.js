const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')

const PORT = 3333;
const app = express();

//extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json());
//extracts the cookie from an incoming request and exposes it on res.cookies
app.use(cookieParser());

//sends index.html file upon get request to / route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})
//gets all tasks
app.get('/getTasks', taskController.getTasks, (req, res) => {
    res.status(200).send(res.locals.results)
})

//posts a new task
app.post('/postTask', taskController.postTask, (req, res) => {
    res.sendStatus(200);
})

//removes a task
app.delete('/removeTask', taskController.deleteTask, (req, res) =>{
    res.sendStatus(200);
})

//attempt at setting route to verify user
app.post('/signin', authController.verify, (req, res) =>{
    res.redirect('/secret')
})

app.use(express.static(path.join(__dirname, '../assets')));









// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
    res.sendStatus(404);
});

//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }
    };
    const errObj = Object.assign((defaultErr, err));
    console.log(errObj.log);
    res.status(errObj.status).json(errObj.message);
  });

//server started
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));