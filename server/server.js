const express = require('express');
const app = express();
const PORT = 3333;
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// body parser

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
// cookie parser
app.use(cookieParser());

// serving the / route the index html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// serving the /secret route the secret html
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

// serving static files in assets folder
app.use('/', express.static(path.join(__dirname, '../assets')));

// route for adding 1 task
app.post('/add', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.task);
});

// route for getting all tasks 
app.get('/getTasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

// route for deleting one task based on id
app.delete('/delete/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deletedTask);
});

// route for sign in page --> set cookie if sign in was successful (username & password are correct)
app.post('/signin', (req, res) => {
  if(req.body.user === 'codesmith' & req.body.pass === 'ilovetesting') {
    res.cookie('token', 'admin', { httpOnly: true });
    return res.redirect('/secret');
  }
  else {
    res.send('unsucessful login attempt');
  }
})

// error handler
app.use('*', (req, res) => {
  console.log(err);
  res.status(400).send('Route does not exist!');
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(403).send('Global error handler');
});

// listening on PORT 3333
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
