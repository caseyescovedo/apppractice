// express installed
// pg installed
// body parser installed
// path imported 
const express = require('express');
const app = express();
const PORT = 3333;
const bodyParser = require('body-parser');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const cookieParser = require('cookie-parser');

// parse that body baby
app.use(bodyParser());
//get them cookies in baby
app.use(cookieParser());
// FLOW TEST
app.use((req, res, next) => {
  console.log(`********* KELVIN FLOW TEST***********
  URL: ${req.url}
  METHOD: ${req.method}
  BODY: ${JSON.stringify(req.body)}\n`);

  return next();
});




// with express static the content-type header is automatically assumed and works after checking chrome dev tools
app.use(express.static('assets'));

// when visiting localhost:3333/ should render the index.html file from views
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

// get the secret page to render when hitting this endpoint
app.get('/secret', authController.validateCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
});

// route after hitting the sign in button
app.post('/signin', authController.validateUser);


// basic test route to getTasks
app.get('/getTasks', taskController.getTasks, (req, res) => {
  console.log('LOOK AT ALL THESE TASKS', res.locals.tasks);
  res.json(res.locals.tasks);
});

// basic test route to postTasks
app.post('/postTask', taskController.postTask, (req, res) => {
  console.log('SUCCESSFUL POST WOOHOO', res.locals.taskAdded);
  res.json(res.locals.taskAdded);
});

// basic test route to delete a task
app.delete('/deleteTask', taskController.deleteTasks, (req, res) => {
  console.log('DELETE THAT SHIT BABY');
  // i guess line 57 is moot since it will always return an empty array, oh well
  res.json(res.locals.deleted);
})

// handle wildcard requests to nonexistent endpoints
app.use('*', (req, res) => {
  res.sendStatus(404);
});

// global error handler to catch errs in any middleware
// clean this up
app.use((err, req, res, next) => {
  console.log(err.message);
  res.json(err);
});

// server up and listening 
app.listen(PORT, () => { console.log(`LISTENING ON PORT ${PORT}`) });